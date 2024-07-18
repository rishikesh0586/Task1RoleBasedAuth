import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  isAuth: false,
  role: null,
  loading: false,
  error: null,
};

// **Async Thunks for Login and Logout (replace with your actual API calls)**
export const login = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    // Simulate API call
    const response = await fetch("http://localhost:8888/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data.role; // Replace with actual role data from backend
  }
);

export const logout = createAsyncThunk("http://localhost:8888/logout", async () => {
  // Simulate API call
  await fetch("/api/logout");
});

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.role = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
         action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.role = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
