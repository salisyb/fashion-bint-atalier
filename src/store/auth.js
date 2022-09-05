import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/config";
import storage from "utils/storage";

// Slice

// login in user
// First, create the thunk
export const login = createAsyncThunk(
  "auth/login",
  async (userLoginDetails, { rejectWithValue }) => {
    const response = await api.post("/api/v1/auth/login", userLoginDetails);
    if (!response.ok) {
      return rejectWithValue(response.problem);
    }
    return response.data;
  }
);

export const getClient = createAsyncThunk(
  "auth/getClient",
  async (userLoginDetails, { rejectWithValue }) => {
    const response = await api.get("/api/v1/auth/client");
    if (!response.ok) {
      return rejectWithValue(response.problem);
    }
    return response.data;
  }
);

export const createClient = createAsyncThunk(
  "auth/createClient",
  async (clientForm, { rejectWithValue }) => {
    const response = await api.post("/api/v1/auth/client/", clientForm);
    if (!response.ok) {
      return rejectWithValue(response.problem);
    }

    return response.data;
  }
);

export const getOrder = createAsyncThunk(
  "auth/getOrder",
  async (token, { rejectWithValue }) => {
    const response = await api.get("/api/v1/auth/order");
    if (!response.ok) {
      return rejectWithValue(response.problem);
    }
    return response.data;
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    token: storage.get("token") || null,
    user: storage.get("user") || null,
    isAuthenticated: storage.get("token") ? true : false,
    clients: [],
    order: [],
    loading: false,
  },
  reducers: {
    setOrders: (state, { payload }) => {
      state.order = payload;
    },
    removeOrder: (state, { payload }) => {
      const newState = state.order.filter((o) => o.id !== payload);
      state.order = newState;
    },
    addOrders: (state, { payload }) => {
      state.order = [payload, ...state.order];
    },

    logoutSuccess: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      storage.remove("user");
      storage.remove("token");
    },
    addClients: (state, { payload }) => {
      state.clients = [payload, ...state.clients];
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.loading = false;

      storage.set("user", payload.user);
      storage.set("token", payload.token);
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },

    [getClient.pending]: (state) => {
      state.loading = true;
    },
    [getClient.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clients = payload;
    },
    [getClient.rejected]: (state) => {
      state.loading = false;
    },

    [createClient.pending]: (state) => {
      state.loading = true;
    },
    [createClient.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clients = [payload, ...state.clients];
    },
    [createClient.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
  },
});
export default slice.reducer;

export const { logoutSuccess, addClients, setOrders, addOrders, removeOrder } =
  slice.actions;

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
