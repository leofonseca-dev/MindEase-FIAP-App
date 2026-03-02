import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'FIAP',
  slug: 'FIAP',
  version: '1.0.0',
  orientation: 'portrait',
  owner: 'leoalfonseca',
  icon: './src/assets/images/logo_collapse.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  jsEngine: 'hermes',
  androidStatusBar: {
    barStyle: 'light-content',
    backgroundColor: '#131625'
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/logo.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#131625'
      }
    ],
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
          infoPlist: {
            NSPhotoLibraryAddUsageDescription: 'Precisamos salvar seus recibos na Galeria.'
          }
        }
      }
    ],
    [
      'expo-notifications',
      {
        icon: './src/assets/images/apple-icon.png'
      }
    ],
    'expo-font',
    'expo-web-browser',
    'expo-secure-store'
  ],
  experiments: {
    typedRoutes: true
  }
});
