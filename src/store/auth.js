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

const user_session = localStorage.getItem("user_session")
  ? JSON.parse(localStorage.getItem("user_session"))
  : {};

const slice = createSlice({
  name: "auth",
  initialState: {
    user: user_session.user || null,
    token: user_session.token || null,
    isAuthenticated: user_session.token ? true : false,
    loading: false,
  },
  reducers: {
    logoutSuccess: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user_session");
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
  },
});
export default slice.reducer;

const { logoutSuccess } = slice.actions;

export const logout = () => async (dispatch) => {
  try {
    // const res = await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
