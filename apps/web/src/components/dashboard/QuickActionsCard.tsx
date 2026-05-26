const actions = [
  { iconSrc: '/icons/document.svg', label: 'Upload' },
  { iconSrc: '/icons/user-plus.svg', label: 'Invite' },
  { iconSrc: '/icons/mail.svg', label: 'Write' },
  { iconSrc: '/icons/edit.svg', label: 'Schedule' },
];

export default function QuickActionsCard() {
  return (
    <div className="dashboard-card" style={{ width: 600, height: 199, padding: '30px 30px 0 30px' }}>
      <div className="card-gradient" style={{ height: 120 }} />
      <div className="card-content">
        <h3 className="card-title">Quick Actions</h3>
        <div className="actions-grid">
          {actions.map((action, i) => (
            <div key={i} className="action-btn">
              <div className="action-icon">
                <img src={action.iconSrc} alt={action.label} width={24} height={24} />
              </div>
              <span className="action-label">{action.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
