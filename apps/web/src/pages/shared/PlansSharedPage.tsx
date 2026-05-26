import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import DashboardLayout from '@/components/layout/DashboardLayout';

type Role = 'EXECUTOR' | 'CONTRIBUTOR' | 'BENEFICIARY' | 'VIEWER';

interface PlanShare {
  id: string;
  role: Role;
  accepted: boolean;
  createdAt: string;
  sharedWith?: { email: string; firstName?: string; lastName?: string };
  owner?: { email: string; firstName?: string; lastName?: string };
}

const ROLE_BADGE: Record<Role, string> = {
  EXECUTOR: 'bg-purple-100 text-purple-700',
  CONTRIBUTOR: 'bg-blue-100 text-blue-700',
  BENEFICIARY: 'bg-green-100 text-green-700',
  VIEWER: 'bg-gray-100 text-gray-600',
};

function RoleBadge({ role }: { role: Role }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ROLE_BADGE[role] ?? 'bg-gray-100 text-gray-600'}`}>
      {role}
    </span>
  );
}

function StatusBadge({ accepted }: { accepted: boolean }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${accepted ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
      {accepted ? 'Accepted' : 'Pending'}
    </span>
  );
}

function InviteModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('VIEWER');
  const [error, setError] = useState('');

  const invite = useMutation({
    mutationFn: (data: { email: string; role: string }) =>
      api.post('/plan-shares/invite', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan-shares-sent'] });
      onClose();
    },
    onError: () => setError('Failed to send invite. Please try again.'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email is required.'); return; }
    invite.mutate({ email: email.trim(), role });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Invite Someone</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EXECUTOR">Executor</option>
              <option value="CONTRIBUTOR">Contributor</option>
              <option value="BENEFICIARY">Beneficiary</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={invite.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
            >
              {invite.isPending ? 'Sending…' : 'Send Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SharedWithMeTab() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PlanShare[]>({
    queryKey: ['plan-shares-received'],
    queryFn: () => api.get('/plan-shares/received').then((r) => r.data),
  });

  const accept = useMutation({
    mutationFn: (id: string) => api.patch(`/plan-shares/${id}/accept`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plan-shares-received'] }),
  });

  if (isLoading) return <p className="text-sm text-gray-500 py-4">Loading…</p>;
  if (!data?.length) return <p className="text-sm text-gray-500 py-4">No plans have been shared with you yet.</p>;

  return (
    <div className="space-y-3">
      {data.map((share) => {
        const ownerName = share.owner
          ? [share.owner.firstName, share.owner.lastName].filter(Boolean).join(' ') || share.owner.email
          : '—';
        return (
          <div key={share.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{ownerName}</p>
              {share.owner?.email && (
                <p className="text-xs text-gray-500 truncate">{share.owner.email}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Shared {new Date(share.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <RoleBadge role={share.role} />
              <StatusBadge accepted={share.accepted} />
              {!share.accepted && (
                <button
                  onClick={() => accept.mutate(share.id)}
                  disabled={accept.isPending}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IveSharedTab() {
  const queryClient = useQueryClient();
  const [showInvite, setShowInvite] = useState(false);

  const { data, isLoading } = useQuery<PlanShare[]>({
    queryKey: ['plan-shares-sent'],
    queryFn: () => api.get('/plan-shares/sent').then((r) => r.data),
  });

  const revoke = useMutation({
    mutationFn: (id: string) => api.patch(`/plan-shares/${id}/revoke`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['plan-shares-sent'] }),
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowInvite(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Invite Someone
        </button>
      </div>

      {isLoading && <p className="text-sm text-gray-500 py-4">Loading…</p>}
      {!isLoading && !data?.length && (
        <p className="text-sm text-gray-500 py-4">You have not shared your plan with anyone yet.</p>
      )}

      <div className="space-y-3">
        {data?.map((share) => {
          const recipientName = share.sharedWith
            ? [share.sharedWith.firstName, share.sharedWith.lastName].filter(Boolean).join(' ') || share.sharedWith.email
            : '—';
          return (
            <div key={share.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{recipientName}</p>
                {share.sharedWith?.email && (
                  <p className="text-xs text-gray-500 truncate">{share.sharedWith.email}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Shared {new Date(share.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <RoleBadge role={share.role} />
                <StatusBadge accepted={share.accepted} />
                <button
                  onClick={() => revoke.mutate(share.id)}
                  disabled={revoke.isPending}
                  className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium disabled:opacity-50"
                >
                  Revoke
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}

export default function PlansSharedPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Shared Plans</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 text-sm font-medium -mb-px ${
            activeTab === 'received'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Shared With Me
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 text-sm font-medium -mb-px ${
            activeTab === 'sent'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          I've Shared
        </button>
      </div>

      {activeTab === 'received' ? <SharedWithMeTab /> : <IveSharedTab />}
    </div>
    </DashboardLayout>
  );
}
