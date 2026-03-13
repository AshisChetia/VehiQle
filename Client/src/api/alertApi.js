import api from './axiosInstance';
export const getAlerts     = ()   => api.get('/alerts').then(r => r.data);
export const completeAlert = (id) => api.patch(`/alerts/${id}/complete`).then(r => r.data);
export const snoozeAlert   = (id) => api.patch(`/alerts/${id}/snooze`).then(r => r.data);