import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 - try refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

// ─── Auth API ──────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; password: string; signupSource?: string }) =>
    api.post('/auth/register', data),

  verifyEmail: (data: { email: string; code: string }) =>
    api.post('/auth/verify-email', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  resendVerification: (email: string) =>
    api.post('/auth/resend-verification', { email }),

  requestPasswordReset: (email: string) =>
    api.post('/auth/request-password-reset', { email }),

  resetPassword: (email: string, code: string, newPassword: string) =>
    api.post('/auth/reset-password', { email, code, newPassword }),

  logout: () => api.post('/auth/logout'),

  getMe: () => api.get('/auth/me'),

  registerInvited: (data: { email: string; password: string; firstName: string; lastName: string; invitationToken: string }) =>
    api.post('/auth/register-invited', data),
};

// ─── Users / Profile API ───────────────────────────────────
export const usersApi = {
  upsertProfile: (data: {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    countryOfResidence?: string;
    stateRegion?: string;
  }) => api.post('/users/me/profile', data),

  getProfile: () => api.get('/users/me/profile'),
};

// ─── Profile API ───────────────────────────────────────────
export const profileApi = {
  get: () => api.get('/profile'),
  updateEssential: (data: Record<string, unknown>) => api.patch('/profile', data),

  getContacts: () => api.get('/profile/contacts'),
  createContact: (data: Record<string, unknown>) => api.post('/profile/contacts', data),
  updateContact: (id: string, data: Record<string, unknown>) => api.patch(`/profile/contacts/${id}`, data),
  deleteContact: (id: string) => api.delete(`/profile/contacts/${id}`),

  getMedical: () => api.get('/profile/medical'),
  createMedical: (data: Record<string, unknown>) => api.post('/profile/medical', data),
  updateMedical: (id: string, data: Record<string, unknown>) => api.patch(`/profile/medical/${id}`, data),
  deleteMedical: (id: string) => api.delete(`/profile/medical/${id}`),

  getAllergies: () => api.get('/profile/allergies'),
  createAllergy: (data: Record<string, unknown>) => api.post('/profile/allergies', data),
  updateAllergy: (id: string, data: Record<string, unknown>) => api.patch(`/profile/allergies/${id}`, data),
  deleteAllergy: (id: string) => api.delete(`/profile/allergies/${id}`),

  getBeliefs: () => api.get('/profile/beliefs'),
  createBelief: (data: Record<string, unknown>) => api.post('/profile/beliefs', data),
  updateBelief: (id: string, data: Record<string, unknown>) => api.patch(`/profile/beliefs/${id}`, data),
  deleteBelief: (id: string) => api.delete(`/profile/beliefs/${id}`),
};

// ─── Education API ─────────────────────────────────────────
export const educationApi = {
  getAll: () => api.get('/education'),
  create: (data: Record<string, unknown>) => api.post('/education', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/education/${id}`, data),
  remove: (id: string) => api.delete(`/education/${id}`),
};

// ─── Employment API ────────────────────────────────────────
export const employmentApi = {
  getAll: () => api.get('/employment'),
  create: (data: Record<string, unknown>) => api.post('/employment', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/employment/${id}`, data),
  remove: (id: string) => api.delete(`/employment/${id}`),
};

// ─── Dashboard API ─────────────────────────────────────────
export const dashboardApi = {
  getSummary: () => api.get('/dashboard/summary'),
};

// ─── Assets API ────────────────────────────────────────────
export const assetsApi = {
  getAll: () => api.get('/assets'),
  getNetWorth: () => api.get('/assets/net-worth'),
  getByCategory: (category: string) => api.get(`/assets/category/${category}`),
  create: (data: Record<string, unknown>) => api.post('/assets', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/assets/${id}`, data),
  remove: (id: string) => api.delete(`/assets/${id}`),
};

// ─── Liabilities API ───────────────────────────────────────
export const liabilitiesApi = {
  getAll: () => api.get('/liabilities'),
  create: (data: Record<string, unknown>) => api.post('/liabilities', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/liabilities/${id}`, data),
  remove: (id: string) => api.delete(`/liabilities/${id}`),
};

