import api from './axiosInstance';
export const sendMessage = (data) => api.post('/chat', data).then(r => r.data);