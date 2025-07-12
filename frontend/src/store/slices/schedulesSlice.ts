import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
interface Schedule {
  id: string;
  clientId: string;
  assistantId: string;
  scheduledTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateScheduleData {
  clientId: string;
  assistantId: string;
  scheduledTime: string;
  duration: number;
  notes?: string;
}

interface UpdateScheduleData {
  scheduledTime?: string;
  duration?: number;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

// Mock API functions (replace with actual API calls)
const schedulesApi = {
  getAll: async (): Promise<Schedule[]> => {
    // Mock implementation
    return [];
  },
  getById: async (id: string): Promise<Schedule> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  create: async (data: CreateScheduleData): Promise<Schedule> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  update: async (id: string, data: UpdateScheduleData): Promise<Schedule> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  delete: async (id: string): Promise<void> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
};

// Async thunks
export const fetchSchedules = createAsyncThunk(
  'schedules/fetchSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await schedulesApi.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedules');
    }
  }
);

export const fetchScheduleById = createAsyncThunk(
  'schedules/fetchScheduleById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await schedulesApi.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schedule');
    }
  }
);

export const createSchedule = createAsyncThunk(
  'schedules/createSchedule',
  async (data: CreateScheduleData, { rejectWithValue }) => {
    try {
      const response = await schedulesApi.create(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create schedule');
    }
  }
);

export const updateSchedule = createAsyncThunk(
  'schedules/updateSchedule',
  async ({ id, data }: { id: string; data: UpdateScheduleData }, { rejectWithValue }) => {
    try {
      const response = await schedulesApi.update(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update schedule');
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  'schedules/deleteSchedule',
  async (id: string, { rejectWithValue }) => {
    try {
      await schedulesApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete schedule');
    }
  }
);

// State interface
interface SchedulesState {
  schedules: Schedule[];
  selectedSchedule: Schedule | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SchedulesState = {
  schedules: [],
  selectedSchedule: null,
  loading: false,
  error: null,
};

// Slice
const schedulesSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedSchedule: (state) => {
      state.selectedSchedule = null;
    },
    setSelectedSchedule: (state, action: PayloadAction<Schedule>) => {
      state.selectedSchedule = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all schedules
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch schedule by ID
    builder
      .addCase(fetchScheduleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScheduleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSchedule = action.payload;
      })
      .addCase(fetchScheduleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create schedule
    builder
      .addCase(createSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules.push(action.payload);
      })
      .addCase(createSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update schedule
    builder
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.schedules.findIndex(schedule => schedule.id === action.payload.id);
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
        if (state.selectedSchedule?.id === action.payload.id) {
          state.selectedSchedule = action.payload;
        }
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete schedule
    builder
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(schedule => schedule.id !== action.payload);
        if (state.selectedSchedule?.id === action.payload) {
          state.selectedSchedule = null;
        }
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedSchedule, setSelectedSchedule } = schedulesSlice.actions;
export default schedulesSlice.reducer; 