import { useState } from 'react';
import { STATUSES, STATUS_LABELS } from '../types/goal';

export default function GoalEditor({ goal, onSave, onCancel, onDelete }) {
  const [title, setTitle] = useState(goal.title);
  const [goalText, setGoalText] = useState(goal.goal || '');
  const [referenceLink, setReferenceLink] = useState(goal.referenceLink || '');
  const [status, setStatus] = useState(goal.status);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      goal: goalText.trim(),
      referenceLink: referenceLink.trim(),
      status,
    });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this goal?')) {
      onDelete();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-primary-500/30 p-4 shadow-md">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-2 py-1.5 text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Goal</label>
          <textarea
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            rows={2}
            className="w-full border border-gray-600 rounded-md px-2 py-1.5 text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Reference Link</label>
          <input
            type="url"
            value={referenceLink}
            onChange={(e) => setReferenceLink(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-2 py-1.5 text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-2 py-1.5 text-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-xs font-medium text-red-400 border border-red-500/30 rounded-md hover:bg-red-500/10 transition-colors"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-400 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-accent-500 rounded-md hover:from-primary-600 hover:to-accent-600 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
}
