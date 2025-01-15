export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  reminder?: string;
  notes?: string;
  assigned_to?: string;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'none';
  steps?: { id: string; title: string; completed: boolean }[];
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
}