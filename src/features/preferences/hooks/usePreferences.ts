import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ContrastMode = 'NORMAL' | 'HIGH';
export type SpacingScale = 1 | 2 | 3;
export type FontScale = 1 | 2 | 3;
export type ComplexityLevel = 1 | 2 | 3;

export type PreferencesState = {
  complexityLevel: ComplexityLevel;
  focusMode: boolean;
  summaryMode: boolean;
  reduceMotion: boolean;
  hideSensitiveValues: boolean;
  contrastMode: ContrastMode;
  spacingScale: SpacingScale;
  fontScale: FontScale;

  setComplexityLevel: (v: ComplexityLevel) => void;
  toggleFocusMode: () => void;
  toggleSummaryMode: () => void;
  toggleReduceMotion: () => void;
  toggleHideSensitiveValues: () => void;
  setContrastMode: (v: ContrastMode) => void;
  setSpacingScale: (v: SpacingScale) => void;
  setFontScale: (v: FontScale) => void;
};

const STORAGE_KEY = 'mindease.preferences.v1';

export const usePreferences = create<PreferencesState>()(
  persist(
    (set, get) => ({
      complexityLevel: 3,
      focusMode: false,
      summaryMode: false,
      reduceMotion: false,
      hideSensitiveValues: false,
      contrastMode: 'NORMAL',
      spacingScale: 2,
      fontScale: 2,

      setComplexityLevel: (v) => set({ complexityLevel: v }),

      toggleFocusMode: () => {
        const next = !get().focusMode;
        if (next) {
          set({
            focusMode: true,
            summaryMode: true,
            reduceMotion: true,
            contrastMode: 'NORMAL',
            spacingScale: 3,
            fontScale: 3
          });
        } else {
          set({ focusMode: false });
        }
      },

      toggleSummaryMode: () => set((s) => ({ summaryMode: !s.summaryMode })),
      toggleReduceMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),
      toggleHideSensitiveValues: () =>
        set((s) => ({ hideSensitiveValues: !s.hideSensitiveValues })),
      setContrastMode: (v) => set({ contrastMode: v }),
      setSpacingScale: (v) => set({ spacingScale: v }),
      setFontScale: (v) => set({ fontScale: v })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      version: 1
    }
  )
);
