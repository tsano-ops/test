import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi, educationApi, employmentApi } from '@/lib/api';

// ─── Full profile (with all relations) ───────────────────
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await profileApi.get();
      return data;
    },
  });
}

// ─── Essential Info ───────────────────────────────────────
export function useUpdateEssential() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.updateEssential(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

// ─── Contacts ─────────────────────────────────────────────
export function useCreateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.createContact(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useUpdateContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      profileApi.updateContact(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => profileApi.deleteContact(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

// ─── Medical Records ──────────────────────────────────────
export function useCreateMedical() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.createMedical(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useUpdateMedical() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      profileApi.updateMedical(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useDeleteMedical() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => profileApi.deleteMedical(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

// ─── Allergies ────────────────────────────────────────────
export function useCreateAllergy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.createAllergy(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useUpdateAllergy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      profileApi.updateAllergy(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useDeleteAllergy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => profileApi.deleteAllergy(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

// ─── Beliefs ──────────────────────────────────────────────
export function useCreateBelief() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => profileApi.createBelief(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useUpdateBelief() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      profileApi.updateBelief(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

export function useDeleteBelief() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => profileApi.deleteBelief(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile'] }),
  });
}

// ─── Education ────────────────────────────────────────────
export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data } = await educationApi.getAll();
      return data;
    },
  });
}

export function useCreateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => educationApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['education'] }),
  });
}

export function useUpdateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      educationApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['education'] }),
  });
}

export function useDeleteEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => educationApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['education'] }),
  });
}

// ─── Employment ───────────────────────────────────────────
export function useEmployment() {
  return useQuery({
    queryKey: ['employment'],
    queryFn: async () => {
      const { data } = await employmentApi.getAll();
      return data;
    },
  });
}

export function useCreateEmployment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => employmentApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employment'] }),
  });
}

export function useUpdateEmployment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      employmentApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employment'] }),
  });
}

export function useDeleteEmployment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employmentApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employment'] }),
  });
}
