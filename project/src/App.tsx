import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Grid, Moon, Bell, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { fetchTasks } from './store/taskSlice';
import type { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTasks());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="text-green-600">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-xl font-semibold">DoIt</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Grid className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Moon className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">To Do</h2>
                <button className="text-sm text-gray-500 hover:text-gray-700">View all</button>
              </div>
              <AddTask />
            </div>
            <TaskList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;