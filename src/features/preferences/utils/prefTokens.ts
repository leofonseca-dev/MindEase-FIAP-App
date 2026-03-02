import { ContrastMode, FontScale, SpacingScale } from '../hooks/usePreferences';

export const fontMultiplier = (v: FontScale) => (v === 1 ? 0.9 : v === 3 ? 1.15 : 1);
export const spaceMultiplier = (v: SpacingScale) => (v === 1 ? 0.9 : v === 3 ? 1.15 : 1);

export const isHighContrast = (v: ContrastMode) => v === 'HIGH';
