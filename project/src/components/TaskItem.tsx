import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Star, Calendar, Bell, Plus, ChevronDown, Repeat, Trash2 } from 'lucide-react';
import { updateTask } from '../store/taskSlice';
import type { Task } from '../types';
import DatePicker from 'react-datepicker';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleComplete = () => {
    dispatch(updateTask({ id: task.id, completed: !task.completed }));
  };

  const toggleImportant = () => {
    dispatch(updateTask({ 
      id: task.id, 
      priority: task.priority === 'high' ? 'normal' : 'high' 
    }));
  };

  const updateDueDate = (date: Date | null) => {
    dispatch(updateTask({
      id: task.id,
      due_date: date?.toISOString()
    }));
    setShowDatePicker(false);
  };

  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ${
        task.completed ? 'opacity-75' : 'hover:shadow-md'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleComplete}
              className="h-5 w-5 rounded-full border-2 border-gray-300 text-green-500 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            />
            {task.completed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.due_date && (
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(task.due_date).toLocaleDateString()}
              </div>
            )}
          </div>
          <button
            onClick={toggleImportant}
            className={`p-2 rounded-lg hover:bg-gray-50 transition-colors ${
              task.priority === 'high' ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Star className={`w-5 h-5 ${task.priority === 'high' ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronDown 
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="space-y-3">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add Step</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span>Set Reminder</span>
            </button>
            
            <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Add Due Date</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Repeat className="w-5 h-5" />
              <span>Repeat</span>
            </button>

            {showDatePicker && (
              <div className="mt-2">
                <DatePicker
                  selected={task.due_date ? new Date(task.due_date) : null}
                  onChange={updateDueDate}
                  inline
                  className="border rounded-lg shadow-sm"
                />
              </div>
            )}

            <div className="pt-2">
              <textarea
                placeholder="Add Notes"
                value={task.notes || ''}
                onChange={(e) => dispatch(updateTask({ id: task.id, notes: e.target.value }))}
                className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>Delete Task</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;