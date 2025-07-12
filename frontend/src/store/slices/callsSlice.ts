import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
interface Call {
  id: string;
  clientId: string;
  assistantId: string;
  scheduledTime: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'failed';
  recordingUrl?: string;
  transcript?: string;
  notes?: string;
  satisfaction?: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateCallData {
  clientId: string;
  assistantId: string;
  scheduledTime: string;
  duration: number;
  notes?: string;
}

interface UpdateCallData {
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'failed';
  recordingUrl?: string;
  transcript?: string;
  notes?: string;
  satisfaction?: number;
}

// Mock API functions (replace with actual API calls)
const callsApi = {
  getAll: async (): Promise<Call[]> => {
    // Mock implementation
    return [];
  },
  getById: async (id: string): Promise<Call> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  create: async (data: CreateCallData): Promise<Call> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  update: async (id: string, data: UpdateCallData): Promise<Call> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
  delete: async (id: string): Promise<void> => {
    // Mock implementation
    throw new Error('Not implemented');
  },
};

// Async thunks
export const fetchCalls = createAsyncThunk(
  'calls/fetchCalls',
  async (_, { rejectWithValue }) => {
    try {
      const response = await callsApi.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch calls');
    }
  }
);

export const fetchCallById = createAsyncThunk(
  'calls/fetchCallById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await callsApi.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch call');
    }
  }
);

export const createCall = createAsyncThunk(
  'calls/createCall',
  async (data: CreateCallData, { rejectWithValue }) => {
    try {
      const response = await callsApi.create(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create call');
    }
  }
);

export const updateCall = createAsyncThunk(
  'calls/updateCall',
  async ({ id, data }: { id: string; data: UpdateCallData }, { rejectWithValue }) => {
    try {
      const response = await callsApi.update(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update call');
    }
  }
);

export const deleteCall = createAsyncThunk(
  'calls/deleteCall',
  async (id: string, { rejectWithValue }) => {
    try {
      await callsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete call');
    }
  }
);

// State interface
interface CallsState {
  calls: Call[];
  selectedCall: Call | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CallsState = {
  calls: [],
  selectedCall: null,
  loading: false,
  error: null,
};

// Slice
const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCall: (state) => {
      state.selectedCall = null;
    },
    setSelectedCall: (state, action: PayloadAction<Call>) => {
      state.selectedCall = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all calls
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.loading = false;
        state.calls = action.payload;
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch call by ID
    builder
      .addCase(fetchCallById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCall = action.payload;
      })
      .addCase(fetchCallById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create call
    builder
      .addCase(createCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCall.fulfilled, (state, action) => {
        state.loading = false;
        state.calls.push(action.payload);
      })
      .addCase(createCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update call
    builder
      .addCase(updateCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCall.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.calls.findIndex(call => call.id === action.payload.id);
        if (index !== -1) {
          state.calls[index] = action.payload;
        }
        if (state.selectedCall?.id === action.payload.id) {
          state.selectedCall = action.payload;
        }
      })
      .addCase(updateCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete call
    builder
      .addCase(deleteCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCall.fulfilled, (state, action) => {
        state.loading = false;
        state.calls = state.calls.filter(call => call.id !== action.payload);
        if (state.selectedCall?.id === action.payload) {
          state.selectedCall = null;
        }
      })
      .addCase(deleteCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedCall, setSelectedCall } = callsSlice.actions;
export default callsSlice.reducer; 