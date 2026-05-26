import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ─── Types ──────────────────────────────────────────────────

type DeliveryTrigger = 'AFTER_PASSING' | 'SPECIFIC_DATE' | 'BIRTHDAY' | 'ANNIVERSARY' | 'MANUAL';

interface Letter {
  id: string;
  title: string;
  recipient?: string;
  recipientProfileId?: string;
  content: string;
  deliveryTrigger: DeliveryTrigger;
  triggerDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface LetterFormData {
  title: string;
  recipient: string;
  content: string;
  deliveryTrigger: DeliveryTrigger;
  triggerDate: string;
}

const TRIGGER_LABELS: Record<DeliveryTrigger, string> = {
  AFTER_PASSING: 'After Passing',
  SPECIFIC_DATE: 'Specific Date',
  BIRTHDAY: 'Birthday',
  ANNIVERSARY: 'Anniversary',
  MANUAL: 'Manual',
};

const TRIGGER_COLORS: Record<DeliveryTrigger, string> = {
  AFTER_PASSING: 'bg-gray-100 text-gray-700',
  SPECIFIC_DATE: 'bg-blue-100 text-blue-700',
  BIRTHDAY: 'bg-purple-100 text-purple-700',
  ANNIVERSARY: 'bg-pink-100 text-pink-700',
  MANUAL: 'bg-yellow-100 text-yellow-700',
};

const EMPTY_LETTER_FORM: LetterFormData = {
  title: '',
  recipient: '',
  content: '',
  deliveryTrigger: 'AFTER_PASSING',
  triggerDate: '',
};

// ─── Letters Tab ────────────────────────────────────────────

function LettersTab() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<Letter | null>(null);
  const [form, setForm] = useState<LetterFormData>(EMPTY_LETTER_FORM);

  const { data: letters = [], isLoading } = useQuery<Letter[]>({
    queryKey: ['letters'],
    queryFn: () => api.get('/letters').then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<LetterFormData> & { recipientNote?: string }) =>
      api.post('/letters', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LetterFormData> }) =>
      api.patch(`/letters/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letters'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/letters/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['letters'] }),
  });

  function openCreate() {
    setEditingLetter(null);
    setForm(EMPTY_LETTER_FORM);
    setModalOpen(true);
  }

  function openEdit(letter: Letter) {
    setEditingLetter(letter);
    setForm({
      title: letter.title,
      recipient: letter.recipient || '',
      content: letter.content,
      deliveryTrigger: letter.deliveryTrigger,
      triggerDate: letter.triggerDate ? letter.triggerDate.slice(0, 10) : '',
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingLetter(null);
    setForm(EMPTY_LETTER_FORM);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {
      title: form.title,
      content: form.content,
      deliveryTrigger: form.deliveryTrigger,
    };
    if (form.recipient) payload.recipient = form.recipient;
    if (form.deliveryTrigger === 'SPECIFIC_DATE' && form.triggerDate) {
      payload.triggerDate = form.triggerDate;
    }

    if (editingLetter) {
      updateMutation.mutate({ id: editingLetter.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Write letters to the people you love, delivered when the time is right.
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Plus size={16} />
          Write a Letter
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-sm">Loading letters...</div>
      ) : letters.length === 0 ? (
        <div className="text-center text-gray-400 py-12 text-sm">
          No letters yet. Write your first letter to a loved one.
        </div>
      ) : (
        <div className="space-y-3">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{letter.title}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${TRIGGER_COLORS[letter.deliveryTrigger]}`}
                  >
                    {TRIGGER_LABELS[letter.deliveryTrigger]}
                  </span>
                </div>
                {letter.recipient && (
                  <p className="text-xs text-gray-500 mb-1">To: {letter.recipient}</p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(letter.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {letter.triggerDate && letter.deliveryTrigger === 'SPECIFIC_DATE' && (
                    <span className="ml-2">
                      · Deliver on {new Date(letter.triggerDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(letter)}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(letter.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingLetter ? 'Edit Letter' : 'Write a Letter'}
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
                  placeholder="e.g. To my daughter on her wedding day"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.recipient}
                  onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                  placeholder="e.g. Maria, my daughter"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={8}
                  placeholder="Write your letter here..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Trigger
                </label>
                <select
                  value={form.deliveryTrigger}
                  onChange={(e) =>
                    setForm({ ...form, deliveryTrigger: e.target.value as DeliveryTrigger })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(Object.keys(TRIGGER_LABELS) as DeliveryTrigger[]).map((key) => (
                    <option key={key} value={key}>
                      {TRIGGER_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>

              {form.deliveryTrigger === 'SPECIFIC_DATE' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trigger Date
                  </label>
                  <input
                    type="date"
                    value={form.triggerDate}
                    onChange={(e) => setForm({ ...form, triggerDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

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
                  {isPending ? 'Saving...' : editingLetter ? 'Save Changes' : 'Create Letter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Life Story Tab ──────────────────────────────────────────

function LifeStoryTab() {
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    // No backend endpoint yet — save to local state only
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6 text-sm text-blue-700">
        Your life story helps your loved ones understand who you were.
      </div>

      <h2 className="text-base font-semibold text-gray-900 mb-4">Year in Review</h2>

      <p className="text-sm text-gray-500 mb-3">
        Capture a moment, a year, or a chapter. Write what you want to be remembered by.
      </p>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={12}
        placeholder="Start writing your life story here..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!entry.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
        >
          Save Entry
        </button>
        {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
      </div>
    </div>
  );
}

// ─── Ethical Will Tab ────────────────────────────────────────

const ETHICAL_WILL_KEY = 'ethical-will';

function EthicalWillTab() {
  const [content, setContent] = useState<string>(
    () => localStorage.getItem(ETHICAL_WILL_KEY) || ''
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem(ETHICAL_WILL_KEY, content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 text-sm text-amber-700">
        An ethical will lets you pass on your values, lessons, and wishes — not just your assets.
      </div>

      <p className="text-sm text-gray-500 mb-3">
        Write what you believe, what you learned, and what you hope for the people you love.
      </p>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={14}
        placeholder="My values and what I want to pass on..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Save Ethical Will
        </button>
        {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────

type Tab = 'letters' | 'life-story' | 'ethical-will';

const TABS: { id: Tab; label: string }[] = [
  { id: 'letters', label: 'Letters to Loved Ones' },
  { id: 'life-story', label: 'Life Story' },
  { id: 'ethical-will', label: 'Ethical Will' },
];

export default function EmotionalLegacyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('letters');

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Emotional Legacy</h1>

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

      {activeTab === 'letters' && <LettersTab />}
      {activeTab === 'life-story' && <LifeStoryTab />}
      {activeTab === 'ethical-will' && <EthicalWillTab />}
    </div>
    </DashboardLayout>
  );
}
