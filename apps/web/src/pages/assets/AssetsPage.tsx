import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Pencil,
  Trash2,
  Landmark,
  Bitcoin,
  Home,
  Car,
  Globe,
  Package,
  Briefcase,
  Lightbulb,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Scale,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

type AssetCategory =
  | 'FINANCIAL_ACCOUNTS'
  | 'CRYPTO_BLOCKCHAIN'
  | 'REAL_ESTATE'
  | 'VEHICLES'
  | 'DIGITAL_ONLINE'
  | 'PERSONAL_PROPERTY'
  | 'BUSINESS_INTERESTS'
  | 'INTELLECTUAL_PROPERTY'
  | 'OTHER';

type LiabilityCategory =
  | 'MORTGAGE'
  | 'AUTO_LOAN'
  | 'STUDENT_LOAN'
  | 'CREDIT_CARD'
  | 'PERSONAL_LOAN'
  | 'BUSINESS_DEBT'
  | 'TAX_DEBT'
  | 'OTHER';

interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  description?: string;
  value?: number;
  currency?: string;
  institution?: string;
}

interface Liability {
  id: string;
  name: string;
  category: LiabilityCategory;
  amount?: number;
  currency?: string;
  institution?: string;
  monthlyPayment?: number;
  dueDate?: string;
}

interface NetWorth {
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
}

interface AssetFormData {
  name: string;
  category: AssetCategory;
  description: string;
  value: string;
  currency: string;
  institution: string;
}

