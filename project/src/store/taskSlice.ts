import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import type { TaskState, Task } from '../types';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id' | 'created_at' | 'user_id'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ 
      ...task, 
      user_id: user?.id,
      created_at: new Date().toISOString() 
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, ...updates }: Partial<Task> & { id: string }) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;