import { usePermissionsStore } from '@/stores/permissions.store';

const ROLE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  EXECUTOR: { bg: 'rgba(101,126,234,0.08)', text: '#657EEA', label: 'Executor View' },
  CONTRIBUTOR: { bg: 'rgba(59,130,246,0.08)', text: '#3B82F6', label: 'Contributor View' },
  BENEFICIARY: { bg: 'rgba(97,197,83,0.08)', text: '#61C553', label: 'Beneficiary View' },
  VIEWER: { bg: 'rgba(107,114,128,0.08)', text: '#6B7280', label: 'Viewer' },
};

export default function RoleBanner() {
  const { currentRole, isPlanOwner } = usePermissionsStore();

  if (isPlanOwner()) return null;

  const style = ROLE_STYLES[currentRole] || ROLE_STYLES.VIEWER;

  return (
    <div style={{
      background: style.bg,
      borderBottom: `1px solid ${style.text}20`,
      padding: '8px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: style.text,
      }} />
      <span style={{
        font: '600 12px/15px Inter, sans-serif',
        color: style.text,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {style.label}
      </span>
      <span style={{
        font: '400 12px/15px Inter, sans-serif',
        color: 'rgba(0,0,0,0.4)',
        marginLeft: 4,
      }}>
        — You are viewing a shared plan with limited access
      </span>
    </div>
  );
}
