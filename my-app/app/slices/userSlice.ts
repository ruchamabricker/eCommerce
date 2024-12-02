import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
  image :  string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  address: null,
  image:null,
  isAuthenticated: false,
  isVerified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; name: string; email: string; address: string; image: string; isVerified: boolean }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.image = action.payload.image;
      state.isVerified = action.payload.isVerified;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.address = null;
      state.image = null;
      state.isVerified = false;
      state.isAuthenticated = false;
    },
  },
});
  
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
