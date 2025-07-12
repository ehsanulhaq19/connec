import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCompletedCalls = async () => {
  const res = await axios.get(`${API_URL}/calls/completed`, { withCredentials: true });
  return res.data;
};

export const getCallById = async (id: string) => {
  const res = await axios.get(`${API_URL}/calls/${id}`, { withCredentials: true });
  return res.data;
}; 