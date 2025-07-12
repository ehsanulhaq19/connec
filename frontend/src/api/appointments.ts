import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAppointments = async () => {
  const res = await axios.get(`${API_URL}/schedules/upcoming`, { withCredentials: true });
  return res.data;
}; 