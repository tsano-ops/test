import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  category?: string;
  status: string;
  priority: string;
  createdAt: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

function ActivityIcon({ status }: { status: string }) {
  if (status === 'COMPLETED') return <CheckCircle size={20} strokeWidth={1.5} />;
  if (status === 'IN_PROGRESS') return <Clock size={20} strokeWidth={1.5} />;
  return <AlertCircle size={20} strokeWidth={1.5} />;
}

export default function RecentActivityCard() {
  const { data } = useQuery<Activity[]>({
    queryKey: ['tasks', 'recent-activity'],
    queryFn: () =>
      api
        .get('/tasks', { params: {} })
        .then((r) =>
          [...r.data]
            .sort((a: Activity, b: Activity) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 3)
        ),
  });

  const activities = data ?? [];

  return (
    <div className="dashboard-card" style={{ width: 290, height: 332, padding: '30px 30px 0 30px' }}>
      <div className="card-gradient" style={{ height: 166 }} />
      <div className="card-content">
        <h3 className="card-title">Recent Activity</h3>
        {activities.length === 0 ? (
          <div style={{ fontSize: 12, color: '#999', padding: '12px 0' }}>No recent activity</div>
        ) : (
          activities.map((act, i) => (
            <div key={act.id} className="activity-pad">
              {i > 0 && <div className="divider" />}
              <div className="hover-bar" />
              <div className="hover-circle" />
              <div className="act-icon-wrap">
                <div className="act-icon">
                  <ActivityIcon status={act.status} />
                </div>
              </div>
              <div className="act-text">
                <div className="act-title">{act.title}</div>
                <div className="act-time">{timeAgo(act.createdAt)}</div>
              </div>
            </div>
          ))
        )}
        <div className="task-footer">
          <div className="footer-bg" />
          <div className="handle" />
          <div className="footer-label">View All Activity</div>
        </div>
      </div>
    </div>
  );
}
