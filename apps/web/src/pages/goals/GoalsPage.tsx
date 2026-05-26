import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ─── Types ──────────────────────────────────────────────────

type GoalType = 'ANNUAL' | 'ASPIRATION' | 'BUCKET_LIST';
type GoalStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface Goal {
  id: string;
  title: string;
  description?: string;
  type: GoalType;
  status: GoalStatus;
  progressPct: number;
  category?: string;
  deadline?: string;
  createdAt: string;
}

interface GoalFormData {
  title: string;
  description: string;
  deadline: string;
  progressPct: number;
  category: string;
}

const EMPTY_FORM: GoalFormData = {
  title: '',
  description: '',
  deadline: '',
  progressPct: 0,
  category: '',
};

const STATUS_STYLES: Record<GoalStatus, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<GoalStatus, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

// ─── Progress Bar ────────────────────────────────────────────

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

// ─── Goal Card ───────────────────────────────────────────────

function GoalCard({
  goal,
  onEdit,
  onDelete,
}: {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 text-sm">{goal.title}</h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[goal.status]}`}
            >
              {STATUS_LABELS[goal.status]}
            </span>
            {goal.category && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                {goal.category}
              </span>
            )}
          </div>
          {goal.description && (
            <p className="text-xs text-gray-500 mb-2">{goal.description}</p>
          )}
          {goal.deadline && (
            <p className="text-xs text-gray-400">
              By{' '}
              {new Date(goal.deadline).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ProgressBar pct={goal.progressPct} />
        <span className="text-xs text-gray-500 flex-shrink-0 w-8 text-right">
          {goal.progressPct}%
        </span>
      </div>
    </div>
  );
}

// ─── Goals Tab ───────────────────────────────────────────────

function GoalsTab({ type }: { type: GoalType }) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [form, setForm] = useState<GoalFormData>(EMPTY_FORM);

  const { data: goals = [], isLoading } = useQuery<Goal[]>({
    queryKey: ['goals', type],
    queryFn: () => api.get(`/goals?type=${type}`).then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/goals', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', type] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/goals/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', type] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/goals/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals', type] }),
  });

  function openCreate() {
    setEditingGoal(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(goal: Goal) {
    setEditingGoal(goal);
    setForm({
      title: goal.title,
      description: goal.description || '',
      deadline: goal.deadline ? goal.deadline.slice(0, 10) : '',
      progressPct: goal.progressPct,
      category: goal.category || '',
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingGoal(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {
      title: form.title,
      type,
      progressPct: form.progressPct,
    };
    if (form.description) payload.description = form.description;
    if (form.deadline) payload.deadline = form.deadline;
    if (form.category) payload.category = form.category;

    if (editingGoal) {
      updateMutation.mutate({ id: editingGoal.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  const tabEmptyMessages: Record<GoalType, string> = {
    ANNUAL: 'No annual goals yet. Set a goal for this year.',
    ASPIRATION: 'No aspirations yet. Dream big.',
    BUCKET_LIST: 'Your bucket list is empty. Add something to work toward.',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          {goals.length} {goals.length === 1 ? 'goal' : 'goals'}
        </span>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Plus size={16} />
          Add Goal
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-sm">Loading...</div>
      ) : goals.length === 0 ? (
        <div className="text-center text-gray-400 py-12 text-sm">{tabEmptyMessages[type]}</div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={openEdit}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingGoal ? 'Edit Goal' : 'Add Goal'}
              </h2>
              <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="What do you want to achieve?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="More detail about this goal..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Health, Finance, Family"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progress: {form.progressPct}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={form.progressPct}
                  onChange={(e) => setForm({ ...form, progressPct: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  {isPending ? 'Saving...' : editingGoal ? 'Save Changes' : 'Add Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────

type Tab = 'annual' | 'aspiration' | 'bucket';

const TABS: { id: Tab; label: string; type: GoalType }[] = [
  { id: 'annual', label: 'Annual Goals', type: 'ANNUAL' },
  { id: 'aspiration', label: 'Dreams & Aspirations', type: 'ASPIRATION' },
  { id: 'bucket', label: 'Bucket List', type: 'BUCKET_LIST' },
];

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('annual');
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Goals</h1>

      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <GoalsTab key={currentTab.type} type={currentTab.type} />
    </div>
    </DashboardLayout>
  );
}
