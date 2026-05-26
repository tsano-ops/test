import { useState } from 'react';

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  dob: string;
  avatar?: string;
  badge?: string;
  section: 'immediate' | 'extended';
}

const familyMembers: FamilyMember[] = [
  { id: '1', name: 'James Johnson', role: 'Spouse', dob: 'Jan 20, 1982', section: 'immediate', badge: 'Executor' },
  { id: '2', name: 'Emma Johnson', role: 'Daughter', dob: 'Jun 5, 2010', section: 'immediate', badge: 'Beneficiary' },
  { id: '3', name: 'Liam Johnson', role: 'Son', dob: 'Sep 12, 2013', section: 'immediate', badge: 'Beneficiary' },
  { id: '4', name: 'Helen Smith', role: 'Mother', dob: 'Apr 3, 1958', section: 'extended' },
  { id: '5', name: 'Robert Smith', role: 'Father', dob: 'Jul 22, 1955', section: 'extended' },
];

const initials = (name: string) => name.split(' ').map((n) => n[0]).join('').slice(0, 2);

export default function FamilyRecordsCard() {
  const [open, setOpen] = useState(false);
  const [immediateOpen, setImmediateOpen] = useState(true);
  const [extendedOpen, setExtendedOpen] = useState(false);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const immediate = familyMembers.filter((m) => m.section === 'immediate');
  const extended = familyMembers.filter((m) => m.section === 'extended');

  return (
    <div className={`accordion-section ${open ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <div>
          <div className="accordion-title">Family &amp; Relationships</div>
          <div className="accordion-subtitle">The family structure that shapes your legal plan</div>
        </div>
        <div className="accordion-header-right">
          <svg className="accordion-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="accordion-body">
        <div className="accordion-inner">
          {/* Description */}
          <p className="accordion-desc">
            Your family members and relationships form the core of your legal plan. Accurate details ensure
            your legal documents reflect the right people and their roles in your estate.
          </p>

          {/* Edit button */}
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

          {/* Status row */}
          <div className="fr-status-row">
            <div className="fr-status-item">
              <span className="fr-status-value">Married</span>
              <span className="fr-status-label">Marital Status</span>
            </div>
            <div className="fr-status-item">
              <span className="fr-status-value">3</span>
              <span className="fr-status-label">Children</span>
            </div>
            <div className="fr-status-item">
              <span className="fr-status-value">2</span>
              <span className="fr-status-label">Minors</span>
            </div>
          </div>

          {/* Sections */}
          <div className="fr-sections-outer">
            {/* Immediate Family */}
            <div
              className={`fr-section-header ${immediateOpen ? 'open' : ''}`}
              onClick={() => setImmediateOpen(!immediateOpen)}
            >
              <div className="fr-section-header-left">
                <div className="fr-section-bullet" />
                <span className="fr-section-title">Immediate Family</span>
              </div>
              <div className="fr-section-toggle">{immediateOpen ? '−' : '+'}</div>
            </div>
            {immediateOpen && (
              <div className="fr-section-body">
                {immediate.map((member) => (
                  <div key={member.id}>
                    <div
                      className={`fr-member-card ${expandedMember === member.id ? 'expanded' : ''}`}
                      onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                    >
                      <div className="fr-card-top">
                        <div className="fr-avatar-wrap">
                          <div
                            className="fr-avatar"
                            style={{ background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.4)' }}
                          >
                            {initials(member.name)}
                          </div>
                          <div className="fr-life-dot" />
                        </div>
                        <div className="fr-card-info">
                          <div className="fr-card-name">{member.name}</div>
                          <div className="fr-card-role">{member.role}</div>
                          <div className="fr-card-dob">{member.dob}</div>
                        </div>
                        <div className="fr-card-right">
                          {member.badge && <span className="fr-role-badge">{member.badge}</span>}
                          <div className="fr-menu-btn">
                            <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                              <circle cx="2" cy="2" r="1.5" fill="#000"/>
                              <circle cx="8" cy="2" r="1.5" fill="#000"/>
                              <circle cx="14" cy="2" r="1.5" fill="#000"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {expandedMember === member.id && (
                        <div className="fr-expand-panel">
                          <div className="fr-expand-fields">
                            <div className="fr-field-row">
                              <span className="fr-field-label">Relationship</span>
                              <span className="fr-field-value">{member.role}</span>
                            </div>
                            <div className="fr-field-row">
                              <span className="fr-field-label">Date of Birth</span>
                              <span className="fr-field-value">{member.dob}</span>
                            </div>
                            {member.badge && (
                              <div className="fr-field-row">
                                <span className="fr-field-label">Role in Plan</span>
                                <span className="fr-field-value">{member.badge}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="fr-add-member-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#000" strokeWidth="1.2"/>
                    <path d="M10 6v8M6 10h8" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Add Family Member
                </div>
              </div>
            )}

            {/* Extended Family */}
            <div
              className={`fr-section-header ${extendedOpen ? 'open' : ''}`}
              onClick={() => setExtendedOpen(!extendedOpen)}
            >
              <div className="fr-section-header-left">
                <div className="fr-section-bullet" />
                <span className="fr-section-title">Extended Family</span>
              </div>
              <div className="fr-section-toggle">{extendedOpen ? '−' : '+'}</div>
            </div>
            {extendedOpen && (
              <div className="fr-section-body">
                {extended.map((member) => (
                  <div key={member.id} className="fr-member-card">
                    <div className="fr-card-top">
                      <div className="fr-avatar-wrap">
                        <div
                          className="fr-avatar"
                          style={{ background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.4)' }}
                        >
                          {initials(member.name)}
                        </div>
                        <div className="fr-life-dot" />
                      </div>
                      <div className="fr-card-info">
                        <div className="fr-card-name">{member.name}</div>
                        <div className="fr-card-role">{member.role}</div>
                        <div className="fr-card-dob">{member.dob}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="fr-add-member-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="#000" strokeWidth="1.2"/>
                    <path d="M10 6v8M6 10h8" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Add Extended Family Member
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
