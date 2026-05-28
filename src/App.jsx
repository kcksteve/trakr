import { useState } from 'react';
import { getPriorities, addPriority, updatePriority, deletePriority, movePriority } from './data/storage';
import { getGoals, addGoal, deleteGoal } from './data/goalStorage';
import { STATUSES } from './types/priority';
import KanbanBoard from './components/KanbanBoard';
import AddPriorityForm from './components/AddPriorityForm';
import ManageGoalsModal from './components/ManageGoalsModal';

function sendInProgressEmail(priorities) {
  const inProgress = priorities.filter((p) => p.status === STATUSES.IN_PROGRESS);
  if (inProgress.length === 0) {
    alert('No in-progress priorities to email.');
    return;
  }

  const lines = inProgress.map((p, i) => {
    const parts = [`${i + 1}. ${p.title}`];
    if (p.description) parts.push(`   ${p.description}`);
    if (p.referenceLink) parts.push(`   Link: ${p.referenceLink}`);
    return parts.join('\n');
  });

  const body = `Trakr - Status Update\n\n${lines.join('\n\n')}`;
  const subject = 'Trakr - Status Update';
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}

export default function App() {
  const [priorities, setPriorities] = useState(() => getPriorities());
  const [goals, setGoals] = useState(() => getGoals());
  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageGoals, setShowManageGoals] = useState(false);

  const handleAddGoal = (name) => {
    addGoal(name);
    setGoals(getGoals());
  };

  const handleDeleteGoal = (id) => {
    deleteGoal(id);
    setGoals(getGoals());
  };

  const handleAddPriority = (priority) => {
    addPriority(priority);
    setPriorities(getPriorities());
    setShowAddForm(false);
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
            <button
              onClick={() => sendInProgressEmail(priorities)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Status Update
            </button>
            <button
              onClick={() => setShowManageGoals(true)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Manage Goals
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-md hover:shadow-lg"
            >
              + Add Priority
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <KanbanBoard
          priorities={priorities}
          goals={goals}
          onMove={handleMovePriority}
          onUpdate={handleUpdatePriority}
          onDelete={handleDeletePriority}
        />
      </main>

      {showAddForm && (
        <AddPriorityForm
          goals={goals}
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
    </div>
  );
}
