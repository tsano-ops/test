import { api } from './api';

export interface CropData {
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
}

export const photoApi = {
  upload: (file: File, cropData?: CropData) => {
    const form = new FormData();
    form.append('file', file);
    if (cropData) {
      form.append('cropX', String(cropData.cropX));
      form.append('cropY', String(cropData.cropY));
      form.append('cropWidth', String(cropData.cropWidth));
      form.append('cropHeight', String(cropData.cropHeight));
    }
    return api.post('/profile/photo', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  remove: () => api.delete('/profile/photo'),
  get: () => api.get('/profile/photo'),
  updatePrivacy: (privacy: string) => api.put('/profile/photo/privacy', { privacy }),
};
