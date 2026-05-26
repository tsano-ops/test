import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Trash2, X, Zap, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ─── Types ──────────────────────────────────────────────────

type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
}

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  dueDate: string;
}

const EMPTY_FORM: TaskFormData = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  dueDate: '',
};

// ─── Badge helpers ───────────────────────────────────────────

const PRIORITY_STYLES: Record<TaskPriority, { badge: string; label: string }> = {
  LOW: { badge: 'bg-gray-100 text-gray-600', label: 'Low' },
  MEDIUM: { badge: 'bg-blue-100 text-blue-700', label: 'Medium' },
  HIGH: { badge: 'bg-orange-100 text-orange-700', label: 'High' },
  URGENT: { badge: 'bg-red-100 text-red-700', label: 'Urgent' },
};

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'SKIPPED', label: 'Skipped' },
];

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

// ─── Due date helpers ────────────────────────────────────────

function formatDueDate(dateStr: string | undefined): { label: string; isPast: boolean } | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const now = new Date();
  const isPast = date < now;
  const label = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return { label, isPast };
}

// ─── Task Card Row ───────────────────────────────────────────

function TaskRow({
  task,
  onStatusChange,
  onDelete,
}: {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}) {
  const priority = PRIORITY_STYLES[task.priority];
  const due = formatDueDate(task.dueDate);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-start gap-4">
      {/* Priority badge */}
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 mt-0.5 ${priority.badge}`}
      >
        {task.priority === 'URGENT' && <AlertTriangle size={10} className="mr-1" />}
        {priority.label}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm">{task.title}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {task.category && (
            <span className="text-xs text-gray-400">{task.category}</span>
          )}
          {due && (
            <span className={`text-xs ${due.isPast ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
              {due.isPast ? 'Overdue: ' : 'Due: '}
              {due.label}
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
        )}
      </div>

      {/* Status select */}
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
        className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors flex-shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────

export default function TasksPage() {
  const queryClient = useQueryClient();

  // Filter state
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'ALL'>('ALL');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<TaskFormData>(EMPTY_FORM);

  // Smart tasks state
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => api.get('/tasks').then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/tasks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setModalOpen(false);
      setForm(EMPTY_FORM);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/tasks/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  async function handleGenerateSmartTasks() {
    setIsGenerating(true);
    try {
      await api.post('/tasks/generate-smart');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    } finally {
      setIsGenerating(false);
    }
  }

  function handleStatusChange(id: string, status: TaskStatus) {
    updateMutation.mutate({ id, data: { status } });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {
      title: form.title,
      priority: form.priority,
    };
    if (form.description) payload.description = form.description;
    if (form.category) payload.category = form.category;
    if (form.dueDate) payload.dueDate = form.dueDate;
    createMutation.mutate(payload);
  }

  // Client-side filtering
  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;
      return matchesStatus && matchesPriority;
    });
  }, [tasks, statusFilter, priorityFilter]);

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tasks</h1>

      {/* Top controls bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Status filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'ALL')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500">Priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'ALL')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All</option>
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleGenerateSmartTasks}
            disabled={isGenerating}
            className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium disabled:opacity-50"
          >
            <Zap size={15} />
            {isGenerating ? 'Generating...' : 'Generate Smart Tasks'}
          </button>
          <button
            onClick={() => { setForm(EMPTY_FORM); setModalOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </div>

      {/* Task list */}
      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-sm">Loading tasks...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-12 text-sm">
          {tasks.length === 0
            ? 'No tasks yet. Add a task or generate smart tasks from your plan.'
            : 'No tasks match the current filters.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Task</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
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
                  placeholder="What needs to be done?"
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
                  placeholder="Additional details..."
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
                  placeholder="e.g. Legal, Insurance, Finance"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PRIORITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Adding...' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}
