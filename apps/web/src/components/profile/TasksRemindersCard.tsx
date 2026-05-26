import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import SimpleAccordion from './SimpleAccordion';

interface Task {
  id: string;
  title: string;
  category?: string;
  priority?: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate?: string;
}

const priorityColors: Record<string, string> = {
  URGENT: '#FF0000',
  HIGH: '#FF9500',
  MEDIUM: '#657EEA',
  LOW: '#999999',
};

const statusColors: Record<string, string> = {
  PENDING: '#999999',
  IN_PROGRESS: '#657EEA',
  COMPLETED: '#61C553',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function TasksRemindersCard() {
  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ['profile-tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data;
    },
  });

  const activeTasks = (data || []).filter(
    (t) => t.status === 'PENDING' || t.status === 'IN_PROGRESS'
  );

  return (
    <SimpleAccordion
      title="Tasks & Reminders"
      subtitle="Upcoming actions and deadlines"
    >
      <p className="accordion-desc">
        Track what still needs to be done. Tasks help you stay on top of your plan
        and ensure nothing important is missed.
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

      {!isLoading && !isError && activeTasks.length === 0 && (
        <div className="entry-row">
          <div className="entry-content">
            <div className="entry-meta">No tasks yet</div>
          </div>
        </div>
      )}

      {!isLoading && activeTasks.map((task) => (
        <div className="entry-row" key={task.id}>
          <div
            className="entry-dot"
            style={{ background: priorityColors[task.priority || 'LOW'] }}
          />
          <div className="entry-content">
            <div className="entry-title">{task.title}</div>
            <div className="entry-meta">
              {task.category && <span>{task.category}</span>}
              {task.category && task.dueDate && <span> • </span>}
              {task.dueDate && <span>Due {formatDate(task.dueDate)}</span>}
            </div>
          </div>
          {task.priority && (
            <div
              className="entry-tag"
              style={{
                background: `${priorityColors[task.priority]}1A`,
                color: priorityColors[task.priority],
              }}
            >
              {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
            </div>
          )}
          {task.status && (
            <div
              className="entry-tag"
              style={{
                background: `${statusColors[task.status]}1A`,
                color: statusColors[task.status],
                marginLeft: 6,
              }}
            >
              {statusLabels[task.status]}
            </div>
          )}
        </div>
      ))}

      <div className="add-entry-btn" style={{ marginTop: 20 }}>
        <div className="add-entry-circle">
          <div className="add-entry-circle-inner">
            <div className="plus-icon" />
          </div>
        </div>
        <span style={{ font: '400 14px/17px Inter, sans-serif', color: 'rgba(0,0,0,0.5)' }}>Add Task</span>
      </div>
    </SimpleAccordion>
  );
}