// ─── Family API ────────────────────────────────────────────
export const familyApi = {
  getAll: () => api.get('/family'),
  getOne: (id: string) => api.get(`/family/${id}`),
  create: (data: Record<string, unknown>) => api.post('/family', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/family/${id}`, data),
  remove: (id: string) => api.delete(`/family/${id}`),
};

// ─── Relationships API ─────────────────────────────────────
export const relationshipsApi = {
  getTree: () => api.get('/relationships/tree'),
  create: (data: Record<string, unknown>) => api.post('/relationships', data),
  remove: (id: string) => api.delete(`/relationships/${id}`),
};

// ─── Health API ────────────────────────────────────────────
export const healthApi = {
  getEmergency: () => api.get('/health/emergency'),
  updateEmergency: (data: Record<string, unknown>) => api.patch('/health/emergency', data),
  getGettingOld: () => api.get('/health/getting-old'),
  updateGettingOld: (data: Record<string, unknown>) => api.patch('/health/getting-old', data),
  getEndOfLife: () => api.get('/health/end-of-life'),
  updateEndOfLife: (data: Record<string, unknown>) => api.patch('/health/end-of-life', data),
};

// ─── Letters API ───────────────────────────────────────────
export const lettersApi = {
  getAll: () => api.get('/letters'),
  getOne: (id: string) => api.get(`/letters/${id}`),
  create: (data: Record<string, unknown>) => api.post('/letters', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/letters/${id}`, data),
  remove: (id: string) => api.delete(`/letters/${id}`),
};

// ─── Goals API ─────────────────────────────────────────────
export const goalsApi = {
  getAll: (type?: string) => api.get('/goals', { params: type ? { type } : {} }),
  create: (data: Record<string, unknown>) => api.post('/goals', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/goals/${id}`, data),
  remove: (id: string) => api.delete(`/goals/${id}`),
};

// ─── Legal API ─────────────────────────────────────────────
export const legalApi = {
  getAll: () => api.get('/legal/documents'),
  create: (data: Record<string, unknown>) => api.post('/legal/documents', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/legal/documents/${id}`, data),
  remove: (id: string) => api.delete(`/legal/documents/${id}`),
};

// ─── Vault API ─────────────────────────────────────────────
export const vaultApi = {
  getDocuments: (params?: { category?: string; search?: string }) =>
    api.get('/vault', { params }),
  getCredentials: () => api.get('/vault/credentials'),
};

// ─── Tasks API ─────────────────────────────────────────────
export const tasksApi = {
  getAll: (params?: { status?: string; priority?: string; category?: string }) =>
    api.get('/tasks', { params }),
  create: (data: Record<string, unknown>) => api.post('/tasks', data),
  update: (id: string, data: Record<string, unknown>) => api.patch(`/tasks/${id}`, data),
  remove: (id: string) => api.delete(`/tasks/${id}`),
  generateSmart: () => api.post('/tasks/generate-smart'),
};

// ─── Sharing API ───────────────────────────────────────────
export const sharingApi = {
  getReceived: () => api.get('/plan-shares/received'),
  getSent: () => api.get('/plan-shares/sent'),
  invite: (data: { email: string; role: string }) => api.post('/plan-shares/invite', data),
  accept: (id: string) => api.patch(`/plan-shares/${id}/accept`),
  revoke: (id: string) => api.patch(`/plan-shares/${id}/revoke`),
};

// ─── Post-Loss API ─────────────────────────────────────────
export const postLossApi = {
  getChecklist: () => api.get('/post-loss/checklist'),
  completeStep: (stepId: string) => api.post(`/post-loss/checklist/${stepId}/complete`),
  getResources: () => api.get('/post-loss/resources'),
};

// ─── Memorial API ─────────────────────────────────────────
export const memorialApi = {
  get: () => api.get('/memorial'),
  update: (data: Record<string, unknown>) => api.patch('/memorial', data),
};

// ─── Invitations API ──────────────────────────────────────
export const invitationsApi = {
  create: (data: { email: string; role: string; message?: string }) => api.post('/invitations', data),
  getByToken: (token: string) => api.get(`/invitations/token/${token}`),
  accept: (token: string) => api.post(`/invitations/${token}/accept`),
  getSent: () => api.get('/invitations/sent'),
  revoke: (id: string) => api.patch(`/invitations/${id}/revoke`),
  resend: (id: string) => api.post(`/invitations/${id}/resend`),
};

// ─── Settings API ──────────────────────────────────────────
export const settingsApi = {
  getAccount: () => api.get('/settings/account'),
  updateAccount: (data: Record<string, unknown>) => api.patch('/settings/account', data),
  updatePassword: (data: Record<string, unknown>) => api.patch('/settings/password', data),
  getNotifications: () => api.get('/settings/notifications'),
  updateNotifications: (data: Record<string, unknown>) => api.patch('/settings/notifications', data),
  getPreferences: () => api.get('/settings/preferences'),
  updatePreferences: (data: Record<string, unknown>) => api.patch('/settings/preferences', data),
  getAuditLog: () => api.get('/settings/audit-log'),
};
