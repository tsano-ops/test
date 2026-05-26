import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  category?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: string;
}

const PRIORITY_COLOR: Record<string, string> = {
  URGENT: '#FF2D55',
  HIGH: '#FF9500',
  MEDIUM: '#657EEA',
  LOW: '#34C759',
};

const PRIORITY_LABEL: Record<string, string> = {
  URGENT: 'URG',
  HIGH: 'HIGH',
  MEDIUM: 'MED',
  LOW: 'LOW',
};

export default function TodaysTasksCard() {
  const { data } = useQuery<Task[]>({
    queryKey: ['tasks', 'dashboard'],
    queryFn: () =>
      api
        .get('/tasks', { params: { status: 'PENDING' } })
        .then((r) => r.data.slice(0, 3)),
  });

  const tasks = data ?? [];

  return (
    <div className="dashboard-card" style={{ width: 290, height: 332, padding: '30px 30px 0 30px' }}>
      <div className="card-gradient" style={{ height: 166 }} />
      <div className="card-content">
        <h3 className="card-title">Today's Tasks</h3>
        {tasks.length === 0 ? (
          <div style={{ fontSize: 12, color: '#999', padding: '12px 0' }}>No pending tasks</div>
        ) : (
          tasks.map((task, i) => {
            const color = PRIORITY_COLOR[task.priority] ?? '#657EEA';
            const label = PRIORITY_LABEL[task.priority] ?? task.priority;
            return (
              <div key={task.id} className="task-pad">
                {i > 0 && <div className="divider" />}
                <div className="priority-bar" style={{ background: color }} />
                <div className="priority-text">{label}</div>
                <div className="task-dot" style={{ background: color }} />
                <div className="task-label">{task.title}</div>
                <div className="task-category">{task.category ?? '—'}</div>
              </div>
            );
          })
        )}
        <Link to="/tasks" style={{ textDecoration: 'none' }}>
          <div className="task-footer">
            <div className="footer-bg" />
            <div className="handle" />
            <div className="footer-label">View All Tasks</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
