import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import type { RootState } from '../store';

const TaskList: React.FC = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'today':
        return new Date(task.due_date).toDateString() === new Date().toDateString();
      case 'important':
        return task.priority === 'high';
      case 'planned':
        return !!task.due_date;
      case 'assigned':
        return !!task.assigned_to;
      default:
        return true;
    }
  });

  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          {incompleteTasks.map(task => (
            <div
              key={task.id}
              className="transform transition-all duration-300 hover:-translate-y-0.5"
            >
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-3">Completed</h3>
          <div className="space-y-2 opacity-75">
            {completedTasks.map(task => (
              <div key={task.id} className="transform transition-all duration-200">
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;