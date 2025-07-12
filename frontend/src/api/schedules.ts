import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getSchedules = async () => {
  const res = await axios.get(`${API_URL}/schedules`, { withCredentials: true });
  return res.data;
};

export const createSchedule = async (data: any) => {
  const res = await axios.post(`${API_URL}/schedules`, data, { withCredentials: true });
  return res.data;
};

export const updateSchedule = async (id: string, data: any) => {
  const res = await axios.patch(`${API_URL}/schedules/${id}`, data, { withCredentials: true });
  return res.data;
};

export const deleteSchedule = async (id: string) => {
  const res = await axios.delete(`${API_URL}/schedules/${id}`, { withCredentials: true });
  return res.data;
}; 