interface LiabilityFormData {
  name: string;
  category: LiabilityCategory;
  amount: string;
  currency: string;
  institution: string;
  monthlyPayment: string;
  dueDate: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ASSET_CATEGORIES: { value: AssetCategory; label: string; icon: React.ReactNode }[] = [
  { value: 'FINANCIAL_ACCOUNTS', label: 'Financial Accounts', icon: <Landmark size={18} /> },
  { value: 'CRYPTO_BLOCKCHAIN', label: 'Crypto & Blockchain', icon: <Bitcoin size={18} /> },
  { value: 'REAL_ESTATE', label: 'Real Estate', icon: <Home size={18} /> },
  { value: 'VEHICLES', label: 'Vehicles', icon: <Car size={18} /> },
  { value: 'DIGITAL_ONLINE', label: 'Digital & Online', icon: <Globe size={18} /> },
  { value: 'PERSONAL_PROPERTY', label: 'Personal Property', icon: <Package size={18} /> },
  { value: 'BUSINESS_INTERESTS', label: 'Business Interests', icon: <Briefcase size={18} /> },
  { value: 'INTELLECTUAL_PROPERTY', label: 'Intellectual Property', icon: <Lightbulb size={18} /> },
  { value: 'OTHER', label: 'Other', icon: <MoreHorizontal size={18} /> },
];

const LIABILITY_CATEGORIES: { value: LiabilityCategory; label: string }[] = [
  { value: 'MORTGAGE', label: 'Mortgage' },
  { value: 'AUTO_LOAN', label: 'Auto Loan' },
  { value: 'STUDENT_LOAN', label: 'Student Loan' },
  { value: 'CREDIT_CARD', label: 'Credit Card' },
  { value: 'PERSONAL_LOAN', label: 'Personal Loan' },
  { value: 'BUSINESS_DEBT', label: 'Business Debt' },
  { value: 'TAX_DEBT', label: 'Tax Debt' },
  { value: 'OTHER', label: 'Other' },
];

const formatCurrency = (amount?: number, currency = 'EUR') => {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(amount);
};

// ─── Asset Modal ──────────────────────────────────────────────────────────────

function AssetModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Asset;
  onClose: () => void;
  onSave: (data: AssetFormData) => void;
}) {
  const [form, setForm] = useState<AssetFormData>({
    name: initial?.name ?? '',
    category: initial?.category ?? 'FINANCIAL_ACCOUNTS',
    description: initial?.description ?? '',
    value: initial?.value != null ? String(initial.value) : '',
    currency: initial?.currency ?? 'EUR',
    institution: initial?.institution ?? '',
  });

  const set = (field: keyof AssetFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {initial ? 'Edit Asset' : 'Add Asset'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Checking Account"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => set('category', e.target.value as AssetCategory)}
            >
              {ASSET_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Optional notes"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.value}
                onChange={(e) => set('value', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.currency}
                onChange={(e) => set('currency', e.target.value)}
                placeholder="EUR"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.institution}
              onChange={(e) => set('institution', e.target.value)}
              placeholder="e.g. ING Bank"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.name.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initial ? 'Save Changes' : 'Add Asset'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Liability Modal ───────────────────────────────────────────────────────────

function LiabilityModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Liability;
  onClose: () => void;
  onSave: (data: LiabilityFormData) => void;
}) {
  const [form, setForm] = useState<LiabilityFormData>({
    name: initial?.name ?? '',
    category: initial?.category ?? 'MORTGAGE',
    amount: initial?.amount != null ? String(initial.amount) : '',
    currency: initial?.currency ?? 'EUR',
    institution: initial?.institution ?? '',
    monthlyPayment: initial?.monthlyPayment != null ? String(initial.monthlyPayment) : '',
    dueDate: initial?.dueDate ? initial.dueDate.split('T')[0] : '',
  });

  const set = (field: keyof LiabilityFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {initial ? 'Edit Liability' : 'Add Liability'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Home Mortgage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => set('category', e.target.value as LiabilityCategory)}
            >
              {LIABILITY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.currency}
                onChange={(e) => set('currency', e.target.value)}
                placeholder="EUR"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.institution}
              onChange={(e) => set('institution', e.target.value)}
              placeholder="e.g. UniCredit"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Payment</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.monthlyPayment}
                onChange={(e) => set('monthlyPayment', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.name.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initial ? 'Save Changes' : 'Add Liability'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm ────────────────────────────────────────────────────────────

function DeleteConfirm({
  label,
  onConfirm,
  onCancel,
}: {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete item</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-800">{label}</span>? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Assets Tab ────────────────────────────────────────────────────────────────

function AssetsTab({ assets, onEdit, onDelete }: {
  assets: Asset[];
  onEdit: (a: Asset) => void;
  onDelete: (a: Asset) => void;
}) {
  return (
    <div className="space-y-4">
      {ASSET_CATEGORIES.map((cat) => {
        const items = assets.filter((a) => a.category === cat.value);
        return (
          <div key={cat.value} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-500">{cat.icon}</span>
              <h3 className="text-sm font-semibold text-gray-800">{cat.label}</h3>
              {items.length > 0 && (
                <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {items.length}
                </span>
              )}
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-gray-400 py-2">No items yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-2.5 gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      {item.institution && (
                        <p className="text-xs text-gray-400 truncate">{item.institution}</p>
                      )}
                    </div>
                    {item.value != null && (
                      <span className="text-sm font-semibold text-gray-700 shrink-0">
                        {formatCurrency(item.value, item.currency)}
                      </span>
                    )}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Liabilities Tab ──────────────────────────────────────────────────────────

function LiabilitiesTab({ liabilities, onEdit, onDelete }: {
  liabilities: Liability[];
  onEdit: (l: Liability) => void;
  onDelete: (l: Liability) => void;
}) {
  if (liabilities.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-center text-gray-400 py-12 text-sm">No liabilities added yet.</p>
      </div>
    );
  }

  const grouped = LIABILITY_CATEGORIES.reduce<Record<string, Liability[]>>((acc, cat) => {
    const items = liabilities.filter((l) => l.category === cat.value);
    if (items.length) acc[cat.label] = items;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([label, items]) => (
        <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">{label}</h3>
          <div className="divide-y divide-gray-50">
            {items.map((item) => (
              <div key={item.id} className="flex items-center py-2.5 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {item.institution && (
                      <span className="text-xs text-gray-400">{item.institution}</span>
                    )}
                    {item.monthlyPayment != null && (
                      <span className="text-xs text-gray-400">
                        {formatCurrency(item.monthlyPayment, item.currency)}/mo
                      </span>
                    )}
                    {item.dueDate && (
                      <span className="text-xs text-gray-400">
                        Due {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                {item.amount != null && (
                  <span className="text-sm font-semibold text-red-600 shrink-0">
                    {formatCurrency(item.amount, item.currency)}
                  </span>
                )}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AssetsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'assets' | 'liabilities'>('assets');

  // Modals
  const [assetModal, setAssetModal] = useState<{ open: boolean; item?: Asset }>({ open: false });
  const [liabilityModal, setLiabilityModal] = useState<{ open: boolean; item?: Liability }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    type: 'asset' | 'liability';
    item?: Asset | Liability;
  }>({ open: false, type: 'asset' });

  // Queries
  const { data: netWorth } = useQuery<NetWorth>({
    queryKey: ['net-worth'],
    queryFn: () => api.get('/assets/net-worth').then((r) => r.data),
  });

  const { data: assets = [] } = useQuery<Asset[]>({
    queryKey: ['assets'],
    queryFn: () => api.get('/assets').then((r) => r.data),
  });

  const { data: liabilities = [] } = useQuery<Liability[]>({
    queryKey: ['liabilities'],
    queryFn: () => api.get('/liabilities').then((r) => r.data),
  });

  // Asset mutations
  const createAsset = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/assets', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assets'] }),
  });
  const updateAsset = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/assets/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assets'] }),
  });
  const deleteAsset = useMutation({
    mutationFn: (id: string) => api.delete(`/assets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });

  // Liability mutations
  const createLiability = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.post('/liabilities', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liabilities'] });
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
  const updateLiability = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/liabilities/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liabilities'] });
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
  const deleteLiability = useMutation({
    mutationFn: (id: string) => api.delete(`/liabilities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['liabilities'] });
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });

  // Handlers — Assets
  const handleSaveAsset = (form: AssetFormData) => {
    const payload = {
      name: form.name,
      category: form.category,
      description: form.description || undefined,
      value: form.value ? parseFloat(form.value) : undefined,
      currency: form.currency || 'EUR',
      institution: form.institution || undefined,
    };
    if (assetModal.item) {
      updateAsset.mutate({ id: assetModal.item.id, data: payload });
    } else {
      createAsset.mutate(payload);
    }
    setAssetModal({ open: false });
    queryClient.invalidateQueries({ queryKey: ['net-worth'] });
  };

  // Handlers — Liabilities
  const handleSaveLiability = (form: LiabilityFormData) => {
    const payload = {
      name: form.name,
      category: form.category,
      amount: form.amount ? parseFloat(form.amount) : undefined,
      currency: form.currency || 'EUR',
      institution: form.institution || undefined,
      monthlyPayment: form.monthlyPayment ? parseFloat(form.monthlyPayment) : undefined,
      dueDate: form.dueDate || undefined,
    };
    if (liabilityModal.item) {
      updateLiability.mutate({ id: liabilityModal.item.id, data: payload });
    } else {
      createLiability.mutate(payload);
    }
    setLiabilityModal({ open: false });
  };

  const handleDelete = () => {
    if (!deleteModal.item) return;
    if (deleteModal.type === 'asset') {
      deleteAsset.mutate(deleteModal.item.id);
    } else {
      deleteLiability.mutate(deleteModal.item.id);
    }
    setDeleteModal({ open: false, type: 'asset' });
  };

  const nw = netWorth?.net_worth ?? 0;

  return (
    <DashboardLayout>
      <div className="greeting-zone">
        <h1 className="greeting-text">Assets &amp; Liabilities</h1>
      </div>

      <main className="page active">
        <div className="page-transition" style={{ gap: '10px' }}>

          {/* Net Worth Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-medium text-gray-500 mb-4">Net Worth Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-green-600">
                  <TrendingUp size={16} />
                  <span className="text-xs font-medium">Total Assets</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  {formatCurrency(netWorth?.total_assets)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-red-500">
                  <TrendingDown size={16} />
                  <span className="text-xs font-medium">Total Liabilities</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  {formatCurrency(netWorth?.total_liabilities)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <Scale size={16} />
                  <span className="text-xs font-medium">Net Worth</span>
                </div>
                <span className={`text-xl font-semibold ${nw >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {formatCurrency(nw)}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs + Add button */}
          <div className="flex items-center justify-between">
            <div className="flex border-b border-gray-200 gap-0">
              {(['assets', 'liabilities'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                activeTab === 'assets'
                  ? setAssetModal({ open: true })
                  : setLiabilityModal({ open: true })
              }
              className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              <Plus size={15} />
              {activeTab === 'assets' ? 'Add Asset' : 'Add Liability'}
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'assets' ? (
            <AssetsTab
              assets={assets}
              onEdit={(item) => setAssetModal({ open: true, item })}
              onDelete={(item) => setDeleteModal({ open: true, type: 'asset', item })}
            />
          ) : (
            <LiabilitiesTab
              liabilities={liabilities}
              onEdit={(item) => setLiabilityModal({ open: true, item })}
              onDelete={(item) => setDeleteModal({ open: true, type: 'liability', item })}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      {assetModal.open && (
        <AssetModal
          initial={assetModal.item}
          onClose={() => setAssetModal({ open: false })}
          onSave={handleSaveAsset}
        />
      )}
      {liabilityModal.open && (
        <LiabilityModal
          initial={liabilityModal.item}
          onClose={() => setLiabilityModal({ open: false })}
          onSave={handleSaveLiability}
        />
      )}
      {deleteModal.open && deleteModal.item && (
        <DeleteConfirm
          label={deleteModal.item.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal({ open: false, type: 'asset' })}
        />
      )}
    </DashboardLayout>
  );
}
