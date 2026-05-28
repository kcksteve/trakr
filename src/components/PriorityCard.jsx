import { useState } from 'react';
import { STATUSES, STATUS_LABELS } from '../types/priority';
import PriorityEditor from './PriorityEditor';

export default function PriorityCard({ priority, goals, onMove, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <PriorityEditor
        priority={priority}
        goals={goals}
        onSave={(updates) => {
          onUpdate(priority.id, updates);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
        onDelete={() => onDelete(priority.id)}
      />
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-100 text-sm leading-tight">
          {priority.title}
        </h3>
        <button
          onClick={() => setEditing(true)}
          className="text-gray-500 hover:text-primary-400 transition-colors flex-shrink-0"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      {priority.description && (
        <p className="text-gray-400 text-xs mt-2 line-clamp-3">{priority.description}</p>
      )}

      {priority.referenceLink && (
        <a
          href={priority.referenceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Link
        </a>
      )}

      <div className="mt-3">
        <select
          value={priority.status}
          onChange={(e) => onMove(priority.id, e.target.value)}
          className="w-full text-xs border border-gray-600 rounded-md px-2 py-1 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
