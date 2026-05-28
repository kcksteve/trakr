import { useState } from 'react';

export default function ManageGoalsModal({ goals, onAdd, onDelete, onCancel }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 rounded-t-xl">
          <h2 className="text-white font-semibold">Manage Goals</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Goal Name *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q3 Revenue Target"
                className="flex-1 border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                autoFocus
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
              >
                Add
              </button>
            </div>
          </div>

          {goals.length > 0 ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Existing Goals
              </label>
              <ul className="space-y-1">
                {goals.map((goal) => (
                  <li
                    key={goal.id}
                    className="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2"
                  >
                    <span className="text-sm text-gray-200">{goal.name}</span>
                    <button
                      type="button"
                      onClick={() => onDelete(goal.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                      title="Delete goal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">No goals yet. Add one above.</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
