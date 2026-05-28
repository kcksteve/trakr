import PriorityCard from './PriorityCard';

export default function Column({ status, label, color, priorities, goals, onMove, onUpdate, onDelete }) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 shadow-sm">
      <div className={`bg-gradient-to-r ${color} p-3 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wide">
            {label}
          </h2>
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {priorities.length}
          </span>
        </div>
      </div>
      <div className="p-3 space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
        {priorities.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No priorities yet</p>
        ) : (
          priorities.map((priority) => (
            <PriorityCard
               key={priority.id}
               priority={priority}
               goals={goals}
               onMove={onMove}
               onUpdate={onUpdate}
               onDelete={onDelete}
             />
          ))
        )}
      </div>
    </div>
  );
}
