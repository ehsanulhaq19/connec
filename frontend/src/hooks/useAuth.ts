import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { login, register, logout, getCurrentUser } from '../store/slices/authSlice';
import type { LoginData, RegisterData } from '../api/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const loginUser = async (data: LoginData) => {
    return await dispatch(login(data));
  };

  const registerUser = async (data: RegisterData) => {
    return await dispatch(register(data));
  };

  const logoutUser = async () => {
    return await dispatch(logout());
  };

  const fetchCurrentUser = async () => {
    return await dispatch(getCurrentUser());
  };

  return {
    user,
    loading,
    error,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    getCurrentUser: fetchCurrentUser,
    isAuthenticated: !!user,
  };
}; 