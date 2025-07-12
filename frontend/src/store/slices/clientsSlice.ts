import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { clientsApi, Client, CreateClientData, UpdateClientData } from '../../api/clients';

// Async thunks
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clientsApi.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch clients');
    }
  }
);

export const fetchClientById = createAsyncThunk(
  'clients/fetchClientById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await clientsApi.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch client');
    }
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (data: CreateClientData, { rejectWithValue }) => {
    try {
      const response = await clientsApi.create(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create client');
    }
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, data }: { id: string; data: UpdateClientData }, { rejectWithValue }) => {
    try {
      const response = await clientsApi.update(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update client');
    }
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id: string, { rejectWithValue }) => {
    try {
      await clientsApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete client');
    }
  }
);

export const searchClients = createAsyncThunk(
  'clients/searchClients',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await clientsApi.search(query);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search clients');
    }
  }
);

// State interface
interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  loading: boolean;
  error: string | null;
  searchResults: Client[];
  searchLoading: boolean;
}

// Initial state
const initialState: ClientsState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
};

// Slice
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedClient: (state) => {
      state.selectedClient = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    setSelectedClient: (state, action: PayloadAction<Client>) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all clients
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch client by ID
    builder
      .addCase(fetchClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClient = action.payload;
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create client
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update client
    builder
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
        if (state.selectedClient?.id === action.payload.id) {
          state.selectedClient = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete client
    builder
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter(client => client.id !== action.payload);
        if (state.selectedClient?.id === action.payload) {
          state.selectedClient = null;
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Search clients
    builder
      .addCase(searchClients.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchClients.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchClients.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedClient, clearSearchResults, setSelectedClient } = clientsSlice.actions;
export default clientsSlice.reducer; 