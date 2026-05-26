import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KeyPerson {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ROLE_COLORS: Record<string, string> = {
  EXECUTOR: '#FF9500',
  CONTRIBUTOR: '#657EEA',
  BENEFICIARY: '#34C759',
};

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function KeyPeopleCard() {
  const { data } = useQuery<{ keyPeople: KeyPerson[] }>({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => api.get('/dashboard/summary').then((r) => r.data),
  });

  const people = data?.keyPeople ?? [];

  return (
    <div className="dashboard-card" style={{ width: 600, height: 393, padding: '30px 30px 0 30px' }}>
      <div className="card-gradient" style={{ height: 192 }} />
      <div className="card-content">
        <h3 className="card-title">Key People in My Plan</h3>
        <div>
          {people.length === 0 ? (
            <div style={{ fontSize: 12, color: '#999', padding: '12px 0' }}>
              No key people added yet. Share your plan to get started.
            </div>
          ) : (
            people.map((person, i) => (
              <div key={person.id} className="person-pad">
                {i > 0 && <div className="divider" />}
                <div className="hover-bar" />
                <div className="hover-circle" />
                <div
                  className="person-avatar"
                  style={{
                    background: ROLE_COLORS[person.role] ?? '#657EEA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                  }}
                >
                  {initials(person.name)}
                </div>
                <div className="person-name">{person.name}</div>
                <div className="person-meta">
                  <span className="person-role">{person.role.charAt(0) + person.role.slice(1).toLowerCase()}</span>
                  <span className="person-updated">{person.email}</span>
                </div>
                <div className="dots-menu">
                  <MoreHorizontal size={16} />
                </div>
              </div>
            ))
          )}
          <Link to="/shared" style={{ textDecoration: 'none' }}>
            <div className="add-contact-pad">
              <div className="divider" />
              <div className="plus-circle-icon">
                <Plus size={22} strokeWidth={1.5} />
              </div>
              <span className="add-label">Add Key Contact</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
