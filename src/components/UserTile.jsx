export default function UserTile({ user, priorities, onSelectUser }) {
  return (
    <div
      className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelectUser(user.id)}
    >
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 rounded-t-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">{user.name}</h2>
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {priorities.length}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
        {priorities.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No priorities</p>
        ) : (
          priorities.map((priority) => (
            <div
              key={priority.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-3"
            >
              <h3 className="font-semibold text-gray-100 text-sm leading-tight">
                {priority.title}
              </h3>
              {priority.description && (
                <p className="text-gray-400 text-xs mt-2 line-clamp-3">
                  {priority.description}
                </p>
              )}
              {priority.referenceLink && (
                <a
                  href={priority.referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 mt-2 text-xs text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Link
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
