import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import SimpleAccordion from './SimpleAccordion';

interface PlanShare {
  id: string;
  role?: 'EXECUTOR' | 'CONTRIBUTOR' | 'BENEFICIARY' | 'VIEWER';
  status?: 'ACCEPTED' | 'PENDING';
  sharedWith?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  email?: string;
}

const roleBadgeStyles: Record<string, { background: string; color: string }> = {
  EXECUTOR: { background: 'rgba(101,126,234,0.12)', color: '#657EEA' },
  CONTRIBUTOR: { background: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  BENEFICIARY: { background: 'rgba(97,197,83,0.12)', color: '#61C553' },
  VIEWER: { background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.5)' },
};

const roleLabels: Record<string, string> = {
  EXECUTOR: 'Executor',
  CONTRIBUTOR: 'Contributor',
  BENEFICIARY: 'Beneficiary',
  VIEWER: 'Viewer',
};

function getInitials(share: PlanShare): string {
  const first = share.sharedWith?.firstName || '';
  const last = share.sharedWith?.lastName || '';
  if (first || last) {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  }
  const email = share.sharedWith?.email || share.email || '';
  return email.charAt(0).toUpperCase() || '?';
}

function getDisplayName(share: PlanShare): string {
  const first = share.sharedWith?.firstName || '';
  const last = share.sharedWith?.lastName || '';
  if (first || last) {
    return `${first} ${last}`.trim();
  }
  return share.sharedWith?.email || share.email || 'Unknown';
}

export default function SharedWithCard() {
  const { data, isLoading, isError } = useQuery<PlanShare[]>({
    queryKey: ['profile-shared'],
    queryFn: async () => {
      const res = await api.get('/plan-shares/sent');
      return res.data;
    },
  });

  const shares = data || [];

  return (
    <SimpleAccordion
      title="Shared With"
      subtitle="People who have access to your plan"
    >
      <p className="accordion-desc">
        These are the people you have shared your plan with. Each person has a specific
        role that determines what they can see and do.
      </p>

      <div className="accordion-edit-row">
        <button className="accordion-edit-btn">
          <span>Edit</span>
          <div className="accordion-edit-btn-wrap">
            <svg viewBox="0 0 20 18" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2.5l3 3L5.5 17.5H2.5v-3L14.5 2.5Z"/>
            </svg>
          </div>
        </button>
      </div>

      {isLoading && (
        <div className="entry-row">
          <div className="entry-content">
            <div className="entry-meta">Loading...</div>
          </div>
        </div>
      )}

      {isError && null}

      {!isLoading && !isError && shares.length === 0 && (
        <div className="entry-row">
          <div className="entry-content">
            <div className="entry-meta">Not shared with anyone yet</div>
          </div>
        </div>
      )}

      {!isLoading && shares.map((share) => {
        const role = share.role || 'VIEWER';
        const badge = roleBadgeStyles[role] || roleBadgeStyles.VIEWER;

        return (
          <div className="entry-row" key={share.id}>
            <div
              className="fr-avatar"
              style={{
                width: 36,
                height: 36,
                minWidth: 36,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(0,0,0,0.4)',
              }}
            >
              {getInitials(share)}
            </div>
            <div className="entry-content" style={{ marginLeft: 12 }}>
              <div className="entry-title">{getDisplayName(share)}</div>
              <div className="entry-meta">
                {roleLabels[role]}
                {' • '}
                {share.status === 'ACCEPTED' ? 'Accepted' : 'Pending'}
              </div>
            </div>
            <div
              className="entry-tag"
              style={{ background: badge.background, color: badge.color }}
            >
              {roleLabels[role]}
            </div>
          </div>
        );
      })}

      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Invite Someone</span>
      </div>
    </SimpleAccordion>
  );
}
