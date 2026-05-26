import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DirectoryCard from '@/components/dashboard/DirectoryCard';
import { useAuthStore } from '@/stores/auth.store';

interface SubItem {
  label: string;
  color?: string;
  route?: string;
}

interface NavSection {
  id: string;
  icon: React.ReactNode;
  label: string;
  route?: string;
  subItems?: SubItem[];
  hasAvatar?: boolean;
}

const directoryCategories: Record<string, { title: string; color: string; learnBg: string; percent: number }> = {
  'Assets & Liabilities':  { title: 'Assets & Liabilities',  color: '#BC8D53', learnBg: 'rgba(229,215,186,0.6)', percent: 52 },
  'Emotional Legacy':      { title: 'Emotional Legacy',      color: '#D75C5C', learnBg: 'rgba(244,194,194,0.6)', percent: 20 },
  'Body & Health':         { title: 'Body & Health',         color: '#3E8B70', learnBg: 'rgba(168,213,194,0.6)', percent: 69 },
  'Goals & Aspirations':   { title: 'Goals & Aspirations',   color: '#826B96', learnBg: 'rgba(201,184,217,0.6)', percent: 15 },
  'Will & Legal Actions':  { title: 'Will & Legal Actions',  color: '#B62818', learnBg: 'rgba(232,169,160,0.6)', percent: 10 },
  'Post-Loss Support':     { title: 'Post-Loss Support',     color: '#657EEA', learnBg: 'rgba(163,145,185,0.6)', percent: 34 },
};

/* Inline SVG icons matching the XD prototype exactly */
const NavIcons = {
  meFamilyNetwork: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 21.502 19.5"><path d="M15.326,19.128a9.885,9.885,0,0,0,6.919-.58,4.131,4.131,0,0,0-2.9-4.09,4.289,4.289,0,0,0-4.828,1.6m.807,3.073v0a6.224,6.224,0,0,0-.806-3.07m.806,3.073v.106a12.986,12.986,0,0,1-13.076,0v-.109a6.406,6.406,0,0,1,4.913-6.178,6.6,6.6,0,0,1,7.357,3.108m-2.27-9.68a3.463,3.463,0,0,1-6.923,0,3.463,3.463,0,0,1,6.923,0Zm8.461,2.25A2.693,2.693,0,1,1,18.019,6,2.659,2.659,0,0,1,20.711,8.625Z" transform="translate(-1.499 -2.25)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
  myPlan: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 17.5 21.5"><path d="M20.5,14.558V11.865A3.533,3.533,0,0,0,16.9,8.4H15.3A1.178,1.178,0,0,1,14.1,7.25V5.712A3.533,3.533,0,0,0,10.5,2.25h-2m0,13.077h8M8.5,18.4h4M10.9,2.25H5.7A1.178,1.178,0,0,0,4.5,3.4V21.1A1.178,1.178,0,0,0,5.7,22.25H19.3A1.178,1.178,0,0,0,20.5,21.1V11.481A9.421,9.421,0,0,0,10.9,2.25Z" transform="translate(-3.75 -1.5)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
  postLoss: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 21.5 19.5"><path d="M23,8.659A5.066,5.066,0,0,0,17.791,3.75,5.224,5.224,0,0,0,13,6.731,5.225,5.225,0,0,0,8.208,3.75,5.066,5.066,0,0,0,3,8.659C3,16.535,13,21.75,13,21.75S23,16.535,23,8.659Z" transform="translate(-2.25 -3)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
  vault: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 17.5 21.5"><path d="M17.3,10.712V6.865A4.71,4.71,0,0,0,12.5,2.25,4.71,4.71,0,0,0,7.7,6.865v3.846M6.9,22.25H18.1a2.355,2.355,0,0,0,2.4-2.308V13.019a2.355,2.355,0,0,0-2.4-2.308H6.9a2.355,2.355,0,0,0-2.4,2.308v6.923A2.355,2.355,0,0,0,6.9,22.25Z" transform="translate(-3.75 -1.5)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
  tasks: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21.5 21.5"><path d="M9.667,13.833l2.5,2.5L16.333,10.5M23,13A10,10,0,1,1,13,3,10,10,0,0,1,23,13Z" transform="translate(-2.25 -2.25)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
  marketplace: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 19.503 21.5"><path d="M15.927,10.712V6.1a3.8,3.8,0,1,0-7.6,0v4.615M19.837,8.667l1.281,12.308a1.148,1.148,0,0,1-1.135,1.275H4.266a1.135,1.135,0,0,1-.849-.381,1.162,1.162,0,0,1-.287-.893L4.412,8.667A1.146,1.146,0,0,1,5.546,7.635H18.7A1.146,1.146,0,0,1,19.837,8.667ZM8.7,10.712a.38.38,0,1,1-.38-.385A.382.382,0,0,1,8.7,10.712Zm7.6,0a.38.38,0,1,1-.38-.385A.382.382,0,0,1,16.307,10.712Z" transform="translate(-2.372 -1.5)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
  sharedPlans: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 21.5 15.5"><path d="M2.25,7.167A1.161,1.161,0,0,1,3.4,6H9.558a1.161,1.161,0,0,1,1.154,1.167v3.889a1.161,1.161,0,0,1-1.154,1.167H3.4A1.16,1.16,0,0,1,2.25,11.056ZM14.558,8.722a1.161,1.161,0,0,1,1.154-1.167H21.1A1.161,1.161,0,0,1,22.25,8.722v8.556A1.161,1.161,0,0,1,21.1,18.444H15.712a1.16,1.16,0,0,1-1.154-1.167ZM3.788,16.5a1.161,1.161,0,0,1,1.154-1.167h5.385A1.161,1.161,0,0,1,11.481,16.5v2.333A1.161,1.161,0,0,1,10.327,20H4.942a1.16,1.16,0,0,1-1.154-1.167Z" transform="translate(-1.5 -5.25)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
  ),
};

