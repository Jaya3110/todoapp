import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ListTodo, 
  Calendar, 
  Star, 
  Clock,
  Users,
  Plus,
  ChevronDown
} from 'lucide-react';
import { setFilter } from '../store/taskSlice';
import type { RootState } from '../store';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const getTaskCount = (filter: string) => {
    switch (filter) {
      case 'today':
        return tasks.filter(task => 
          new Date(task.dueDate).toDateString() === new Date().toDateString()
        ).length;
      case 'important':
        return tasks.filter(task => task.priority === 'high').length;
      case 'planned':
        return tasks.filter(task => !!task.dueDate).length;
      case 'assigned':
        return tasks.filter(task => !!task.assignedTo).length;
      default:
        return tasks.length;
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="w-72 bg-white border-r flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">Hey, ABCD</h3>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => dispatch(setFilter('all'))}
            className={`flex items-center w-full p-3 rounded-lg ${
              currentFilter === 'all' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <ListTodo className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">All Tasks</span>
            <span className="text-gray-400">{getTaskCount('all')}</span>
          </button>
          
          <button
            onClick={() => dispatch(setFilter('today'))}
            className={`flex items-center w-full p-3 rounded-lg ${
              currentFilter === 'today' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">Today</span>
            <span className="text-gray-400">{getTaskCount('today')}</span>
          </button>
          
          <button
            onClick={() => dispatch(setFilter('important'))}
            className={`flex items-center w-full p-3 rounded-lg ${
              currentFilter === 'important' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <Star className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">Important</span>
            <span className="text-gray-400">{getTaskCount('important')}</span>
          </button>
          
          <button
            onClick={() => dispatch(setFilter('planned'))}
            className={`flex items-center w-full p-3 rounded-lg ${
              currentFilter === 'planned' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">Planned</span>
            <span className="text-gray-400">{getTaskCount('planned')}</span>
          </button>
          
          <button
            onClick={() => dispatch(setFilter('assigned'))}
            className={`flex items-center w-full p-3 rounded-lg ${
              currentFilter === 'assigned' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            <span className="flex-1 text-left">Assigned to me</span>
            <span className="text-gray-400">{getTaskCount('assigned')}</span>
          </button>
        </div>

        <button className="flex items-center w-full p-3 mt-4 text-gray-500 hover:text-gray-700">
          <Plus className="w-5 h-5 mr-3" />
          <span>Add list</span>
        </button>
      </div>

      <div className="mt-auto p-6 border-t">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-medium flex items-center gap-2">
            Today Tasks
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{getTaskCount('today')}</span>
          </h4>
          <button className="text-gray-400 hover:text-gray-600">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="relative pt-2">
          <div className="w-32 h-32 mx-auto">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-semibold">{completedTasks}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;