import Column from './Column';
import { STATUSES, STATUS_LABELS } from '../types/priority';

export default function KanbanBoard({ priorities, goals, onMove, onUpdate, onDelete }) {
  const columns = [
    { status: STATUSES.BACKLOG, label: STATUS_LABELS.backlog, color: 'from-gray-400 to-gray-500' },
    { status: STATUSES.IN_PROGRESS, label: STATUS_LABELS['in-progress'], color: 'from-primary-400 to-primary-500' },
    { status: STATUSES.COMPLETED, label: STATUS_LABELS.completed, color: 'from-accent-400 to-accent-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => (
        <Column
           key={col.status}
           status={col.status}
           label={col.label}
           color={col.color}
           priorities={priorities.filter((p) => p.status === col.status)}
           goals={goals}
           onMove={onMove}
           onUpdate={onUpdate}
           onDelete={onDelete}
         />
      ))}
    </div>
  );
}
