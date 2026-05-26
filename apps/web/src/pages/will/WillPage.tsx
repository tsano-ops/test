import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Plus, Pencil, Trash2, X, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ─── Types ──────────────────────────────────────────────────

type LegalDocumentType =
  | 'WILL'
  | 'TRUST'
  | 'POA'
  | 'GUARDIANSHIP'
  | 'ADVANCE_DIRECTIVE'
  | 'BUSINESS_CONTINUITY';

interface LegalDocument {
  id: string;
  type: LegalDocumentType;
  title: string;
  instructions?: string;
  templateUrl?: string;
  documentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface DocFormData {
  title: string;
  instructions: string;
  templateUrl: string;
  documentId: string;
}

const EMPTY_FORM: DocFormData = {
  title: '',
  instructions: '',
  templateUrl: '',
  documentId: '',
};

// ─── Static document type info ───────────────────────────────

const DOC_TYPE_INFO: Record<
  LegalDocumentType,
  { label: string; description: string }
> = {
  WILL: {
    label: 'Last Will & Testament',
    description: 'Specifies how your assets should be distributed.',
  },
  TRUST: {
    label: 'Trust',
    description: 'A legal arrangement for asset management.',
  },
  POA: {
    label: 'Power of Attorney',
    description: 'Authorizes someone to act on your behalf.',
  },
  GUARDIANSHIP: {
    label: 'Guardianship Declaration',
    description: 'Names a guardian for your dependents.',
  },
  ADVANCE_DIRECTIVE: {
    label: 'Advance Directive',
    description: 'Medical wishes if incapacitated.',
  },
  BUSINESS_CONTINUITY: {
    label: 'Business Continuity Plan',
    description: 'Instructions for business operations.',
  },
};

const DOC_TYPES = Object.keys(DOC_TYPE_INFO) as LegalDocumentType[];

// ─── Document Section Card ───────────────────────────────────

function DocumentSectionCard({
  type,
  document,
  onAdd,
  onEdit,
  onDelete,
}: {
  type: LegalDocumentType;
  document: LegalDocument | undefined;
  onAdd: (type: LegalDocumentType) => void;
  onEdit: (doc: LegalDocument) => void;
  onDelete: (id: string) => void;
}) {
  const info = DOC_TYPE_INFO[type];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900">{info.label}</h3>
            {document ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <CheckCircle size={11} />
                Uploaded
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                <AlertCircle size={11} />
                Not Added
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-2">{info.description}</p>

          {document && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-800">{document.title}</p>
              {document.instructions && (
                <p className="text-sm text-gray-500">{document.instructions}</p>
              )}
              {document.templateUrl && (
                <a
                  href={document.templateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <ExternalLink size={11} />
                  View template
                </a>
              )}
              {document.documentId && (
                <p className="text-xs text-gray-400">Document ref: {document.documentId}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {document ? (
            <>
              <button
                onClick={() => onEdit(document)}
                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => onDelete(document.id)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </>
          ) : (
            <button
              onClick={() => onAdd(type)}
              className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-xs font-medium"
            >
              <Plus size={13} />
              Add Document
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────

export default function WillPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<LegalDocument | null>(null);
  const [targetType, setTargetType] = useState<LegalDocumentType | null>(null);
  const [form, setForm] = useState<DocFormData>(EMPTY_FORM);

  const { data: documents = [], isLoading } = useQuery<LegalDocument[]>({
    queryKey: ['legal-documents'],
    queryFn: () => api.get('/legal/documents').then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/legal/documents', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal-documents'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/legal/documents/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal-documents'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/legal/documents/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['legal-documents'] }),
  });

  function openAdd(type: LegalDocumentType) {
    setEditingDoc(null);
    setTargetType(type);
    setForm({ ...EMPTY_FORM, title: DOC_TYPE_INFO[type].label });
    setModalOpen(true);
  }

  function openEdit(doc: LegalDocument) {
    setEditingDoc(doc);
    setTargetType(doc.type);
    setForm({
      title: doc.title,
      instructions: doc.instructions || '',
      templateUrl: doc.templateUrl || '',
      documentId: doc.documentId || '',
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingDoc(null);
    setTargetType(null);
    setForm(EMPTY_FORM);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {
      title: form.title,
      type: targetType,
    };
    if (form.instructions) payload.instructions = form.instructions;
    if (form.templateUrl) payload.templateUrl = form.templateUrl;
    if (form.documentId) payload.documentId = form.documentId;

    if (editingDoc) {
      updateMutation.mutate({ id: editingDoc.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  // Build a map of type → document
  const docByType = new Map<LegalDocumentType, LegalDocument>();
  documents.forEach((doc) => docByType.set(doc.type, doc));

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Legal Documents</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage your legal documents and instructions for each. These form the legal backbone of
        your plan.
      </p>

      {isLoading ? (
        <div className="text-center text-gray-400 py-12 text-sm">Loading...</div>
      ) : (
        <div className="space-y-3">
          {DOC_TYPES.map((type) => (
            <DocumentSectionCard
              key={type}
              type={type}
              document={docByType.get(type)}
              onAdd={openAdd}
              onEdit={openEdit}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && targetType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingDoc ? 'Edit Document' : 'Add Document'}
              </h2>
              <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {DOC_TYPE_INFO[targetType].label} — {DOC_TYPE_INFO[targetType].description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Document title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.instructions}
                  onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                  rows={4}
                  placeholder="Notes or instructions for your executor..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template URL <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.templateUrl}
                  onChange={(e) => setForm({ ...form, templateUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Reference ID <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.documentId}
                  onChange={(e) => setForm({ ...form, documentId: e.target.value })}
                  placeholder="e.g. vault file ID or external reference"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  {isPending ? 'Saving...' : editingDoc ? 'Save Changes' : 'Add Document'}
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
