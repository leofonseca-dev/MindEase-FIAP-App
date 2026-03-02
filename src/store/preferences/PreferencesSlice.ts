import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadJSON, saveJSON } from '../storage';
import { AppDispatch } from '../Store';

export type ComplexityLevel = 1 | 2 | 3;
export type ContrastMode = 'NORMAL' | 'HIGH';
export type SpacingScale = 1 | 2 | 3;
export type FontScale = 1 | 2 | 3;

type Needs = {
  adhd: boolean;
  autism: boolean;
  dyslexia: boolean;
  anxiety: boolean;
  sensoryOverload: boolean;
};

type Routine = {
  bestTimeOfDay: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  breakReminder: boolean;
};

type NeedsKey = keyof Needs;
type RoutineKey = keyof Routine;

export type PreferencesState = {
  complexityLevel: ComplexityLevel;
  focusMode: boolean;
  summaryMode: boolean;
  reduceMotion: boolean;
  hideSensitiveValues: boolean;

  contrastMode: ContrastMode;
  spacingScale: SpacingScale;
  fontScale: FontScale;

  needs: Needs;
  routine: Routine;
};

const STORAGE_KEY = 'mindease.preferences.v1';

const initialState: PreferencesState = {
  complexityLevel: 3,
  focusMode: false,
  summaryMode: false,
  reduceMotion: false,
  hideSensitiveValues: false,

  contrastMode: 'NORMAL',
  spacingScale: 2,
  fontScale: 2,

  needs: {
    adhd: false,
    autism: false,
    dyslexia: false,
    anxiety: false,
    sensoryOverload: false
  },
  routine: {
    bestTimeOfDay: 'MORNING',
    breakReminder: false
  }
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    hydratePreferences(state, action: PayloadAction<Partial<PreferencesState>>) {
      Object.assign(state, action.payload);
    },

    toggleFocusMode(state) {
      state.focusMode = !state.focusMode;
      if (state.focusMode) {
        state.summaryMode = true;
        state.reduceMotion = true;
        state.contrastMode = 'NORMAL';
        state.spacingScale = 3;
        state.fontScale = 3;
      }
    },

    toggleSummaryMode(state) {
      state.summaryMode = !state.summaryMode;
    },

    toggleReduceMotion(state) {
      state.reduceMotion = !state.reduceMotion;
    },

    toggleHideSensitiveValues(state) {
      state.hideSensitiveValues = !state.hideSensitiveValues;
    },

    setComplexityLevel(state, action: PayloadAction<ComplexityLevel>) {
      state.complexityLevel = action.payload;
    },

    setContrastMode(state, action: PayloadAction<ContrastMode>) {
      state.contrastMode = action.payload;
    },

    setSpacingScale(state, action: PayloadAction<SpacingScale>) {
      state.spacingScale = action.payload;
    },

    setFontScale(state, action: PayloadAction<FontScale>) {
      state.fontScale = action.payload;
    },

    setNeed(state, action: PayloadAction<{ key: NeedsKey; value: boolean }>) {
      state.needs[action.payload.key] = action.payload.value;
    },

    setRoutine(state, action: PayloadAction<{ key: RoutineKey; value: Routine[RoutineKey] }>) {
      // @ts-expect-error Immer allows direct mutations in reducers
      state.routine[action.payload.key] = action.payload.value;
    }
  }
});

export const {
  hydratePreferences,
  toggleFocusMode,
  toggleSummaryMode,
  toggleReduceMotion,
  toggleHideSensitiveValues,
  setComplexityLevel,
  setContrastMode,
  setSpacingScale,
  setFontScale,
  setNeed,
  setRoutine
} = preferencesSlice.actions;

export default preferencesSlice.reducer;

export async function loadPrefsFromStorage() {
  return loadJSON<Partial<PreferencesState>>(STORAGE_KEY);
}

export async function savePrefsToStorage(state: PreferencesState) {
  return saveJSON(STORAGE_KEY, state);
}

export const hydratePreferencesFromStorage = () => async (dispatch: AppDispatch) => {
  const stored = await loadPrefsFromStorage();
  if (stored) dispatch(hydratePreferences(stored));
};
