import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import DashboardLayout from '@/components/layout/DashboardLayout';

// ─── Types ─────────────────────────────────────────────────

interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
}

interface NotificationsData {
  emailNotifications: boolean;
  taskReminders: boolean;
  planUpdates: boolean;
}

interface PreferencesData {
  language: string;
  timezone: string;
}

interface AuditEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
  createdAt: string;
}

// ─── Section: Account ──────────────────────────────────────

function AccountSection() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const { data, isLoading } = useQuery<AccountData>({
    queryKey: ['settings-account'],
    queryFn: () => api.get('/settings/account').then((r) => r.data),
  });

  useEffect(() => {
    if (data) setForm({ firstName: data.firstName ?? '', lastName: data.lastName ?? '', email: data.email ?? '' });
  }, [data]);

  const update = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.patch('/settings/account', d),
    onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); },
    onError: () => setError('Failed to save. Please try again.'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    update.mutate({ firstName: form.firstName, lastName: form.lastName });
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          value={form.email}
          readOnly
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3">
        {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
        <button
          type="submit"
          disabled={update.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
        >
          {update.isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

// ─── Section: Security ─────────────────────────────────────

function SecuritySection() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const update = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.patch('/settings/password', d),
    onSuccess: () => {
      setSuccess(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: () => setError('Failed to change password. Check your current password and try again.'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    update.mutate({ currentPassword: form.currentPassword, newPassword: form.newPassword });
  }

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600 font-medium">Password changed.</p>}
          <button
            type="submit"
            disabled={update.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {update.isPending ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500">Coming soon.</p>
      </div>
    </div>
  );
}

// ─── Section: Notifications ────────────────────────────────

function NotificationsSection() {
  const [prefs, setPrefs] = useState<NotificationsData>({
    emailNotifications: false,
    taskReminders: false,
    planUpdates: false,
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const { isLoading } = useQuery<NotificationsData>({
    queryKey: ['settings-notifications'],
    queryFn: () => api.get('/settings/notifications').then((r) => r.data),
    select: (data) => { setPrefs(data); return data; },
  });

  const update = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.patch('/settings/notifications', d),
    onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); },
    onError: () => setError('Failed to save preferences.'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    update.mutate(prefs as unknown as Record<string, unknown>);
  }

  const toggles: { key: keyof NotificationsData; label: string }[] = [
    { key: 'emailNotifications', label: 'Email notifications' },
    { key: 'taskReminders', label: 'Task reminders' },
    { key: 'planUpdates', label: 'Plan updates' },
  ];

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {toggles.map((toggle) => (
        <label key={toggle.key} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={prefs[toggle.key]}
            onChange={(e) => setPrefs((p) => ({ ...p, [toggle.key]: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{toggle.label}</span>
        </label>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3 pt-2">
        {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
        <button
          type="submit"
          disabled={update.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
        >
          {update.isPending ? 'Saving…' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
}

// ─── Section: Preferences ──────────────────────────────────

function PreferencesSection() {
  const [form, setForm] = useState<PreferencesData>({ language: 'en', timezone: '' });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const { isLoading } = useQuery<PreferencesData>({
    queryKey: ['settings-preferences'],
    queryFn: () => api.get('/settings/preferences').then((r) => r.data),
    select: (data) => { setForm(data); return data; },
  });

  const update = useMutation({
    mutationFn: (d: Record<string, unknown>) => api.patch('/settings/preferences', d),
    onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); },
    onError: () => setError('Failed to save preferences.'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    update.mutate(form as unknown as Record<string, unknown>);
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <select
          value={form.language}
          onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="bg">Bulgarian</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
        <input
          value={form.timezone}
          onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
          placeholder="e.g. Europe/Sofia"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3">
        {saved && <span className="text-sm text-green-600 font-medium">Saved.</span>}
        <button
          type="submit"
          disabled={update.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
        >
          {update.isPending ? 'Saving…' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
}

// ─── Section: Audit Log ────────────────────────────────────

function AuditLogSection() {
  const { data, isLoading } = useQuery<AuditEntry[]>({
    queryKey: ['settings-audit-log'],
    queryFn: () => api.get('/settings/audit-log').then((r) => r.data),
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (!data?.length) return <p className="text-sm text-gray-500">No audit log entries yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 font-medium text-gray-600 whitespace-nowrap">Action</th>
            <th className="text-left py-2 pr-4 font-medium text-gray-600 whitespace-nowrap">Entity Type</th>
            <th className="text-left py-2 pr-4 font-medium text-gray-600 whitespace-nowrap">Entity ID</th>
            <th className="text-left py-2 pr-4 font-medium text-gray-600 whitespace-nowrap">IP Address</th>
            <th className="text-left py-2 font-medium text-gray-600 whitespace-nowrap">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2 pr-4 text-gray-900">{entry.action}</td>
              <td className="py-2 pr-4 text-gray-600">{entry.entityType}</td>
              <td className="py-2 pr-4 text-gray-500 font-mono text-xs">{entry.entityId}</td>
              <td className="py-2 pr-4 text-gray-500 font-mono text-xs">{entry.ipAddress}</td>
              <td className="py-2 text-gray-500 text-xs whitespace-nowrap">
                {new Date(entry.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────

type Section = 'account' | 'security' | 'notifications' | 'preferences' | 'audit-log';

const NAV_ITEMS: { key: Section; label: string }[] = [
  { key: 'account', label: 'Account' },
  { key: 'security', label: 'Security' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'audit-log', label: 'Audit Log' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>('account');

  const SECTION_TITLES: Record<Section, string> = {
    account: 'Account',
    security: 'Security',
    notifications: 'Notifications',
    preferences: 'Preferences',
    'audit-log': 'Audit Log',
  };

  return (
    <DashboardLayout>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <div className="flex gap-8">
        {/* Left nav */}
        <nav className="w-48 flex-shrink-0">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.key
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              {SECTION_TITLES[activeSection]}
            </h2>
            {activeSection === 'account' && <AccountSection />}
            {activeSection === 'security' && <SecuritySection />}
            {activeSection === 'notifications' && <NotificationsSection />}
            {activeSection === 'preferences' && <PreferencesSection />}
            {activeSection === 'audit-log' && <AuditLogSection />}
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
