import { createTokens } from 'tamagui';

const tokens = createTokens({
  color: {
    primary100: '#6bc1e0',
    primary200: '#66bddc',
    primary300: '#41a9ce',
    primary400: '#2c9ec8',
    primary500: '#027BAA',
    primary600: '#016891',
    primary700: '#014d6b',
    primary800: '#013346',
    primary900: '#011f2b',

    secondary100: '#519554',
    secondary200: '#498f4c',
    secondary300: '#408f44',
    secondary400: '#3a8d3e',
    secondary500: '#2B9430',
    secondary600: '#1a831f',
    secondary700: '#126a17',
    secondary800: '#085a0c',
    secondary900: '#044307',

    gray50: '#fafafa',
    gray100: '#f4f4f5',
    gray200: '#e4e4e7',
    gray300: '#d4d4d8',
    gray400: '#a1a1aa',
    gray500: '#71717a',
    gray600: '#52525b',
    gray700: '#3f3f46',
    gray800: '#27272a',
    gray900: '#18181b',
    gray950: '#111111',

    red100: '#FEE2E2',
    red200: '#FECACA',
    red300: '#FCA5A5',
    red400: '#F87171',
    red500: '#EF4444',
    red600: '#DC2626',
    red700: '#B91C1C',
    red800: '#991B1B',
    red900: '#7F1D1D',

    green100: '#DCFCE7',
    green200: '#BBF7D0',
    green300: '#86EFAC',
    green400: '#4ADE80',
    green500: '#22C55E',
    green600: '#16A34A',
    green700: '#15803D',
    green800: '#166534',
    green900: '#14532D',

    blue100: '#DBEAFE',
    blue200: '#BFDBFE',
    blue300: '#93C5FD',
    blue400: '#60A5FA',
    blue500: '#3B82F6',
    blue600: '#2563EB',
    blue700: '#1D4ED8',
    blue800: '#1E40AF',
    blue900: '#1E3A8A',

    yellow100: '#FEFCE8',
    yellow200: '#FDE68A',
    yellow300: '#FCD34D',
    yellow400: '#FBBF24',
    yellow500: '#F59E0B',
    yellow600: '#D97706',
    yellow700: '#B45309',
    yellow800: '#92400E',
    yellow900: '#78350F',

    orange100: '#FFF7ED',
    orange200: '#FFEDD5',
    orange300: '#FED7AA',
    orange400: '#FBBF24',
    orange500: '#F59E0B',
    orange600: '#D97706',
    orange700: '#B45309',
    orange800: '#92400E',
    orange900: '#78350F',

    purple100: '#F5F0FF',
    purple200: '#EAE1FF',
    purple300: '#D7BFFF',
    purple400: '#BFA3FF',
    purple500: '#A77BFF',
    purple600: '#8B5FFF',
    purple700: '#6F43FF',
    purple800: '#5A3BC4',
    purple900: '#4A2C99',

    background: '#eaeaea',
    white: '#FFFFFF',
    black: '#000000'
  }
});

const system = {
  tokens,
  themes: {
    mindEase: {
      bg: '$background',
      bgHover: '$primary200',
      bgPress: '$primary300',
      color: 'white',
      borderColor: '$primary700',

      secondaryBg: '$secondary100',
      secondaryColor: '$secondary700',
      secondaryBorder: '$secondary500',

      radii: '$sm',

      primarySolid: '$primary600',
      primaryContrast: '$white',
      primaryFg: '$primary700',
      primaryMuted: '$primary100',
      primarySubtle: '$primary200',
      primaryEmphasized: '$primary300',
      primaryFocusRing: '$primary700',

      secondarySolid: '$secondary500',
      secondaryContrast: '$secondary100',
      secondaryFg: '$secondary700',
      secondaryMuted: '$secondary100',
      secondarySubtle: '$secondary200',
      secondaryEmphasized: '$secondary300',
      secondaryFocusRing: '$secondary500'
    }
  }
};

export { system };
