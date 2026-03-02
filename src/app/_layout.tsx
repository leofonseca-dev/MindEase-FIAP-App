import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '@/../tamagui.config';

import store from '@/store/Store';
import { hydratePreferencesFromStorage } from '@/store/preferences/PreferencesSlice';
import { hydrateUserFromStorage } from '@/store/user/UserSlice';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    store.dispatch(hydratePreferencesFromStorage());
    store.dispatch(hydrateUserFromStorage());
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Medium': require('@/assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf')
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <TamaguiProvider config={config}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Theme name="fiap">
            <Stack screenOptions={{ headerShown: false }} />
          </Theme>
        </QueryClientProvider>
      </Provider>
    </TamaguiProvider>
  );
}
