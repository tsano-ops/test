import { forwardRef, useRef } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import '@/styles/profile-print.css';

/* ── SVG Icons (inline, no import needed) ────────────────── */
const IconDocument = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconFolder = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconGradCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconDroplet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);
const IconPrint = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Helpers ──────────────────────────────────────────────── */
function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function fileExt(filename: string) {
  return filename.split('.').pop()?.toLowerCase() || '';
}

function fileIconClass(filename: string) {
  const ext = fileExt(filename);
  if (ext === 'pdf') return 'pp-file-icon--pdf';
  if (ext === 'docx' || ext === 'doc') return 'pp-file-icon--docx';
  if (ext === 'xlsx' || ext === 'xls') return 'pp-file-icon--xlsx';
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') return 'pp-file-icon--jpg';
  return 'pp-file-icon--pdf';
}

function fileExtLabel(filename: string) {
  return fileExt(filename).toUpperCase();
}

const now = new Date();
const docDate = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const docTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

/* ── Sub-components ───────────────────────────────────────── */

function PlanAfterLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`pp-sidebar-logo ${className}`}>
      {/* ∞ icon */}
      <svg className="pp-sidebar-logo-icon" viewBox="0 0 24 12" fill="none">
        <path d="M6 6C6 3.79 7.79 2 10 2s4 1.79 4 4-1.79 4-4 4S6 8.21 6 6z" fill="#000"/>
        <path d="M14 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="#000"/>
        <path d="M10 6c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4z" fill="#F8F8F8"/>
      </svg>
      <span className="pp-sidebar-logo-text">PlanAfter</span>
    </div>
  );
}

function ProfileSidebar({
  name,
  role,
  photoUrl,
  plan = 'Individual Plan',
  sectionTitle,
  sectionDesc,
}: {
  name: string;
  role: string;
  photoUrl?: string;
  plan?: string;
  sectionTitle: string;
  sectionDesc: string;
}) {
  return (
    <div className="pp-sidebar">
      <PlanAfterLogo />

      {/* Profile card */}
      <div className="pp-profile-card">
        <div className="pp-profile-photo-wrap">
          {photoUrl ? (
            <img className="pp-profile-photo" src={photoUrl} alt={name} />
          ) : (
            <div className="pp-profile-photo-placeholder">
              {initials(name)}
            </div>
          )}
        </div>
        <div className="pp-profile-name">{name}</div>
        <div className="pp-profile-role">{role}</div>
        <div className="pp-verified-row">
          <span className="pp-verified-text">Verified</span>
          <div className="pp-verified-icon">
            <IconCheck />
          </div>
        </div>
        <div className="pp-plan-badge">{plan}</div>
      </div>

      {/* Section label */}
      <div className="pp-section-label">
        <div className="pp-section-label-title">{sectionTitle}</div>
        <div className="pp-section-label-desc">{sectionDesc}</div>
      </div>
    </div>
  );
}

type DocStatus = 'both' | 'digital' | 'location' | 'none';

function docStatusDot(status: DocStatus) {
  if (status === 'both') return { label: 'Digital File & Location', cls: 'pp-status-dot--green' };
  if (status === 'digital') return { label: 'Digital File', cls: 'pp-status-dot--blue' };
  if (status === 'location') return { label: 'Location', cls: 'pp-status-dot--orange' };
  return { label: '', cls: '' };
}

function docIconClass(status: DocStatus) {
  if (status === 'both') return 'pp-doc-icon--green';
  if (status === 'digital') return 'pp-doc-icon--blue';
  if (status === 'location') return 'pp-doc-icon--orange';
  return 'pp-doc-icon--green';
}

function DocRow({
  title, type, meta, status, icon,
}: {
  title: string; type: string; meta?: string;
  status: DocStatus;
  icon: React.ReactNode;
}) {
  const { label, cls } = docStatusDot(status);
  return (
    <div className="pp-doc-row">
      <div className={`pp-doc-icon ${docIconClass(status)}`}>{icon}</div>
      <div className="pp-doc-info">
        <div className="pp-doc-title">{title}</div>
        <div className="pp-doc-type">{type}</div>
        {meta && <div className="pp-doc-meta">{meta}</div>}
      </div>
      {label && (
        <div className="pp-doc-status">
          <span className="pp-doc-status-label">{label}</span>
          <span className={`pp-status-dot ${cls}`} />
        </div>
      )}
    </div>
  );
}

