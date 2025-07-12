import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
interface Appointment {
  id: string;
  clientId: string;
  assistantId: string;
  scheduledTime: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  type: 'consultation' | 'follow-up' | 'emergency' | 'regular';
  notes?: string;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateAppointmentData {
  clientId: string;
  assistantId: string;
  scheduledTime: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'regular';
  notes?: string;
}

interface UpdateAppointmentData {
  scheduledTime?: string;
  duration?: number;
  status?: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  type?: 'consultation' | 'follow-up' | 'emergency' | 'regular';
  notes?: string;
  reminderSent?: boolean;
}

// Mock API functions (replace with actual API calls)
const appointmentsApi = {
  getAll: async (): Promise<Appointment[]> => {
    // Mock implementation
    return [];
  },
  getById: async (id: string): Promise<Appointment> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  create: async (data: CreateAppointmentData): Promise<Appointment> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  update: async (id: string, data: UpdateAppointmentData): Promise<Appointment> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  delete: async (id: string): Promise<void> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
};

// Async thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

export const fetchAppointmentById = createAsyncThunk(
  'appointments/fetchAppointmentById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointment');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (data: CreateAppointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.create(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create appointment');
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, data }: { id: string; data: UpdateAppointmentData }, { rejectWithValue }) => {
    try {
      const response = await appointmentsApi.update(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update appointment');
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id: string, { rejectWithValue }) => {
    try {
      await appointmentsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete appointment');
    }
  }
);

// State interface
interface AppointmentsState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AppointmentsState = {
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null,
};

// Slice
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
    setSelectedAppointment: (state, action: PayloadAction<Appointment>) => {
      state.selectedAppointment = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all appointments
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch appointment by ID
    builder
      .addCase(fetchAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAppointment = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create appointment
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update appointment
    builder
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        if (state.selectedAppointment?.id === action.payload.id) {
          state.selectedAppointment = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete appointment
    builder
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
        if (state.selectedAppointment?.id === action.payload) {
          state.selectedAppointment = null;
        }
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedAppointment, setSelectedAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer; 