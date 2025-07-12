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
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive';
  notes?: string;
  lastContact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export interface UpdateClientData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: 'active' | 'inactive';
  notes?: string;
}

export interface ClientStats {
  totalCalls: number;
  totalAppointments: number;
  avgSatisfaction: number;
  lastContact: string;
}

// API functions
export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get('/clients');
    return response.data;
  },

  getById: async (id: string): Promise<Client> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  create: async (data: CreateClientData): Promise<Client> => {
    const response = await api.post('/clients', data);
    return response.data;
  },

  update: async (id: string, data: UpdateClientData): Promise<Client> => {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },

  getStats: async (id: string): Promise<ClientStats> => {
    const response = await api.get(`/clients/${id}/stats`);
    return response.data;
  },

  search: async (query: string): Promise<Client[]> => {
    const response = await api.get(`/clients/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  updateStatus: async (id: string, status: 'active' | 'inactive'): Promise<Client> => {
    const response = await api.patch(`/clients/${id}/status`, { status });
    return response.data;
  },
}; 