function PageFooter() {
  return (
    <div className="pp-doc-footer">
      <div className="pp-doc-footer-text">
        This document contains personal data and sensitive information, its use is at your own risk.
      </div>
      <div className="pp-doc-footer-date">
        Document Created: {docDate} | {docTime}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   MAIN PRINT COMPONENT
   ──────────────────────────────────────────────────────────── */

const PrintContent = forwardRef<HTMLDivElement, { name: string; role: string; photoUrl?: string }>(
  ({ name, role, photoUrl }, ref) => {

    const sidebar = (sectionTitle: string, sectionDesc: string) => (
      <ProfileSidebar
        name={name}
        role={role}
        photoUrl={photoUrl}
        sectionTitle={sectionTitle}
        sectionDesc={sectionDesc}
      />
    );

    return (
      <div ref={ref} className="pp-root">

        {/* ══ PAGE 0: COVER ══════════════════════════════════ */}
        <div className="pp-page pp-cover">
          <div className="pp-cover-bg" />
          <div className="pp-cover-triangle" />
          <div className="pp-cover-triangle2" />

          <div className="pp-cover-header">
            <div className="pp-cover-logo">
              <svg className="pp-cover-logo-icon" viewBox="0 0 24 12" fill="none">
                <path d="M6 6C6 3.79 7.79 2 10 2s4 1.79 4 4-1.79 4-4 4S6 8.21 6 6z" fill="#000"/>
                <path d="M14 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="#000"/>
                <path d="M10 6c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4z" fill="#F0F0EE"/>
              </svg>
              <span className="pp-cover-logo-text">PlanAfter</span>
            </div>
          </div>

          <div className="pp-cover-body">
            <div className="pp-cover-left">
              <div className="pp-cover-photo-wrap">
                {photoUrl
                  ? <img className="pp-cover-photo" src={photoUrl} alt={name} />
                  : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#E8E8E8,#C8C8C8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10mm', fontWeight: 700, color: '#888' }}>{initials(name)}</div>
                }
              </div>
              <div className="pp-cover-name">{name}</div>
              <div className="pp-cover-role">{role}</div>
            </div>

            <div className="pp-cover-right">
              <div className="pp-cover-title">My<br />Profile</div>
              <div className="pp-cover-subtitle">Confidential</div>
            </div>
          </div>

          <div className="pp-cover-footer">
            <div>
              <div className="pp-cover-footer-created">• Document Created:</div>
              <div className="pp-cover-footer-date">{docDate} | {docTime}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="pp-cover-footer-divider" />
              <div className="pp-cover-footer-disclaimer">
                This document contains personal data and sensitive information, its use is at your own risk.
              </div>
            </div>
          </div>
        </div>

        {/* ══ PAGE 1: ESSENTIAL INFO ═════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Essential Info',
              'All core identity details and important documents are kept here in one organised space. You no longer need to search through folders or messages — everything essential about you is always one click away.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              {/* Name row */}
              <div className="pp-field">
                <div className="pp-field-value">
                  <div className="pp-name-avatar">
                    {photoUrl ? <img src={photoUrl} alt={name} /> : null}
                  </div>
                  <span>{name}</span>
                  <span className="pp-name-dot" />
                </div>
                <div className="pp-field-label">Full Name</div>
              </div>

              <div className="pp-field">
                <div className="pp-field-value">Female</div>
                <div className="pp-field-label">Gender</div>
              </div>
              <div className="pp-field">
                <div className="pp-field-value">July 22, 1980</div>
                <div className="pp-field-label">Date of Birth</div>
              </div>
              <div className="pp-field">
                <div className="pp-field-value">45</div>
                <div className="pp-field-label">Age</div>
              </div>
              <div className="pp-field">
                <div className="pp-field-value">New York, United States</div>
                <div className="pp-field-label">Place of Birth</div>
              </div>
              <div className="pp-field">
                <div className="pp-field-value">United States, Canada, United Kingdom</div>
                <div className="pp-field-label">Citizenship(s)</div>
              </div>
              <div className="pp-field">
                <div className="pp-field-value">United Kingdom</div>
                <div className="pp-field-label">Country of Residence</div>
              </div>

              {/* Identity Documents */}
              <div className="pp-doc-section-title">Identity &amp; Vital Documents</div>
              <DocRow title="US Passport - Sarah Johnson" type="Passport" meta="Expiry Date: Oct 14, 2028" status="both" icon={<IconDocument />} />
              <DocRow title="My Driver's License" type="Driver's License" meta="Expiry Date: Jan 26, 2030" status="digital" icon={<IconDocument />} />
              <DocRow title="My Birth Certificate" type="Birth Certificate" meta="Updated Dec 30, 2024 by You" status="location" icon={<IconDocument />} />

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 2: CONTACT INFO ════════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Contact Info',
              'These contact details are used by PlanAfter for identity verification, system notifications, and workflow execution. Accurate data is required for security controls, legal template logic, and post-loss activation.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              {/* E-mails */}
              <div className="pp-contact-section">
                <div className="pp-contact-section-header">
                  <IconMail />
                  <span className="pp-contact-section-title">E-mails</span>
                </div>
                <div className="pp-contact-item">
                  <div className="pp-contact-item-primary">sarah.johnson@email.com</div>
                  <div className="pp-contact-item-label">Primary E-mail (Login)</div>
                </div>
                <div className="pp-contact-item">
                  <div className="pp-contact-item-multi">s.johnson_80@email.com<br />sarah.j@email.com</div>
                  <div className="pp-contact-item-label">Additional E-mail(s)</div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="pp-contact-section">
                <div className="pp-contact-section-header">
                  <IconPhone />
                  <span className="pp-contact-section-title">Phone Numbers</span>
                </div>
                <div className="pp-contact-item">
                  <div className="pp-contact-item-primary">+1 555 123 4567</div>
                  <div className="pp-contact-item-label">Primary Phone Number</div>
                </div>
                <div className="pp-contact-item">
                  <div className="pp-contact-item-primary">+1 555 345 6789</div>
                  <div className="pp-contact-item-label">Additional Phone Number(s)</div>
                </div>
              </div>

              {/* Addresses */}
              <div className="pp-contact-section">
                <div className="pp-contact-section-header">
                  <IconMapPin />
                  <span className="pp-contact-section-title">Addresses</span>
                </div>
                <div className="pp-contact-item">
                  <div className="pp-contact-item-primary">
                    2 Lyndewode Road<br />
                    Cambridge<br />
                    CB2 1TN<br />
                    <strong>United Kingdom</strong>
                  </div>
                  <div className="pp-contact-item-label">Primary Address</div>
                </div>
              </div>

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 3: FAMILY & RELATIONSHIPS ═════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Family &\nRelationships',
              'Your family structure and relationships are documented in one clear, structured view. This card helps you understand who is connected to you and how.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-family-stats">
                <div className="pp-family-stat">
                  <div className="pp-family-stat-value">Married</div>
                  <div className="pp-family-stat-label">Marital / Partnership Status</div>
                </div>
                <div className="pp-family-stat">
                  <div className="pp-family-stat-value">4</div>
                  <div className="pp-family-stat-label">Number of Children</div>
                </div>
                <div className="pp-family-stat">
                  <div className="pp-family-stat-value">3</div>
                  <div className="pp-family-stat-label">Minors</div>
                </div>
              </div>

              <div className="pp-family-section-title">Immediate Family</div>

              <div className="pp-family-subsection">Spouse / Partner</div>
              <div className="pp-person-card">
                <div className="pp-person-avatar">JJ</div>
                <div className="pp-person-info">
                  <div className="pp-person-name">John Johnson</div>
                  <div className="pp-person-rel">Sarah's Husband • Since Sep 28, 2005</div>
                  <div className="pp-person-dob">Date of Birth: <strong>July 4, 1978</strong> • Age: <strong>47</strong></div>
                </div>
                <div className="pp-person-badge">Executor, Beneficiary</div>
              </div>

              <div className="pp-family-subsection">Children</div>
              {[
                { initials: 'EJ', name: 'Emma Johnson', rel: "Sarah's Biological Daughter", dob: 'Apr 10, 2005', age: '20', badge: 'Beneficiary' },
                { initials: 'LJ', name: 'Liam Johnson', rel: "Sarah's Biological Son", dob: 'Sep 5, 2008', age: '17', badge: 'Beneficiary' },
                { initials: 'LJ', name: 'Lisa Johnson', rel: "Sarah's Biological Daughter", dob: 'Mar 14, 2010', age: '15', badge: 'Beneficiary' },
                { initials: 'OJ', name: 'Oliver Johnson', rel: "Sarah's Biological Son", dob: 'Jun 2, 2014', age: '11', badge: 'Beneficiary' },
              ].map((p) => (
                <div key={p.name} className="pp-person-card">
                  <div className="pp-person-avatar">{p.initials}</div>
                  <div className="pp-person-info">
                    <div className="pp-person-name">{p.name}</div>
                    <div className="pp-person-rel">{p.rel}</div>
                    <div className="pp-person-dob">Date of Birth: <strong>{p.dob}</strong> • Age: <strong>{p.age}</strong></div>
                  </div>
                  <div className="pp-person-badge">{p.badge}</div>
                </div>
              ))}

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 4: FAMILY EXTENDED + DOCUMENTS ════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Family &\nRelationships',
              'Your family structure and relationships are documented in one clear, structured view.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-family-section-title">Extended Family</div>

              <div className="pp-family-subsection">Former Spouse / Partners</div>
              <div className="pp-person-card">
                <div className="pp-person-avatar">JD</div>
                <div className="pp-person-info">
                  <div className="pp-person-name">Jack Daniel</div>
                  <div className="pp-person-rel">Sarah's Ex-husband</div>
                  <div className="pp-person-dob">Date of Birth: <strong>Sep 19, 1968</strong> • Age: <strong>57</strong></div>
                </div>
              </div>

              <div className="pp-family-subsection">Grandparents</div>
              {[
                { initials: 'JS', name: 'Jane Doe Smith', rel: "Sarah's Biological Grandmother", dob: 'Jan 1, 1920', dod: 'Dec 6, 2000' },
                { initials: 'JS', name: 'John Smith', rel: "Sarah's Biological Grandfather", dob: 'Feb 5, 1918', dod: 'Nov 2, 1998' },
                { initials: 'BW', name: 'Ben White', rel: "Sarah's Biological Grandfather", dob: 'Oct 17, 1927', dod: 'June 8, 2007' },
              ].map((p) => (
                <div key={p.name} className="pp-person-card">
                  <div className="pp-person-avatar">{p.initials}</div>
                  <div className="pp-person-info">
                    <div className="pp-person-name">{p.name}</div>
                    <div className="pp-person-rel">{p.rel}</div>
                    <div className="pp-person-dob">Date of Birth: <strong>{p.dob}</strong> • Date of Death: <strong>{p.dod}</strong></div>
                  </div>
                  <div className="pp-in-memory">In Memory</div>
                </div>
              ))}

              <div className="pp-doc-section-title">Relationship &amp; Status Documents</div>
              <DocRow title="Marriage Certificate - John" type="Marriage Certificate" meta="Updated Dec 30, 2024 by You" status="both" icon={<IconDocument />} />
              <DocRow title="Divorce Papers - Jack" type="Divorce Papers" meta="Updated Dec 30, 2024 by You" status="digital" icon={<IconDocument />} />

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 5: MEDICAL INFO ════════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Medical Info',
              'All your medical reports, diagnoses, treatments and results are kept neatly in one place so you never lose track of important information.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              {/* Emergency Medical Card */}
              <div className="pp-medical-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v4H3zM3 10h18M3 14h18M3 18h18"/>
                  <path d="M12 7v14M8 10h8"/>
                </svg>
                Emergency Medical Card
              </div>

              <div>
                <div className="pp-detail-label" style={{ marginBottom: '4px' }}>Blood Type</div>
                <div className="pp-blood-type">
                  <span className="pp-blood-type-value">AB+</span>
                  <span className="pp-blood-drop"><IconDroplet /></span>
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div className="pp-detail-label" style={{ marginBottom: '4px' }}>Allergies</div>
                <span className="pp-allergy-pill pp-allergy-pill--mild">
                  <span className="pp-allergy-dot" />
                  Milk
                  <span className="pp-allergy-level">Mild</span>
                </span>
                <span className="pp-allergy-pill pp-allergy-pill--severe">
                  <span className="pp-allergy-dot" />
                  Peanuts
                  <span className="pp-allergy-level">Severe</span>
                </span>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div className="pp-detail-label" style={{ marginBottom: '4px' }}>Medical Conditions and Medications</div>
                <span className="pp-condition-pill">Asthma</span>
                <span className="pp-condition-pill">Epilepsy</span>
                <div style={{ marginTop: '4px' }}>
                  <div className="pp-med-sub"><strong>Albuterol</strong> (Once Daily)</div>
                  <div className="pp-med-sub"><strong>Levetiracetam</strong> (As Needed (PRN), 1 Tablet)</div>
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div className="pp-detail-label" style={{ marginBottom: '4px' }}>Medical Devices &amp; Implants</div>
                <span className="pp-condition-pill">Pacemaker/ICD (Heart)</span>
              </div>

              <div className="pp-med-label">Emergency Contacts</div>
              <div className="pp-person-card">
                <div className="pp-person-avatar">JJ</div>
                <div className="pp-person-info">
                  <div className="pp-person-name">John Johnson</div>
                  <div className="pp-person-rel">Sarah's Husband</div>
                  <div className="pp-person-dob">Phone: <strong>+44 7948 0556</strong></div>
                </div>
                <div className="pp-person-badge">Executor, Beneficiary</div>
              </div>

              <div className="pp-doc-section-title">Medical Documents</div>
              <DocRow title="Blood Type Record" type="Blood Type" meta="Entry Date: Feb 3, 2026" status="both" icon={<IconDroplet />} />
              <DocRow title="Milk Allergy Test" type="Allergies • Mild" meta="Entry Date: Feb 3, 2026" status="digital" icon={<IconShield />} />
              <DocRow title="Asthma Action Plan" type="Medical Record" meta="Updated Feb 3, 2026" status="both" icon={<IconDocument />} />
              <DocRow title="EEG Report" type="Medical Record" meta="Updated Feb 3, 2026" status="both" icon={<IconDocument />} />

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 6: EDUCATION ═══════════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Education',
              "Your diplomas, certificates and learning milestones are organised here in one place. This makes it easy to find important documents and contributes to your Life Story."
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-doc-section-title">Educational Qualifications</div>
              <DocRow title="Harvard University" type="Bachelor's • Computer Science" meta="Start Date: 2025" status="both" icon={<IconGradCap />} />

              <div className="pp-doc-section-title">Professional Certifications</div>
              <DocRow title="Graphic Design" type="Paris College of Art" meta="Issue Date: Apr 16, 2000" status="location" icon={<IconGradCap />} />

              <div className="pp-doc-section-title">Other Educations</div>
              <DocRow title="Coding Bootcamp" type="Udemy" meta="Start Date: 2025" status="both" icon={<IconGradCap />} />

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 7: EMPLOYMENT ══════════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Employment &\nAffiliations',
              'Your work roles, employment documents, professional licences, and memberships are gathered in one central place.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-doc-section-title">Employment Entries</div>
              <DocRow title="Founder & CEO" type="Johnson & Johnson" meta="Start Date: Oct 14, 2000 - Current" status="both" icon={<IconBriefcase />} />

              <div className="pp-doc-section-title">Memberships &amp; Affiliations</div>
              <DocRow title="Rotary Club" type="Community" meta="Start Date: Nov 19, 2004 - Current" status="location" icon={<IconBriefcase />} />

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 8: BELIEFS, HOBBIES & INTERESTS ═══════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Beliefs, Hobbies\n& Interests',
              'Your values, interests, and cultural background live here — along with key documents like baptism records, religious confirmations, cultural memberships, and hobby achievements.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-doc-section-title">Beliefs</div>
              <DocRow title="Christian" type="Beliefs • Spiritual / Religious Affiliation" meta="Baptism: May 21, 1998" status="both" icon={<IconHeart />} />

              <div className="pp-doc-section-title">Hobbies</div>
              <DocRow title="Golf" type="Hobbies" meta="Tournament: July, 2023" status="location" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>} />

              <div className="pp-doc-section-title">Interests</div>
              <DocRow title="Tuscan Cuisine" type="Interests • Cooking" meta="Significant Find: 2022" status="both" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>} />

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 9: DOCUMENT DETAIL — US Passport ══════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('All documents\nlinked to this\nrecord',
              'PlanAfter stores document entry information and digital copies securely in your Vault and guides you to keep originals well-ordered outside the platform.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              {/* Document header */}
              <div className="pp-doc-section-title">Identity &amp; Vital Documents</div>
              <DocRow title="US Passport - Sarah Johnson" type="Passport" meta="Expiry Date: Oct 14, 2028" status="both" icon={<IconDocument />} />

              {/* Location in platform */}
              <div className="pp-detail-section" style={{ marginTop: '8px' }}>
                <div className="pp-location-platform">
                  <IconFolder />
                  <div>
                    <div className="pp-detail-label">Location in Platform</div>
                    <ul className="pp-location-breadcrumb">
                      <li>Me, Family &amp; Network</li>
                      <li>My Profile</li>
                      <li>Essential Info</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Physical location */}
              <div className="pp-detail-section">
                <div className="pp-detail-value">Home Safe</div>
                <div className="pp-detail-label">Location of the Original Document or File</div>
              </div>

              <div className="pp-text-box">In the primary travel folder.</div>
              <div className="pp-text-box-label">Location Details</div>

              {/* Uploaded file */}
              <div className="pp-uploaded-file">
                <div className={`pp-file-icon pp-file-icon--pdf`}>PDF</div>
                <div>
                  <div className="pp-file-name">US Passport - Sarah Johnson.pdf</div>
                  <div className="pp-file-date">Uploaded 2 days ago</div>
                </div>
              </div>

              <div className="pp-text-box">Renewal required 6 months before expiry for most international travel.</div>
              <div className="pp-text-box-label">Notes &amp; Instructions</div>

              <div className="pp-doc-divider" />

              {/* Next document: Birth Certificate */}
              <DocRow title="My Birth Certificate" type="Birth Certificate" meta="Updated Dec 30, 2024 by You" status="location" icon={<IconDocument />} />

              <div className="pp-detail-section" style={{ marginTop: '8px' }}>
                <div className="pp-detail-value">Lawyer's Office</div>
                <div className="pp-detail-label">Location of the Original Document or File</div>
              </div>

              <div className="pp-text-box">Stored with the Will and other estate documents.</div>
              <div className="pp-text-box-label">Location Details</div>

              <div className="pp-text-box">Original copy issued in New York.</div>
              <div className="pp-text-box-label">Notes &amp; Instructions</div>

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 10: DOCUMENT DETAIL — Family Docs ══════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('All documents\nlinked to this\nrecord',
              'PlanAfter stores document entry information and digital copies securely in your Vault.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-doc-section-title">Relationship &amp; Status Documents</div>
              <DocRow title="Marriage Certificate - John" type="Marriage Certificate" meta="Updated Dec 30, 2024 by You" status="both" icon={<IconDocument />} />

              <div className="pp-detail-section" style={{ marginTop: '8px' }}>
                <div className="pp-location-platform">
                  <IconFolder />
                  <div>
                    <div className="pp-detail-label">Location in Platform</div>
                    <ul className="pp-location-breadcrumb">
                      <li>Me, Family &amp; Network</li>
                      <li>My Profile</li>
                      <li>Family &amp; Relationships</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pp-detail-section">
                <div className="pp-detail-value">Home Safe</div>
                <div className="pp-detail-label">Location of the Original Document or File</div>
              </div>

              <div className="pp-text-box">In the fireproof safe, red folder.</div>
              <div className="pp-text-box-label">Location Details</div>

              <div className="pp-uploaded-file">
                <div className="pp-file-icon pp-file-icon--pdf">PDF</div>
                <div>
                  <div className="pp-file-name">Marriage Certificate - John.pdf</div>
                  <div className="pp-file-date">Uploaded Dec 30, 2024</div>
                </div>
              </div>

              <div className="pp-text-box">Original certificate with official seal. John holds a copy too.</div>
              <div className="pp-text-box-label">Notes &amp; Instructions</div>

              <div className="pp-doc-divider" />

              <DocRow title="Divorce Papers - Jack" type="Divorce Papers" meta="Updated Dec 30, 2024 by You" status="digital" icon={<IconDocument />} />

              <div className="pp-detail-section" style={{ marginTop: '8px' }}>
                <div className="pp-detail-value">Not Specified</div>
                <div className="pp-detail-label">Location of the Original Document or File</div>
              </div>

              <div className="pp-text-box pp-text-box-empty">No location details</div>
              <div className="pp-text-box-label">Location Details</div>

              <div className="pp-uploaded-file">
                <div className="pp-file-icon pp-file-icon--docx">DOC</div>
                <div>
                  <div className="pp-file-name">Divorce Papers - Jack.docx</div>
                  <div className="pp-file-date">Uploaded Dec 30, 2024</div>
                </div>
              </div>

              <div className="pp-text-box">Final divorce decree from 2002. Jack holds the physical original. This digital copy is for my records.</div>
              <div className="pp-text-box-label">Notes &amp; Instructions</div>

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 11: DOCUMENT DETAIL — Medical ══════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('All documents\nlinked to this\nrecord',
              'PlanAfter stores document entry information and digital copies securely in your Vault.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-doc-section-title">Blood Type</div>
              <DocRow title="AB+" type="Blood Type" meta="Entry Date: Feb 3, 2026" status="both" icon={<IconDroplet />} />

              <div className="pp-detail-section" style={{ marginTop: '8px' }}>
                <div className="pp-location-platform">
                  <IconFolder />
                  <div>
                    <div className="pp-detail-label">Location in Platform</div>
                    <ul className="pp-location-breadcrumb">
                      <li>Me, Family &amp; Network</li>
                      <li>My Profile</li>
                      <li>Medical Info</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pp-detail-section">
                <div className="pp-detail-value">Home Safe</div>
                <div className="pp-detail-label">Location of the Original Document or File</div>
              </div>

              <div className="pp-text-box">Red Folder</div>
              <div className="pp-text-box-label">Location Details</div>

              <div className="pp-uploaded-file">
                <div className="pp-file-icon pp-file-icon--pdf">PDF</div>
                <div>
                  <div className="pp-file-name">Lab Blood Test.pdf</div>
                  <div className="pp-file-date">Uploaded 2 days ago</div>
                </div>
              </div>

              <div className="pp-people-title">People &amp; Contacts</div>
              <div className="pp-people-card">
                <div className="pp-people-avatar">
                  GH
                  <div className="pp-people-avatar-dot" />
                </div>
                <div>
                  <div className="pp-people-name">Gregory House</div>
                  <div className="pp-people-role-net">My Network • Doctor</div>
                </div>
              </div>

              <div className="pp-text-box">Lab Report for January checkup</div>
              <div className="pp-text-box-label">Notes &amp; Instructions</div>

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 12: ATTACHED FILES ═════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Attached\nFiles',
              'All digital copies and supporting files uploaded to your profile records. These are stored securely in your PlanAfter Vault.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              <div className="pp-files-list">
                {[
                  { name: 'US Passport - Sarah Johnson.pdf', date: '2 days ago' },
                  { name: 'My Driver\'s License.pdf', date: '2 days ago' },
                  { name: 'Marriage Certificate - John.pdf', date: 'Dec 30, 2024' },
                  { name: 'Divorce Papers - Jack.docx', date: 'Dec 30, 2024' },
                  { name: 'Lab Blood Test.pdf', date: '2 days ago' },
                  { name: 'Allergy Test.xlsx', date: 'Feb 3, 2026' },
                  { name: 'Asthma Action Plan.pdf', date: 'Feb 3, 2026' },
                  { name: 'EEG (electroencephalogram).pdf', date: 'Feb 3, 2026' },
                  { name: 'College Letter.docx', date: '2 days ago' },
                  { name: 'University Card.pdf', date: '2 days ago' },
                  { name: 'Coding Bootcamp.jpg', date: 'Apr 12, 2025' },
                  { name: 'Founding Protocol.pdf', date: '2 days ago' },
                  { name: 'Baptism Certificate.pdf', date: '2 days ago' },
                ].map((f) => (
                  <div key={f.name} className="pp-file-row">
                    <div className={`pp-file-icon ${fileIconClass(f.name)}`}>{fileExtLabel(f.name)}</div>
                    <div>
                      <div className="pp-file-name">{f.name}</div>
                      <div className="pp-file-date">Uploaded {f.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <PageFooter />
            </div>
          </div>
        </div>

        {/* ══ PAGE 13: LINKED PEOPLE ══════════════════════════ */}
        <div className="pp-page">
          <div className="pp-layout">
            {sidebar('Linked\nPeople',
              'This section shows exactly who can view or use information from your record. It gives you full control over your privacy and ensures the right people are informed and prepared when needed.'
            )}
            <div className="pp-content">
              <div className="pp-page-title">My Profile</div>

              {[
                {
                  initials: 'JJ', name: 'John Johnson', role: 'Executor', status: 'Access Active', expires: 'Expires in 7 days',
                  accessLevel: 'Release Task Access', task: 'Give my daughter access to WeddingVows.pdf two weeks before her wedding.',
                  scope: 'Full Record Access', granted: 'Immediately', expDate: 'February 26, 2026',
                  invStatus: 'Accepted', notes: 'Just check all records of bank account are correct.',
                  badge: 'Release Task Access',
                },
                {
                  initials: 'EW', name: 'Dr. Emily White', role: 'Executor', status: 'Access Active', expires: 'Expires in 7 days',
                  accessLevel: 'Release Task Access', task: 'Ensure all financial documents are accessible to John.',
                  scope: 'Full Record Access', granted: 'Immediately', expDate: 'February 26, 2026',
                  invStatus: 'Accepted', notes: '',
                  badge: 'Release Task Access',
                },
              ].map((p) => (
                <div key={p.name} className="pp-access-card">
                  <div className="pp-access-person">
                    <div className="pp-people-avatar">
                      {p.initials}
                      <div className="pp-people-avatar-dot" />
                    </div>
                    <div className="pp-access-person-info">
                      <div className="pp-access-person-name">{p.name}</div>
                      <div className="pp-access-person-role">{p.role}</div>
                      <div className="pp-access-person-status">{p.status} • {p.expires}</div>
                    </div>
                    <div className="pp-access-badge">{p.badge}</div>
                  </div>
                  <div className="pp-access-field">
                    <div className="pp-access-field-label">Access Level</div>
                    <div className="pp-access-field-value">{p.accessLevel}</div>
                  </div>
                  <div className="pp-text-box">{p.task}</div>
                  <div className="pp-text-box-label" style={{ marginBottom: '8px' }}>Specific Task</div>
                  <div className="pp-access-field">
                    <div className="pp-access-field-label">Data Access Scope</div>
                    <div className="pp-access-field-value">{p.scope}</div>
                  </div>
                  <div className="pp-access-field">
                    <div className="pp-access-field-label">Access Granted</div>
                    <div className="pp-access-field-value">{p.granted}</div>
                  </div>
                  <div className="pp-access-field">
                    <div className="pp-access-field-label">Access Expiration Date</div>
                    <div className="pp-access-field-value">{p.expDate}</div>
                  </div>
                  <div className="pp-access-field">
                    <div className="pp-access-field-label">Invitation Status</div>
                    <div className="pp-access-status-accepted">{p.invStatus}</div>
                  </div>
                  {p.notes && (
                    <>
                      <div className="pp-text-box">{p.notes}</div>
                      <div className="pp-text-box-label">Notes &amp; Instructions</div>
                    </>
                  )}
                </div>
              ))}

              <PageFooter />
            </div>
          </div>
        </div>

      </div>
    );
  }
);

PrintContent.displayName = 'PrintContent';

/* ── Public export: preview overlay ──────────────────────── */
export default function ProfilePrint({ onClose }: { onClose: () => void }) {
  const { user } = useAuthStore();
  const profile = user?.profile;

  const name = profile
    ? `${profile.firstName} ${profile.lastName}`
    : 'Sarah Johnson';
  const role = 'Plan Owner';
  const photoUrl = profile?.photoUrl || '/images/profile.png';

  const printRef = useRef<HTMLDivElement>(null);
  function handlePrint() {
    window.print();
  }

  return (
    <div className="pp-preview-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pp-preview-container">
        {/* Toolbar */}
        <div className="pp-preview-toolbar">
          <span className="pp-preview-toolbar-title">My Profile — Print Preview</span>
          <div className="pp-preview-actions">
            <button className="pp-btn-print" onClick={() => handlePrint()}>
              <IconPrint />
              Print / Download PDF
            </button>
            <button className="pp-btn-close" onClick={onClose}>
              <IconClose /> Close
            </button>
          </div>
        </div>

        {/* The printable content — also visible in preview */}
        <div style={{ display: 'block' }}>
          <PrintContent ref={printRef} name={name} role={role} photoUrl={photoUrl} />
        </div>
      </div>
    </div>
  );
}