const ChevronSvg = () => (
  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 0.5L4 3.5L7 0.5"/></svg>
);

const navSections: NavSection[] = [
  {
    id: 'me',
    icon: NavIcons.meFamilyNetwork,
    label: 'Me, Family & Network',
    subItems: [
      { label: 'My Profile', route: '/profile' },
      { label: 'My Family', route: '/family' },
      { label: 'My Network', route: '/family' },
    ],
  },
  {
    id: 'plan',
    icon: NavIcons.myPlan,
    label: 'My Plan',
    subItems: [
      { label: 'Assets & Liabilities', color: '#BC8D53', route: '/assets' },
      { label: 'Emotional Legacy',     color: '#D75C5C', route: '/legacy' },
      { label: 'Body & Health',        color: '#3E8B70', route: '/health' },
      { label: 'Goals & Aspirations',  color: '#826B96', route: '/goals' },
      { label: 'Will & Legal Actions', color: '#B62818', route: '/will' },
    ],
  },
  {
    id: 'support',
    icon: NavIcons.postLoss,
    label: 'Post-Loss Support',
    route: '/post-loss',
    subItems: [
      { label: 'Personalized Plan',  route: '/post-loss' },
      { label: 'Practical Support',  route: '/post-loss' },
      { label: 'Emotional Support',  route: '/post-loss' },
      { label: 'Obituary',           route: '/post-loss' },
      { label: 'Memorial Page',      route: '/post-loss' },
    ],
  },
  { id: 'vault',       icon: NavIcons.vault,       label: 'Vault',              route: '/vault' },
  { id: 'tasks',       icon: NavIcons.tasks,        label: 'Tasks & Reminders',  route: '/tasks' },
  { id: 'marketplace', icon: NavIcons.marketplace,  label: 'Marketplace' },
  {
    id: 'shared',
    icon: NavIcons.sharedPlans,
    label: 'Plans Shared With Me',
    route: '/shared',
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : user?.email?.split('@')[0] ?? 'Sarah Johnson';
  const [openNavs, setOpenNavs] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const toggleNav = (id: string) => {
    setOpenNavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSectionClick = (section: NavSection) => {
    if (section.subItems) {
      toggleNav(section.id);
    } else if (section.route) {
      navigate(section.route);
    }
  };

  const handleSubItemClick = (item: SubItem) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  const isActiveRoute = (route?: string) =>
    route ? location.pathname === route || location.pathname.startsWith(route + '/') : false;

  const isSectionActive = (section: NavSection) => {
    if (section.route && isActiveRoute(section.route)) return true;
    return section.subItems?.some((item) => isActiveRoute(item.route)) ?? false;
  };

  // If a directory category is active, show DirectoryCard
  if (activeCategory && directoryCategories[activeCategory]) {
    const cat = directoryCategories[activeCategory];
    return (
      <aside className="sidebar-fixed">
        <div id="sidebar-category">
          <DirectoryCard
            title={cat.title}
            percent={cat.percent}
            color={cat.color}
            learnBg={cat.learnBg}
            onBack={() => setActiveCategory(null)}
          />
        </div>
        <div className="menu-section sidebar-surface no-scrollbar">
          {renderNavMenu()}
        </div>
      </aside>
    );
  }

  function renderNavMenu() {
    return navSections.map((section) => {
      const active = isSectionActive(section);
      return (
        <div key={section.id}>
          <button
            className={`nav-item ${openNavs.has(section.id) || active ? 'active' : ''}`}
            onClick={() => handleSectionClick(section)}
          >
            <div className="circle-bg" />
            <div className="active-bar" />
            <div className="nav-icon">{section.icon}</div>
            <span className="nav-label">{section.label}</span>
            {section.subItems && (
              <div className="nav-chevron"><ChevronSvg /></div>
            )}
          </button>

          {section.subItems && (
            <div
              className={`sub-items ${openNavs.has(section.id) ? 'open' : ''}`}
              id={`${section.id}-sub`}
              style={{
                maxHeight: openNavs.has(section.id)
                  ? `${section.subItems.length * 40 + 20}px`
                  : 0,
              }}
            >
              {section.subItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`module-row ${isActiveRoute(item.route) ? 'expanded' : ''}`}
                  style={{ color: item.color || '#000', cursor: 'pointer' }}
                  onClick={() => handleSubItemClick(item)}
                >
                  <div className="dot" style={{ color: item.color || '#000' }} />
                  <span className="mod-label">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <aside className="sidebar-fixed">
      <div id="sidebar-default">
        {/* Photo Zone */}
        <div
          className="sidebar-photo sidebar-surface"
          onClick={() => !hasPhoto && photoInputRef.current?.click()}
          style={{ cursor: hasPhoto ? 'default' : 'pointer' }}
        >
          <input
            type="file"
            ref={photoInputRef}
            id="photoUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                setPhotoSrc(ev.target?.result as string);
                setHasPhoto(true);
              };
              reader.readAsDataURL(file);
            }}
          />
          {hasPhoto && photoSrc ? (
            <>
              <img
                id="sidebarPhotoImg"
                src={photoSrc}
                alt=""
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', zIndex: 5,
                  borderRadius: '30px 30px 0 0',
                }}
              />
              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPhoto(false);
                  setPhotoSrc(null);
                  if (photoInputRef.current) photoInputRef.current.value = '';
                }}
                style={{
                  position: 'absolute', top: 10, right: 10, zIndex: 10,
                  background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%',
                  width: 28, height: 28, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 16, lineHeight: 1,
                }}
                title="Remove photo"
              >
                ×
              </button>
              {/* Change button */}
              <button
                onClick={(e) => { e.stopPropagation(); photoInputRef.current?.click(); }}
                style={{
                  position: 'absolute', bottom: 10, right: 10, zIndex: 10,
                  background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: 8,
                  padding: '4px 10px', cursor: 'pointer',
                  color: '#fff', fontSize: 11,
                }}
              >
                Change
              </button>
            </>
          ) : (
            <>
              <p className="placeholder-text" id="photoPlaceholder">Add or Change Your Poster Image</p>
              <div className="add-circle-bg" id="photoCircleBg" />
              <div className="add-circle" id="photoAddCircle">
                <div className="add-inner">
                  <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="25" y1="5" x2="25" y2="45" />
                    <line x1="5" y1="25" x2="45" y2="25" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Identity Strip */}
        <div className="identity-strip">
          <div className="identity-avatar-mobile">
            {/* Photo removed — showing initials fallback */}
            <span className="identity-initials">{displayName.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
          </div>
          <div className="identity-text-wrap">
            <div className="identity-name">{displayName}</div>
            <div className="identity-role">Plan Owner</div>
          </div>
        </div>
      </div>

      {/* Plan Strip — XD: Individual State, gradient 270°, 24px */}
      <div className="plan-strip plan-individual">
        <div className="plan-strip-bg" />
        <span className="plan-strip-text">Individual Plan</span>
        <button className="plan-strip-btn">Upgrade</button>
      </div>

      {/* Navigation Menu */}
      <div className="menu-section sidebar-surface no-scrollbar">
        {renderNavMenu()}
      </div>
    </aside>
  );
}
