import ProfileScreen from '@/features/profile/screen/ProfileScreen';
import { useGenericHeader } from '@/shared/hooks/useGenericHeader';

export default function Page() {
  useGenericHeader('Perfil');
  return <ProfileScreen />;
}
