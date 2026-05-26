import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Pencil, Save, Heart, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { profileApi, api } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

type Allergyseverity = 'MILD' | 'MODERATE' | 'SEVERE' | 'LIFE_THREATENING';

interface MedicalCondition {
  id: string;
  conditionName: string;
  status?: string;
  notes?: string;
}

interface Allergy {
  id: string;
  name: string;
  severity?: Allergyseverity;
  reaction?: string;
}

interface GettingOldData {
  carePreferences?: string;
  painManagement?: string;
  hospicePreferences?: string;
  spiritualNeeds?: string;
  healthPoaName?: string;
  healthPoaContact?: string;
}

interface EndOfLifeData {
  organDonation?: boolean;
  organDonationDetails?: string;
  funeralPreferences?: string;
  prePaidArrangements?: boolean;
  prePaidDetails?: string;
  burialLocation?: string;
  obituaryDraft?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SEVERITY_BADGE: Record<AllergyService, string> = {
  MILD: 'bg-green-100 text-green-800',
  MODERATE: 'bg-yellow-100 text-yellow-800',
  SEVERE: 'bg-orange-100 text-orange-800',
  LIFE_THREATENING: 'bg-red-100 text-red-800',
};

type AllergyService = Allergyseverity;

const SEVERITY_LABELS: { value: AllergyService; label: string }[] = [
  { value: 'MILD', label: 'Mild' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'SEVERE', label: 'Severe' },
  { value: 'LIFE_THREATENING', label: 'Life-threatening' },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Plus size={14} />
        Add
      </button>
    </div>
  );
}

// ─── Condition Modal ──────────────────────────────────────────────────────────

function ConditionModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: MedicalCondition;
  onClose: () => void;
  onSave: (data: Partial<MedicalCondition>) => void;
}) {
  const [form, setForm] = useState({
    conditionName: initial?.conditionName ?? '',
    status: initial?.status ?? '',
    notes: initial?.notes ?? '',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {initial ? 'Edit Condition' : 'Add Condition'}
        </h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.conditionName}
              onChange={(e) => setForm((f) => ({ ...f, conditionName: e.target.value }))}
              placeholder="e.g. Type 2 Diabetes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              placeholder="e.g. Managed, Active, In remission"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Additional notes"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.conditionName.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {initial ? 'Save Changes' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Allergy Modal ────────────────────────────────────────────────────────────

function AllergyModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Allergy;
  onClose: () => void;
  onSave: (data: Partial<Allergy>) => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    severity: (initial?.severity ?? '') as AllergyService | '' as AllergyService | '',
    reaction: initial?.reaction ?? '',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {initial ? 'Edit Allergy' : 'Add Allergy'}
        </h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergen</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Penicillin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.severity}
              onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value as AllergyService }))}
            >
              <option value="">Select severity</option>
              {SEVERITY_LABELS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reaction</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.reaction}
              onChange={(e) => setForm((f) => ({ ...f, reaction: e.target.value }))}
              placeholder="e.g. Hives, anaphylaxis"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const { severity, ...rest } = form;
              onSave({ ...rest, ...(severity ? { severity: severity as AllergyService } : {}) });
            }}
            disabled={!form.name.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {initial ? 'Save Changes' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ICE Tab ──────────────────────────────────────────────────────────────────

function ICETab() {
  const queryClient = useQueryClient();

  const [bloodType, setBloodType] = useState('');
  const [bloodTypeSaved, setBloodTypeSaved] = useState(false);

  const [conditionModal, setConditionModal] = useState<{ open: boolean; item?: MedicalCondition }>({ open: false });
  const [allergyModal, setAllergyModal] = useState<{ open: boolean; item?: Allergy }>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'condition' | 'allergy'; id: string; name: string } | null>(null);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.get().then((r) => r.data),
  });

  useEffect(() => {
    if (profile?.bloodType) setBloodType(profile.bloodType);
  }, [profile]);

  const { data: conditions = [] } = useQuery<MedicalCondition[]>({
    queryKey: ['medical'],
    queryFn: () => profileApi.getMedical().then((r) => r.data),
  });

  const { data: allergies = [] } = useQuery<Allergy[]>({
    queryKey: ['allergies'],
    queryFn: () => profileApi.getAllergies().then((r) => r.data),
  });

  const saveBloodType = useMutation({
    mutationFn: () => profileApi.updateEssential({ bloodType }),
    onSuccess: () => {
      setBloodTypeSaved(true);
      setTimeout(() => setBloodTypeSaved(false), 2000);
    },
  });

  const createCondition = useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.createMedical(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medical'] }),
  });
  const updateCondition = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      profileApi.updateMedical(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medical'] }),
  });
  const deleteConditionMut = useMutation({
    mutationFn: (id: string) => profileApi.deleteMedical(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medical'] }),
  });

  const createAllergy = useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.createAllergy(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['allergies'] }),
  });
  const updateAllergyMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      profileApi.updateAllergy(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['allergies'] }),
  });
  const deleteAllergyMut = useMutation({
    mutationFn: (id: string) => profileApi.deleteAllergy(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['allergies'] }),
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'condition') deleteConditionMut.mutate(deleteTarget.id);
    else deleteAllergyMut.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Blood Type */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Blood Type</h3>
          <div className="flex items-center gap-3">
            <input
              className="w-40 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              placeholder="e.g. A+"
            />
            <button
              onClick={() => saveBloodType.mutate()}
              className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              <Save size={14} />
              {bloodTypeSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <SectionHeader title="Medical Conditions" onAdd={() => setConditionModal({ open: true })} />
          {conditions.length === 0 ? (
            <p className="text-center text-gray-400 py-6 text-sm">No conditions recorded.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {conditions.map((c) => (
                <div key={c.id} className="flex items-start py-3 gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{c.conditionName}</p>
                    {c.status && <p className="text-xs text-gray-500 mt-0.5">Status: {c.status}</p>}
                    {c.notes && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{c.notes}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setConditionModal({ open: true, item: c })}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'condition', id: c.id, name: c.conditionName })}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <SectionHeader title="Allergies" onAdd={() => setAllergyModal({ open: true })} />
          {allergies.length === 0 ? (
            <p className="text-center text-gray-400 py-6 text-sm">No allergies recorded.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {allergies.map((a) => (
                <div key={a.id} className="flex items-center py-3 gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">{a.name}</span>
                      {a.severity && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${SEVERITY_BADGE[a.severity]}`}>
                          {SEVERITY_LABELS.find((s) => s.value === a.severity)?.label}
                        </span>
                      )}
                    </div>
                    {a.reaction && <p className="text-xs text-gray-400 mt-0.5">{a.reaction}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setAllergyModal({ open: true, item: a })}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'allergy', id: a.id, name: a.name })}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Condition Modal */}
      {conditionModal.open && (
        <ConditionModal
          initial={conditionModal.item}
          onClose={() => setConditionModal({ open: false })}
          onSave={(data) => {
            if (conditionModal.item) {
              updateCondition.mutate({ id: conditionModal.item.id, data: data as Record<string, unknown> });
            } else {
              createCondition.mutate(data as Record<string, unknown>);
            }
            setConditionModal({ open: false });
          }}
        />
      )}

      {/* Allergy Modal */}
      {allergyModal.open && (
        <AllergyModal
          initial={allergyModal.item}
          onClose={() => setAllergyModal({ open: false })}
          onSave={(data) => {
            const cleaned = { ...data, severity: data.severity || undefined };
            if (allergyModal.item) {
              updateAllergyMut.mutate({ id: allergyModal.item.id, data: cleaned as Record<string, unknown> });
            } else {
              createAllergy.mutate(cleaned as Record<string, unknown>);
            }
            setAllergyModal({ open: false });
          }}
        />
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete record</h2>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete{' '}
              <span className="font-medium text-gray-800">{deleteTarget.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Getting Old Tab ──────────────────────────────────────────────────────────

function GettingOldTab() {
  const [form, setForm] = useState<GettingOldData>({
    carePreferences: '',
    painManagement: '',
    hospicePreferences: '',
    spiritualNeeds: '',
    healthPoaName: '',
    healthPoaContact: '',
  });
  const [saved, setSaved] = useState(false);

  const { data } = useQuery<GettingOldData>({
    queryKey: ['health-getting-old'],
    queryFn: () => api.get('/health/getting-old').then((r) => r.data),
  });

  useEffect(() => {
    if (data) setForm((prev) => ({ ...prev, ...data }));
  }, [data]);

  const save = useMutation({
    mutationFn: () => api.patch('/health/getting-old', form),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  const set = (field: keyof GettingOldData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const fields: { key: keyof GettingOldData; label: string; placeholder: string; textarea?: boolean }[] = [
    { key: 'carePreferences', label: 'Care Preferences', placeholder: 'Where and how you want to receive care as you age...', textarea: true },
    { key: 'painManagement', label: 'Pain Management', placeholder: 'Your wishes regarding pain management and comfort care...', textarea: true },
    { key: 'hospicePreferences', label: 'Hospice Preferences', placeholder: 'Your preferences for end-stage care and hospice...', textarea: true },
    { key: 'spiritualNeeds', label: 'Spiritual Needs', placeholder: 'Religious or spiritual practices important to your care...', textarea: true },
    { key: 'healthPoaName', label: 'Health Power of Attorney — Name', placeholder: 'Full name of your healthcare proxy' },
    { key: 'healthPoaContact', label: 'Health Power of Attorney — Contact', placeholder: 'Phone, email, or address' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-5">
        Record your preferences for care as you age. This guides your family and carers when you need support.
      </p>
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            {f.textarea ? (
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
              />
            ) : (
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={() => save.mutate()}
          className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Save size={14} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

// ─── When I'm Gone Tab ────────────────────────────────────────────────────────

function WhenImGoneTab() {
  const [form, setForm] = useState<EndOfLifeData>({
    organDonation: false,
    organDonationDetails: '',
    funeralPreferences: '',
    prePaidArrangements: false,
    prePaidDetails: '',
    burialLocation: '',
    obituaryDraft: '',
  });
  const [saved, setSaved] = useState(false);

  const { data } = useQuery<EndOfLifeData>({
    queryKey: ['health-end-of-life'],
    queryFn: () => api.get('/health/end-of-life').then((r) => r.data),
  });

  useEffect(() => {
    if (data) setForm((prev) => ({ ...prev, ...data }));
  }, [data]);

  const save = useMutation({
    mutationFn: () => api.patch('/health/end-of-life', form),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  const setStr = (field: keyof EndOfLifeData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const setBool = (field: keyof EndOfLifeData, value: boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-5">
        Record your end-of-life wishes. This information guides your family and executor when the time comes.
      </p>

      <div className="space-y-5">
        {/* Organ Donation */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              id="organDonation"
              checked={form.organDonation ?? false}
              onChange={(e) => setBool('organDonation', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="organDonation" className="text-sm font-medium text-gray-700">
              I consent to organ donation
            </label>
          </div>
          {form.organDonation && (
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.organDonationDetails ?? ''}
              onChange={(e) => setStr('organDonationDetails', e.target.value)}
              placeholder="Any specific wishes or restrictions about organ donation..."
            />
          )}
        </div>

        {/* Funeral Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Funeral Preferences</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={form.funeralPreferences ?? ''}
            onChange={(e) => setStr('funeralPreferences', e.target.value)}
            placeholder="Burial or cremation, religious ceremony, specific wishes for the service..."
          />
        </div>

        {/* Pre-Paid Arrangements */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              id="prePaidArrangements"
              checked={form.prePaidArrangements ?? false}
              onChange={(e) => setBool('prePaidArrangements', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="prePaidArrangements" className="text-sm font-medium text-gray-700">
              I have pre-paid funeral arrangements
            </label>
          </div>
          {form.prePaidArrangements && (
            <textarea
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={form.prePaidDetails ?? ''}
              onChange={(e) => setStr('prePaidDetails', e.target.value)}
              placeholder="Funeral home name, policy number, contact details..."
            />
          )}
        </div>

        {/* Burial Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Burial Location</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.burialLocation ?? ''}
            onChange={(e) => setStr('burialLocation', e.target.value)}
            placeholder="Cemetery, location, or scatter ashes preference..."
          />
        </div>

        {/* Obituary Draft */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Obituary Draft</label>
          <p className="text-xs text-gray-400 mb-2">
            Write something you would want said about you. Your executor can use this as a starting point.
          </p>
          <textarea
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={form.obituaryDraft ?? ''}
            onChange={(e) => setStr('obituaryDraft', e.target.value)}
            placeholder="Write your obituary draft here..."
          />
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() => save.mutate()}
          className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          <Save size={14} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type HealthTab = 'ice' | 'getting-old' | 'when-gone';

const TABS: { key: HealthTab; label: string; icon: React.ReactNode }[] = [
  { key: 'ice', label: 'In Case of Emergency', icon: <AlertTriangle size={14} /> },
  { key: 'getting-old', label: 'Getting Old', icon: <Heart size={14} /> },
  { key: 'when-gone', label: "When I'm Gone", icon: <Heart size={14} /> },
];

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<HealthTab>('ice');

  return (
    <DashboardLayout>
      <div className="greeting-zone">
        <h1 className="greeting-text">Health</h1>
      </div>

      <main className="page active">
        <div className="page-transition" style={{ gap: '10px' }}>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'ice' && <ICETab />}
          {activeTab === 'getting-old' && <GettingOldTab />}
          {activeTab === 'when-gone' && <WhenImGoneTab />}
        </div>
      </main>
    </DashboardLayout>
  );
}
