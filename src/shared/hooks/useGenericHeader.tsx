import { ArrowLeft } from '@tamagui/lucide-icons';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { getTokens } from 'tamagui';

export function useGenericHeader(title: string) {
  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const tokens = getTokens();

  useEffect(() => {
    const handleBack = () => {
      if (navigation.canGoBack?.()) {
        navigation.goBack();
      } else {
        router.replace('/dashboard/page');
      }
    };

    navigation.setOptions({
      title,
      headerTitleAlign: 'left',
      headerLeft: () => (
        <TouchableOpacity onPress={handleBack} style={{ paddingLeft: 12 }}>
          <ArrowLeft size="$2" color="black" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: tokens.color.$gray100.val
      },
      headerTintColor: 'black'
    });
  }, [navigation, router, title, tokens]);
}
