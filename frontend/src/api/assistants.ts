import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Types
export interface Assistant {
  id: string;
  name: string;
  description: string;
  voiceType: string;
  personality: string;
  expertise: string[];
  status: 'active' | 'inactive' | 'training';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssistantData {
  name: string;
  description: string;
  voiceType: string;
  personality: string;
  expertise: string[];
  avatar?: string;
}

export interface UpdateAssistantData {
  name?: string;
  description?: string;
  voiceType?: string;
  personality?: string;
  expertise?: string[];
  status?: 'active' | 'inactive' | 'training';
  avatar?: string;
}

export interface AssistantStats {
  totalCalls: number;
  totalDuration: number;
  avgSatisfaction: number;
  completionRate: number;
}

// API functions
export const assistantsApi = {
  getAll: async (): Promise<Assistant[]> => {
    const response = await api.get('/assistants');
    return response.data;
  },

  getById: async (id: string): Promise<Assistant> => {
    const response = await api.get(`/assistants/${id}`);
    return response.data;
  },

  create: async (data: CreateAssistantData): Promise<Assistant> => {
    const response = await api.post('/assistants', data);
    return response.data;
  },

  update: async (id: string, data: UpdateAssistantData): Promise<Assistant> => {
    const response = await api.put(`/assistants/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/assistants/${id}`);
  },

  getStats: async (id: string): Promise<AssistantStats> => {
    const response = await api.get(`/assistants/${id}/stats`);
    return response.data;
  },

  train: async (id: string): Promise<void> => {
    await api.post(`/assistants/${id}/train`);
  },

  test: async (id: string, message: string): Promise<{ response: string }> => {
    const response = await api.post(`/assistants/${id}/test`, { message });
    return response.data;
  },
}; 