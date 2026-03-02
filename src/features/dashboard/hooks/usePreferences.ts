import { useSelector } from '@/store/Store';

export function usePreferences() {
  return useSelector((s) => s.preferences);
}
