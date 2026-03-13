import api from './axiosInstance';
export const getLogs   = (vehicleId) => api.get(`/logs?vehicle=${vehicleId}`).then(r => r.data);
export const addLog    = (data)      => api.post('/logs', data).then(r => r.data);
export const deleteLog = (id)        => api.delete(`/logs/${id}`).then(r => r.data);