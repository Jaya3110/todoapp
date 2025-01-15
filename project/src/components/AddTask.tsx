import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Bell, Calendar, Repeat } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { addTask } from '../store/taskSlice';
import "react-datepicker/dist/react-datepicker.css";

const AddTask: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isAdding) return;

    setIsAdding(true);
    try {
      await dispatch(addTask({
        title: title.trim(),
        completed: false,
        priority: 'low',
        due_date: dueDate?.toISOString(),
      }));

      setTitle('');
      setDueDate(null);
      setShowDatePicker(false);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task"
            className="flex-1 text-lg bg-transparent border-none focus:ring-0 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!title.trim() || isAdding}
            className={`px-4 py-2 bg-green-500 text-white rounded-lg transition-all ${
              !title.trim() || isAdding
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-green-600 hover:shadow-md'
            }`}
          >
            Add Task
          </button>
        </div>
        {showDatePicker && (
          <div className="mt-4">
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              inline
              className="border rounded-lg shadow-sm"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTask;