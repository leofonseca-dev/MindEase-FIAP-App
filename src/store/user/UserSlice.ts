import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadJSON, saveJSON } from '../storage';
import { AppDispatch } from '../Store';

export type UserProfile = {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
};

type UserState = {
  profile: UserProfile;
};

const STORAGE_KEY = 'mindease.user.v1';

const initialState: UserState = {
  profile: {
    name: 'Leonardo Fonseca',
    email: 'leoalfonseca@gmail.com',
    role: 'Desenvolvedor Front-end',
    avatarUrl: undefined
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hydrateUser(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      state.profile = { ...state.profile, ...action.payload };
    }
  }
});

export const { hydrateUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;

export async function loadUserFromStorage() {
  return loadJSON<Partial<UserState>>(STORAGE_KEY);
}

export async function saveUserToStorage(state: UserState) {
  return saveJSON(STORAGE_KEY, state);
}

export const hydrateUserFromStorage = () => async (dispatch: AppDispatch) => {
  const stored = await loadUserFromStorage();
  if (stored) dispatch(hydrateUser(stored));
};
