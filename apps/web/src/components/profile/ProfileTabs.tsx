import { useRef, useLayoutEffect } from 'react';

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'documents', label: 'Documents' },
  { id: 'album', label: 'Album' },
  { id: 'life-story', label: 'Life Story' },
];

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const pillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const activeEl = tabRefs.current.get(activeTab);
    const pill = pillRef.current;
    if (activeEl && pill) {
      pill.style.left = `${activeEl.offsetLeft}px`;
      pill.style.width = `${activeEl.offsetWidth}px`;
    }
  }, [activeTab]);

  return (
    <div className="profile-tabs">
      <div className="profile-tabs-pill" ref={pillRef} />
      {tabs.map((tab) => (
        <div
          key={tab.id}
          ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
          className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
