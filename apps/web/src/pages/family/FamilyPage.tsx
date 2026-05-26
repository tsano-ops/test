import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

type RelationshipType =
  | 'SPOUSE'
  | 'PARTNER'
  | 'CHILD'
  | 'PARENT'
  | 'SIBLING'
  | 'GRANDPARENT'
  | 'GRANDCHILD'
  | 'AUNT_UNCLE'
  | 'NIECE_NEPHEW'
  | 'COUSIN'
  | 'IN_LAW'
  | 'STEP_RELATION'
  | 'FRIEND'
  | 'COLLEAGUE'
  | 'OTHER';

type Gender = 'MALE' | 'FEMALE' | 'NON_BINARY' | 'PREFER_NOT_TO_SAY';
type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | 'SEPARATED' | 'DOMESTIC_PARTNERSHIP';

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  nationality?: string;
  isDeceased?: boolean;
  relationship?: RelationshipType;
}

interface FamilyFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  isDeceased: boolean;
  relationship: RelationshipType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RELATIONSHIP_TYPES: { value: RelationshipType; label: string }[] = [
  { value: 'SPOUSE', label: 'Spouse' },
  { value: 'PARTNER', label: 'Partner' },
  { value: 'CHILD', label: 'Child' },
  { value: 'PARENT', label: 'Parent' },
  { value: 'SIBLING', label: 'Sibling' },
  { value: 'GRANDPARENT', label: 'Grandparent' },
  { value: 'GRANDCHILD', label: 'Grandchild' },
  { value: 'AUNT_UNCLE', label: 'Aunt / Uncle' },
  { value: 'NIECE_NEPHEW', label: 'Niece / Nephew' },
  { value: 'COUSIN', label: 'Cousin' },
  { value: 'IN_LAW', label: 'In-Law' },
  { value: 'STEP_RELATION', label: 'Step Relation' },
  { value: 'FRIEND', label: 'Friend' },
  { value: 'COLLEAGUE', label: 'Colleague' },
  { value: 'OTHER', label: 'Other' },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'NON_BINARY', label: 'Non-binary' },
  { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

const MARITAL_STATUS_OPTIONS: { value: MaritalStatus; label: string }[] = [
  { value: 'SINGLE', label: 'Single' },
  { value: 'MARRIED', label: 'Married' },
  { value: 'DIVORCED', label: 'Divorced' },
  { value: 'WIDOWED', label: 'Widowed' },
  { value: 'SEPARATED', label: 'Separated' },
  { value: 'DOMESTIC_PARTNERSHIP', label: 'Domestic Partnership' },
];

// Groups for display
const RELATIONSHIP_GROUPS: { label: string; types: RelationshipType[] }[] = [
  { label: 'Spouse / Partner', types: ['SPOUSE', 'PARTNER'] },
  { label: 'Children', types: ['CHILD', 'GRANDCHILD'] },
  { label: 'Parents', types: ['PARENT', 'GRANDPARENT'] },
  { label: 'Siblings', types: ['SIBLING'] },
  { label: 'Extended Family', types: ['AUNT_UNCLE', 'NIECE_NEPHEW', 'COUSIN', 'IN_LAW', 'STEP_RELATION'] },
  { label: 'Other', types: ['FRIEND', 'COLLEAGUE', 'OTHER'] },
];

const RELATIONSHIP_BADGE_COLOR: Record<string, string> = {
  'Spouse / Partner': 'bg-pink-100 text-pink-800',
  'Children': 'bg-purple-100 text-purple-800',
  'Parents': 'bg-blue-100 text-blue-800',
  'Siblings': 'bg-green-100 text-green-800',
  'Extended Family': 'bg-orange-100 text-orange-800',
  'Other': 'bg-gray-100 text-gray-700',
};

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const getRelationshipLabel = (type?: RelationshipType) =>
  RELATIONSHIP_TYPES.find((r) => r.value === type)?.label ?? 'Unknown';


// ─── Family Modal ─────────────────────────────────────────────────────────────

function FamilyMemberModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: FamilyMember;
  onClose: () => void;
  onSave: (data: FamilyFormData) => void;
}) {
  const [form, setForm] = useState<FamilyFormData>({
    firstName: initial?.firstName ?? '',
    lastName: initial?.lastName ?? '',
    dateOfBirth: initial?.dateOfBirth ? initial.dateOfBirth.split('T')[0] : '',
    gender: initial?.gender ?? '',
    maritalStatus: initial?.maritalStatus ?? '',
    nationality: initial?.nationality ?? '',
    isDeceased: initial?.isDeceased ?? false,
    relationship: initial?.relationship ?? 'OTHER',
  });

  const set = <K extends keyof FamilyFormData>(field: K, value: FamilyFormData[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {initial ? 'Edit Family Member' : 'Add Family Member'}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to You</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.relationship}
              onChange={(e) => set('relationship', e.target.value as RelationshipType)}
            >
              {RELATIONSHIP_TYPES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.dateOfBirth}
              onChange={(e) => set('dateOfBirth', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.gender}
                onChange={(e) => set('gender', e.target.value)}
              >
                <option value="">Not specified</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.maritalStatus}
                onChange={(e) => set('maritalStatus', e.target.value)}
              >
                <option value="">Not specified</option>
                {MARITAL_STATUS_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.nationality}
              onChange={(e) => set('nationality', e.target.value)}
              placeholder="e.g. Bulgarian"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isDeceased"
              checked={form.isDeceased}
              onChange={(e) => set('isDeceased', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isDeceased" className="text-sm text-gray-700">
              Mark as deceased
            </label>
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
            disabled={!form.firstName.trim() || !form.lastName.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {initial ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm ────────────────────────────────────────────────────────────

function DeleteConfirm({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Remove family member</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to remove{' '}
          <span className="font-medium text-gray-800">{name}</span> from your family? This cannot be undone.
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
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Member Card ───────────────────────────────────────────────────────────────

function MemberCard({
  member,
  groupLabel,
  onEdit,
  onDelete,
}: {
  member: FamilyMember;
  groupLabel: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const initials = getInitials(member.firstName, member.lastName);
  const badgeClass = RELATIONSHIP_BADGE_COLOR[groupLabel] ?? 'bg-gray-100 text-gray-700';
  const age = member.dateOfBirth
    ? Math.floor((Date.now() - new Date(member.dateOfBirth).getTime()) / 31557600000)
    : null;

  return (
    <div className="flex items-center gap-4 py-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <span className="text-sm font-semibold text-gray-600">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-900">
            {member.firstName} {member.lastName}
          </span>
          {member.isDeceased && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
              Deceased
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
            {getRelationshipLabel(member.relationship)}
          </span>
          {age !== null && (
            <span className="text-xs text-gray-400">{age} yrs</span>
          )}
          {member.nationality && (
            <span className="text-xs text-gray-400">{member.nationality}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FamilyPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'members' | 'network'>('members');
  const [modal, setModal] = useState<{ open: boolean; member?: FamilyMember }>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<FamilyMember | null>(null);

  // Query
  const { data: members = [], isLoading } = useQuery<FamilyMember[]>({
    queryKey: ['family'],
    queryFn: () => api.get('/family').then((r) => r.data),
  });

  // Mutations
  const createMember = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { relationship, ...memberData } = payload;
      const res = await api.post('/family', memberData);
      const newId = res.data?.id;
      if (newId && relationship) {
        await api.post('/relationships', {
          relatedMemberId: newId,
          type: relationship,
        });
      }
      return res;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['family'] }),
  });

  const updateMember = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      api.patch(`/family/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['family'] }),
  });

  const deleteMember = useMutation({
    mutationFn: (id: string) => api.delete(`/family/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['family'] }),
  });

  const handleSave = (form: FamilyFormData) => {
    const payload: Record<string, unknown> = {
      firstName: form.firstName,
      lastName: form.lastName,
      relationship: form.relationship,
      isDeceased: form.isDeceased,
    };
    if (form.dateOfBirth) payload.dateOfBirth = form.dateOfBirth;
    if (form.gender) payload.gender = form.gender;
    if (form.maritalStatus) payload.maritalStatus = form.maritalStatus;
    if (form.nationality) payload.nationality = form.nationality;

    if (modal.member) {
      const { relationship: _rel, ...rest } = payload;
      updateMember.mutate({ id: modal.member.id, data: rest });
    } else {
      createMember.mutate(payload);
    }
    setModal({ open: false });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMember.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  // Group members
  const groupedMembers = RELATIONSHIP_GROUPS.map((group) => ({
    ...group,
    members: members.filter((m) => m.relationship && group.types.includes(m.relationship)),
  })).filter((g) => g.members.length > 0);

  const ungrouped = members.filter(
    (m) => !m.relationship || !RELATIONSHIP_GROUPS.some((g) => g.types.includes(m.relationship!))
  );

  return (
    <DashboardLayout>
      <div className="greeting-zone">
        <h1 className="greeting-text">Family</h1>
      </div>

      <main className="page active">
        <div className="page-transition" style={{ gap: '10px' }}>

          {/* Tabs + Add button */}
          <div className="flex items-center justify-between">
            <div className="flex border-b border-gray-200 gap-0">
              {[
                { key: 'members', label: 'Family Members' },
                { key: 'network', label: 'My Network' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'members' | 'network')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === 'members' && (
              <button
                onClick={() => setModal({ open: true })}
                className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <Plus size={15} />
                Add Family Member
              </button>
            )}
          </div>

          {/* Family Members Tab */}
          {activeTab === 'members' && (
            <>
              {isLoading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <p className="text-center text-gray-400 py-12 text-sm">Loading...</p>
                </div>
              ) : members.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-center py-12">
                    <Users size={32} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-400">No family members added yet.</p>
                    <button
                      onClick={() => setModal({ open: true })}
                      className="mt-4 inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      <Plus size={15} />
                      Add your first family member
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupedMembers.map((group) => (
                    <div
                      key={group.label}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-gray-800">{group.label}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {group.members.length}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {group.members.map((m) => (
                          <MemberCard
                            key={m.id}
                            member={m}
                            groupLabel={group.label}
                            onEdit={() => setModal({ open: true, member: m })}
                            onDelete={() => setDeleteTarget(m)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {ungrouped.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">Other</h3>
                      <div className="divide-y divide-gray-50">
                        {ungrouped.map((m) => (
                          <MemberCard
                            key={m.id}
                            member={m}
                            groupLabel="Other"
                            onEdit={() => setModal({ open: true, member: m })}
                            onDelete={() => setDeleteTarget(m)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Network Tab */}
          {activeTab === 'network' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-center text-gray-400 py-12 text-sm">
                Coming soon — Network contacts
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {modal.open && (
        <FamilyMemberModal
          initial={modal.member}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          name={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </DashboardLayout>
  );
}
