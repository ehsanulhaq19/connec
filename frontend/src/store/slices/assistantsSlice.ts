import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { assistantsApi, Assistant, CreateAssistantData, UpdateAssistantData } from '../../api/assistants';

interface AssistantsState {
  assistants: Assistant[];
  currentAssistant: Assistant | null;
  loading: boolean;
  error: string | null;
}

const initialState: AssistantsState = {
  assistants: [],
  currentAssistant: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAssistants = createAsyncThunk(
  'assistants/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const assistants = await assistantsApi.getAll();
      return assistants;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assistants');
    }
  }
);

export const fetchAssistantById = createAsyncThunk(
  'assistants/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const assistant = await assistantsApi.getById(id);
      return assistant;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assistant');
    }
  }
);

export const createAssistant = createAsyncThunk(
  'assistants/create',
  async (data: CreateAssistantData, { rejectWithValue }) => {
    try {
      const assistant = await assistantsApi.create(data);
      return assistant;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create assistant');
    }
  }
);

export const updateAssistant = createAsyncThunk(
  'assistants/update',
  async ({ id, data }: { id: string; data: UpdateAssistantData }, { rejectWithValue }) => {
    try {
      const assistant = await assistantsApi.update(id, data);
      return assistant;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update assistant');
    }
  }
);

export const deleteAssistant = createAsyncThunk(
  'assistants/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await assistantsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete assistant');
    }
  }
);

export const toggleAssistantActive = createAsyncThunk(
  'assistants/toggleActive',
  async (id: string, { rejectWithValue }) => {
    try {
      const assistant = await assistantsApi.toggleActive(id);
      return assistant;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle assistant status');
    }
  }
);

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentAssistant: (state, action: PayloadAction<Assistant | null>) => {
      state.currentAssistant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all assistants
      .addCase(fetchAssistants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistants.fulfilled, (state, action: PayloadAction<Assistant[]>) => {
        state.loading = false;
        state.assistants = action.payload;
      })
      .addCase(fetchAssistants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch assistant by ID
      .addCase(fetchAssistantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssistantById.fulfilled, (state, action: PayloadAction<Assistant>) => {
        state.loading = false;
        state.currentAssistant = action.payload;
      })
      .addCase(fetchAssistantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create assistant
      .addCase(createAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssistant.fulfilled, (state, action: PayloadAction<Assistant>) => {
        state.loading = false;
        state.assistants.push(action.payload);
      })
      .addCase(createAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update assistant
      .addCase(updateAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAssistant.fulfilled, (state, action: PayloadAction<Assistant>) => {
        state.loading = false;
        const index = state.assistants.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.assistants[index] = action.payload;
        }
        if (state.currentAssistant?.id === action.payload.id) {
          state.currentAssistant = action.payload;
        }
      })
      .addCase(updateAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete assistant
      .addCase(deleteAssistant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssistant.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.assistants = state.assistants.filter(a => a.id !== action.payload);
        if (state.currentAssistant?.id === action.payload) {
          state.currentAssistant = null;
        }
      })
      .addCase(deleteAssistant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Toggle assistant active
      .addCase(toggleAssistantActive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAssistantActive.fulfilled, (state, action: PayloadAction<Assistant>) => {
        state.loading = false;
        const index = state.assistants.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.assistants[index] = action.payload;
        }
        if (state.currentAssistant?.id === action.payload.id) {
          state.currentAssistant = action.payload;
        }
      })
      .addCase(toggleAssistantActive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentAssistant } = assistantsSlice.actions;
export default assistantsSlice.reducer; 