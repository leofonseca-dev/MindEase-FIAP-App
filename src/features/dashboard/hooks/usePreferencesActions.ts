import {
  setComplexityLevel,
  setContrastMode,
  setSpacingScale,
  setFontScale,
  toggleFocusMode,
  toggleSummaryMode,
  toggleReduceMotion,
  toggleHideSensitiveValues,
  type ComplexityLevel,
  type ContrastMode,
  type SpacingScale,
  type FontScale
} from '@/store/preferences/PreferencesSlice';
import { useDispatch } from '@/store/Store';

export function usePreferencesActions() {
  const dispatch = useDispatch();

  return {
    setComplexityLevel: (v: ComplexityLevel) => dispatch(setComplexityLevel(v)),
    setContrastMode: (v: ContrastMode) => dispatch(setContrastMode(v)),
    setSpacingScale: (v: SpacingScale) => dispatch(setSpacingScale(v)),
    setFontScale: (v: FontScale) => dispatch(setFontScale(v)),

    toggleFocusMode: () => dispatch(toggleFocusMode()),
    toggleSummaryMode: () => dispatch(toggleSummaryMode()),
    toggleReduceMotion: () => dispatch(toggleReduceMotion()),
    toggleHideSensitiveValues: () => dispatch(toggleHideSensitiveValues())
  };
}
