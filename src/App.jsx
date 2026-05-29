import { useState } from 'react';
import { getPriorities, addPriority, updatePriority, deletePriority, movePriority } from './data/storage';
import { getGoals, addGoal, deleteGoal } from './data/goalStorage';
import { getUsers, addUser, ensureDefaultUser } from './data/userStorage';
import KanbanBoard from './components/KanbanBoard';
import AddPriorityForm from './components/AddPriorityForm';
import ManageGoalsModal from './components/ManageGoalsModal';
import CreateUserModal from './components/CreateUserModal';
import UserSummary from './components/UserSummary';

export default function App() {
  const [priorities, setPriorities] = useState(() => getPriorities());
  const [goals, setGoals] = useState(() => getGoals());
  const [users, setUsers] = useState(() => getUsers());
  const [currentUserId, setCurrentUserId] = useState(() => ensureDefaultUser());
  const [viewMode, setViewMode] = useState('plan');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageGoals, setShowManageGoals] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleAddGoal = (name) => {
    addGoal(name);
    setGoals(getGoals());
  };

  const handleDeleteGoal = (id) => {
    deleteGoal(id);
    setGoals(getGoals());
  };

  const handleCreateUser = (name) => {
    const user = addUser(name);
    setUsers(getUsers());
    setCurrentUserId(user.id);
  };

  const handleAddPriority = (priority) => {
    addPriority(priority);
    setPriorities(getPriorities());
    setShowAddForm(false);
  };

  const handleSelectUser = (userId) => {
    setCurrentUserId(userId);
  };

  const handleSelectUserFromSummary = (userId) => {
    setCurrentUserId(userId);
    setViewMode('plan');
  };

  const handleUpdatePriority = (id, updates) => {
    updatePriority(id, updates);
    setPriorities(getPriorities());
  };

  const handleDeletePriority = (id) => {
    deletePriority(id);
    setPriorities(getPriorities());
  };

  const handleMovePriority = (id, newStatus) => {
    movePriority(id, newStatus);
    setPriorities(getPriorities());
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Trakr
          </h1>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-700 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('summary')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'summary'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode('plan')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'plan'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Plan
              </button>
            </div>

            {/* Plan mode controls */}
            {viewMode === 'plan' && (
              <>
                <select
                  value={currentUserId}
                  onChange={(e) => handleSelectUser(e.target.value)}
                  className="text-sm border border-gray-600 rounded-lg px-3 py-2 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => setShowCreateUser(true)}
                  className="px-3 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
                  title="Create user"
                >
                  +
                </button>
              </>
            )}

            {viewMode === 'plan' && (
              <button
                onClick={() => setShowManageGoals(true)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Manage Goals
              </button>
            )}
            {viewMode === 'plan' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-md hover:shadow-lg"
              >
                + Add Priority
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {viewMode === 'plan' ? (
          <KanbanBoard
            priorities={priorities}
            goals={goals}
            currentUserId={currentUserId}
            onMove={handleMovePriority}
            onUpdate={handleUpdatePriority}
            onDelete={handleDeletePriority}
          />
        ) : (
          <UserSummary
            priorities={priorities}
            users={users}
            onSelectUser={handleSelectUserFromSummary}
          />
        )}
      </main>

      {showAddForm && viewMode === 'plan' && (
        <AddPriorityForm
          goals={goals}
          currentUserId={currentUserId}
          onAdd={handleAddPriority}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showManageGoals && (
        <ManageGoalsModal
          goals={goals}
          onAdd={handleAddGoal}
          onDelete={handleDeleteGoal}
          onCancel={() => setShowManageGoals(false)}
        />
      )}

      {showCreateUser && (
        <CreateUserModal
          onCreate={handleCreateUser}
          onCancel={() => setShowCreateUser(false)}
        />
      )}
    </div>
  );
}
