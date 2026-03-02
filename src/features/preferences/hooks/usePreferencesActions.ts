import type {
  ComplexityLevel,
  ContrastMode,
  FontScale,
  SpacingScale
} from '@/store/preferences/PreferencesSlice';

import {
  setComplexityLevel,
  setContrastMode,
  setFontScale,
  setSpacingScale,
  toggleFocusMode,
  toggleHideSensitiveValues,
  toggleReduceMotion,
  toggleSummaryMode,
  savePreferencesToStorage
} from '@/store/preferences/PreferencesSlice';
import { useDispatch } from '@/store/Store';

export function usePreferencesActions() {
  const dispatch = useDispatch();

  const persist = () => dispatch(savePreferencesToStorage());

  return {
    setComplexityLevel: (v: ComplexityLevel) => {
      dispatch(setComplexityLevel(v));
      persist();
    },
    setContrastMode: (v: ContrastMode) => {
      dispatch(setContrastMode(v));
      persist();
    },
    setSpacingScale: (v: SpacingScale) => {
      dispatch(setSpacingScale(v));
      persist();
    },
    setFontScale: (v: FontScale) => {
      dispatch(setFontScale(v));
      persist();
    },

    toggleFocusMode: () => {
      dispatch(toggleFocusMode());
      persist();
    },
    toggleSummaryMode: () => {
      dispatch(toggleSummaryMode());
      persist();
    },
    toggleReduceMotion: () => {
      dispatch(toggleReduceMotion());
      persist();
    },
    toggleHideSensitiveValues: () => {
      dispatch(toggleHideSensitiveValues());
      persist();
    }
  };
}
