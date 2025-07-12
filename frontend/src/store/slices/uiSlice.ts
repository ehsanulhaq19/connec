import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface Modal {
  id: string;
  isOpen: boolean;
  data?: any;
}

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  modals: Modal[];
  loading: boolean;
  globalError: string | null;
}

// Initial state
const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  modals: [],
  loading: false,
  globalError: null,
};

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Sidebar actions
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    // Notification actions
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Modal actions
    openModal: (state, action: PayloadAction<{ id: string; data?: any }>) => {
      const existingModal = state.modals.find(modal => modal.id === action.payload.id);
      if (existingModal) {
        existingModal.isOpen = true;
        existingModal.data = action.payload.data;
      } else {
        state.modals.push({
          id: action.payload.id,
          isOpen: true,
          data: action.payload.data,
        });
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const modal = state.modals.find(modal => modal.id === action.payload);
      if (modal) {
        modal.isOpen = false;
        modal.data = undefined;
      }
    },
    clearModals: (state) => {
      state.modals = [];
    },

    // Loading actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Error actions
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },
    clearGlobalError: (state) => {
      state.globalError = null;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSidebarOpen,
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  clearModals,
  setLoading,
  setGlobalError,
  clearGlobalError,
} = uiSlice.actions;

export default uiSlice.reducer; 