import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, memorialApi } from '@/lib/api';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface ChecklistStep {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

interface Resource {
  id: string;
  title: string;
  description: string;
}

interface MemorialData {
  fullName: string;
  dateOfBirth: string;
  dateOfPassing: string;
  photoUrl: string;
  biography: string;
  tributeMessage: string;
  isPublished: boolean;
}

const TOTAL_STEPS = 8;

function ActionChecklistTab() {
  const queryClient = useQueryClient();

  const { data: steps, isLoading } = useQuery<ChecklistStep[]>({
    queryKey: ['post-loss-checklist'],
    queryFn: () => api.get('/post-loss/checklist').then((r) => r.data),
  });

  const complete = useMutation({
    mutationFn: (stepId: string) =>
      api.post(`/post-loss/checklist/${stepId}/complete`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['post-loss-checklist'] }),
  });

  const completedCount = steps?.filter((s) => s.completed).length ?? 0;
  const total = steps?.length ?? TOTAL_STEPS;
  const progressPct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  if (isLoading) return <p className="text-sm text-gray-500 py-4">Loading checklist...</p>;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {completedCount} / {total} steps completed
          </span>
          <span className="text-sm text-gray-500">{progressPct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {steps?.map((step) => (
          <div
            key={step.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4"
          >
            <input
              type="checkbox"
              checked={step.completed}
              onChange={() => {
                if (!step.completed) complete.mutate(step.id);
              }}
              disabled={step.completed || complete.isPending}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-default"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${step.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                {step.title}
              </p>
              {step.category && (
                <p className="text-xs text-gray-500 mt-0.5">{step.category}</p>
              )}
            </div>
            {step.completed && (
              <span className="text-xs text-green-600 font-medium flex-shrink-0">Done</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesTab() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['post-loss-resources'],
    queryFn: () => api.get('/post-loss/resources').then((r) => r.data),
  });

  if (isLoading) return <p className="text-sm text-gray-500 py-4">Loading resources...</p>;
  if (!resources?.length) return <p className="text-sm text-gray-500 py-4">No resources available.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {resources.map((res) => (
        <div key={res.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">{res.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{res.description}</p>
        </div>
      ))}
    </div>
  );
}

function ObituaryTab() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('obituary-draft');
    if (stored) setText(stored);
  }, []);

  function handleSave() {
    localStorage.setItem('obituary-draft', text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
        </svg>
        <p className="text-xs text-blue-700 leading-relaxed">
          This draft stays private and is never published automatically.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Obituary Draft</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          placeholder="Begin writing the obituary here. This can be kept private until you're ready to publish."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
        <div className="flex items-center justify-end gap-3 mt-4">
          {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

function MemorialTab() {
  const queryClient = useQueryClient();

  const { data: memorial, isLoading } = useQuery<MemorialData>({
    queryKey: ['memorial'],
    queryFn: () => memorialApi.get().then((r) => r.data),
  });

  const [form, setForm] = useState<MemorialData>({
    fullName: '',
    dateOfBirth: '',
    dateOfPassing: '',
    photoUrl: '',
    biography: '',
    tributeMessage: '',
    isPublished: false,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (memorial) {
      setForm(memorial);
    }
  }, [memorial]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<MemorialData>) =>
      memorialApi.update(data as Record<string, unknown>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memorial'] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  function handleChange(field: keyof MemorialData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    updateMutation.mutate(form);
  }

  if (isLoading) return <p className="text-sm text-gray-500 py-4">Loading memorial page...</p>;

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Memorial Page Details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Full name of the person"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              value={form.photoUrl}
              onChange={(e) => handleChange('photoUrl', e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Passing</label>
            <input
              type="date"
              value={form.dateOfPassing}
              onChange={(e) => handleChange('dateOfPassing', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
          <textarea
            value={form.biography}
            onChange={(e) => handleChange('biography', e.target.value)}
            rows={6}
            placeholder="Share their story, achievements, and the life they lived."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tribute Message</label>
          <textarea
            value={form.tributeMessage}
            onChange={(e) => handleChange('tributeMessage', e.target.value)}
            rows={4}
            placeholder="A personal tribute or closing message for visitors."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => handleChange('isPublished', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-sm font-medium text-gray-700">
            {form.isPublished ? 'Published' : 'Draft (not published)'}
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Memorial'}
          </button>
        </div>
      </div>

      {/* Preview */}
      {(form.fullName || form.biography || form.tributeMessage) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${form.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {form.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
            <div className="text-center">
              {form.photoUrl && (
                <img
                  src={form.photoUrl}
                  alt={form.fullName || 'Memorial photo'}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white shadow-md"
                />
              )}

              {form.fullName && (
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{form.fullName}</h3>
              )}

              {(form.dateOfBirth || form.dateOfPassing) && (
                <p className="text-sm text-gray-500 mb-4">
                  {form.dateOfBirth && new Date(form.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  {form.dateOfBirth && form.dateOfPassing && ' — '}
                  {form.dateOfPassing && new Date(form.dateOfPassing).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>

            {form.biography && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Biography</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{form.biography}</p>
              </div>
            )}

            {form.tributeMessage && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Tribute</h4>
                <p className="text-sm text-gray-600 leading-relaxed italic whitespace-pre-line">{form.tributeMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type Tab = 'checklist' | 'resources' | 'obituary' | 'memorial';

export default function PostLossPage() {
  const [activeTab, setActiveTab] = useState<Tab>('checklist');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'checklist', label: 'Action Checklist' },
    { key: 'resources', label: 'Resources' },
    { key: 'obituary', label: 'Obituary' },
    { key: 'memorial', label: 'Memorial Page' },
  ];

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Post-Loss Support</h1>

      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium -mb-px ${
              activeTab === tab.key
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'checklist' && <ActionChecklistTab />}
      {activeTab === 'resources' && <ResourcesTab />}
      {activeTab === 'obituary' && <ObituaryTab />}
      {activeTab === 'memorial' && <MemorialTab />}
    </div>
    </DashboardLayout>
  );
}
