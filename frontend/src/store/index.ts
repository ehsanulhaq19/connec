import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import assistantsReducer from './slices/assistantsSlice';
import clientsReducer from './slices/clientsSlice';
import schedulesReducer from './slices/schedulesSlice';
import callsReducer from './slices/callsSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assistants: assistantsReducer,
    clients: clientsReducer,
    schedules: schedulesReducer,
    calls: callsReducer,
    appointments: appointmentsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 