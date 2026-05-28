import { useState } from 'react';
import { STATUSES, STATUS_LABELS } from '../types/priority';

export default function AddPriorityForm({ goals, onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [status, setStatus] = useState(STATUSES.BACKLOG);
  const [goalId, setGoalId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      referenceLink: referenceLink.trim(),
      status,
      goalId,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 rounded-t-xl">
          <h2 className="text-white font-semibold">Add New Priority</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Launch landing page"
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Priority Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the priority..."
              rows={3}
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Reference Link
            </label>
            <input
              type="url"
              value={referenceLink}
              onChange={(e) => setReferenceLink(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Goal
            </label>
            <select
              value={goalId}
              onChange={(e) => setGoalId(e.target.value)}
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">None</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>{goal.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              Add Priority
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
