import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/config";

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

const user_session = localStorage.getItem("user_session")
  ? JSON.parse(localStorage.getItem("user_session"))
  : {};

const slice = createSlice({
  name: "auth",
  initialState: {
    user: user_session.user || null,
    clients: user_session.clients || [],
    order: user_session.clients || [],
    token: user_session.token || null,
    isAuthenticated: user_session.token ? true : false,
    loading: false,
  },
  reducers: {
    setOrders: (state, { payload }) => {
      state.order = payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user_session");
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

      localStorage.setItem("user_session", JSON.stringify(payload));
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

export const { logoutSuccess, addClients, setOrders } = slice.actions;

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
