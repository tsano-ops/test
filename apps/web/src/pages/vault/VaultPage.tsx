import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Trash2, X, Search, ExternalLink, FileText, Key } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ─── Types ──────────────────────────────────────────────────

interface VaultDocument {
  id: string;
  fileName: string;
  fileType?: string;
  fileSize?: number;
  category?: string;
  tags?: string[];
  s3Key?: string;
  createdAt: string;
}

interface Credential {
  id: string;
  institution: string;
  username: string;
  url?: string;
  assetId?: string;
  asset?: { name: string };
  createdAt: string;
}

interface DocFormData {
  fileName: string;
  fileType: string;
  fileSize: string;
  s3Key: string;
  category: string;
  tags: string;
}

interface CredFormData {
  assetId: string;
  institution: string;
  username: string;
  encryptedPassword: string;
  url: string;
}

const EMPTY_DOC_FORM: DocFormData = {
  fileName: '',
  fileType: '',
  fileSize: '',
  s3Key: '',
  category: '',
  tags: '',
};

const EMPTY_CRED_FORM: CredFormData = {
  assetId: '',
  institution: '',
  username: '',
  encryptedPassword: '',
  url: '',
};

// ─── Helpers ─────────────────────────────────────────────────

function formatFileSize(bytes: number | undefined): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Documents Tab ───────────────────────────────────────────

function DocumentsTab() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<DocFormData>(EMPTY_DOC_FORM);

  const { data: documents = [], isLoading } = useQuery<VaultDocument[]>({
    queryKey: ['vault-documents'],
    queryFn: () => api.get('/vault').then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/documents', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault-documents'] });
      setModalOpen(false);
      setForm(EMPTY_DOC_FORM);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/documents/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vault-documents'] }),
  });

  // Unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = new Set<string>();
    documents.forEach((d) => { if (d.category) cats.add(d.category); });
    return ['All', ...Array.from(cats).sort()];
  }, [documents]);

  // Client-side filter
  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory = categoryFilter === 'All' || doc.category === categoryFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        doc.fileName.toLowerCase().includes(q) ||
        (doc.category || '').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [documents, search, categoryFilter]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {
      fileName: form.fileName,
    };
    if (form.fileType) payload.fileType = form.fileType;
    if (form.fileSize) payload.fileSize = Number(form.fileSize);
    if (form.s3Key) payload.s3Key = form.s3Key;
    if (form.category) payload.category = form.category;
    if (form.tags) payload.tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

    createMutation.mutate(payload);
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => { setForm(EMPTY_DOC_FORM); setModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Plus size={16} />
          Register Document
        </button>
      </div>

      {/* Category pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-sm">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-12 text-sm">
          {documents.length === 0
            ? 'No documents registered. Add your first document.'
            : 'No documents match your search.'}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">File Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Size</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-gray-900 truncate max-w-[200px]">
                        {doc.fileName}
                      </span>
                    </div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 ml-5">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {doc.fileType ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 uppercase">
                        {doc.fileType}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{doc.category || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{formatFileSize(doc.fileSize)}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(doc.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteMutation.mutate(doc.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Register Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Register Document</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Register a document reference. Upload happens separately via S3.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                <input
                  required
                  type="text"
                  value={form.fileName}
                  onChange={(e) => setForm({ ...form, fileName: e.target.value })}
                  placeholder="e.g. will-final-2024.pdf"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Type <span className="text-gray-400 font-normal">(opt)</span>
                  </label>
                  <input
                    type="text"
                    value={form.fileType}
                    onChange={(e) => setForm({ ...form, fileType: e.target.value })}
                    placeholder="pdf, jpg..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Size (bytes) <span className="text-gray-400 font-normal">(opt)</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.fileSize}
                    onChange={(e) => setForm({ ...form, fileSize: e.target.value })}
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  S3 Key <span className="text-gray-400 font-normal">(opt)</span>
                </label>
                <input
                  type="text"
                  value={form.s3Key}
                  onChange={(e) => setForm({ ...form, s3Key: e.target.value })}
                  placeholder="uploads/user-id/filename"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-gray-400 font-normal">(opt)</span>
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Legal, Insurance, Medical"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags <span className="text-gray-400 font-normal">(comma-separated, opt)</span>
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="will, legal, important"
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
                  {createMutation.isPending ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Credentials Tab ─────────────────────────────────────────

function CredentialsTab() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<CredFormData>(EMPTY_CRED_FORM);

  const { data: credentials = [], isLoading } = useQuery<Credential[]>({
    queryKey: ['vault-credentials'],
    queryFn: () => api.get('/vault/credentials').then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/vault/credentials', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vault-credentials'] });
      setModalOpen(false);
      setForm(EMPTY_CRED_FORM);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/vault/credentials/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vault-credentials'] }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {
      institution: form.institution,
      username: form.username,
      encryptedPassword: form.encryptedPassword,
    };
    if (form.assetId) payload.assetId = form.assetId;
    if (form.url) payload.url = form.url;
    createMutation.mutate(payload);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Store login credentials securely alongside your assets.
        </p>
        <button
          onClick={() => { setForm(EMPTY_CRED_FORM); setModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Plus size={16} />
          Add Credential
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-sm">Loading...</div>
      ) : credentials.length === 0 ? (
        <div className="text-center text-gray-400 py-12 text-sm">
          No credentials stored. Add your first entry.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Institution</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Username</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">URL</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Asset</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {credentials.map((cred) => (
                <tr key={cred.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Key size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{cred.institution}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cred.username}</td>
                  <td className="px-4 py-3">
                    {cred.url ? (
                      <a
                        href={cred.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                      >
                        <ExternalLink size={11} />
                        {(() => { try { return new URL(cred.url).hostname; } catch { return cred.url; } })()}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {cred.asset?.name || (cred.assetId ? cred.assetId : '—')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteMutation.mutate(cred.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Credential Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Credential</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  required
                  type="text"
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="e.g. Chase Bank, Gmail"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username / Email</label>
                <input
                  required
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="username or email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  required
                  type="password"
                  value={form.encryptedPassword}
                  onChange={(e) => setForm({ ...form, encryptedPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset ID <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.assetId}
                  onChange={(e) => setForm({ ...form, assetId: e.target.value })}
                  placeholder="Link to an asset by ID"
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
                  {createMutation.isPending ? 'Saving...' : 'Add Credential'}
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

type Tab = 'documents' | 'credentials';

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<Tab>('documents');

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Vault</h1>

      <div className="flex border-b border-gray-200 mb-6">
        {(['documents', 'credentials'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'documents' ? 'Documents' : 'Credentials'}
          </button>
        ))}
      </div>

      {activeTab === 'documents' && <DocumentsTab />}
      {activeTab === 'credentials' && <CredentialsTab />}
    </div>
    </DashboardLayout>
  );
}
