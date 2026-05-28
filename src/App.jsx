import { useState } from 'react';
import { getGoals, addGoal, updateGoal, deleteGoal, moveGoal } from './data/storage';
import { STATUSES } from './types/goal';
import KanbanBoard from './components/KanbanBoard';
import AddGoalForm from './components/AddGoalForm';

function sendInProgressEmail(goals) {
  const inProgress = goals.filter((g) => g.status === STATUSES.IN_PROGRESS);
  if (inProgress.length === 0) {
    alert('No in-progress goals to email.');
    return;
  }

  const lines = inProgress.map((g, i) => {
    const parts = [`${i + 1}. ${g.title}`];
    if (g.goal) parts.push(`   ${g.goal}`);
    if (g.referenceLink) parts.push(`   Link: ${g.referenceLink}`);
    return parts.join('\n');
  });

  const body = `Trakr - Status Update\n\n${lines.join('\n\n')}`;
  const subject = 'Trakr - Status Update';
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}

export default function App() {
  const [goals, setGoals] = useState(() => getGoals());
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddGoal = (goal) => {
    addGoal(goal);
    setGoals(getGoals());
    setShowAddForm(false);
  };

  const handleUpdateGoal = (id, updates) => {
    updateGoal(id, updates);
    setGoals(getGoals());
  };

  const handleDeleteGoal = (id) => {
    deleteGoal(id);
    setGoals(getGoals());
  };

  const handleMoveGoal = (id, newStatus) => {
    moveGoal(id, newStatus);
    setGoals(getGoals());
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
              onClick={() => sendInProgressEmail(goals)}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Status Update
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all shadow-md hover:shadow-lg"
            >
              + Add Goal
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <KanbanBoard
          goals={goals}
          onMove={handleMoveGoal}
          onUpdate={handleUpdateGoal}
          onDelete={handleDeleteGoal}
        />
      </main>

      {showAddForm && (
        <AddGoalForm
          onAdd={handleAddGoal}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
