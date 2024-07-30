import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default {
    getResumes() {
        return apiClient.get('/resume');
    },
    getResume(id: number) {
        return apiClient.get(`/resume/${id}`);
    },
    postResume(data: any) {
        return apiClient.post('/resume', data);
    },
    deleteResume(id: number) {
        return apiClient.delete(`/resume/${id}`);
    },
    updateResume(id: number, data: any) {
        return apiClient.put(`/resume/${id}`, data);
    }
};