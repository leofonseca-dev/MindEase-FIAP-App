import React from 'react';
import { Card, XStack, YStack, Text, getTokens } from 'tamagui';

export function DashboardCard({
  title,
  subtitle,
  action,
  children
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card elevate borderRadius={8} padding="$4" overflow="hidden" backgroundColor="white">
      <YStack position="absolute" backgroundColor="$primary400" opacity={0.35} />

      <XStack alignItems="flex-start" justifyContent="space-between" gap="$3" marginBottom="$3">
        <YStack flex={1} gap="$1">
          <Text fontSize={16} fontWeight="900" color="$gray12">
            {title}
          </Text>
          {!!subtitle && (
            <Text fontSize={13} color="$gray10">
              {subtitle}
            </Text>
          )}
        </YStack>

        {!!action && <XStack>{action}</XStack>}
      </XStack>

      {children}
    </Card>
  );
}

export function Pill({
  label,
  tone = 'neutral'
}: {
  label: string;
  tone?: 'neutral' | 'primary' | 'success' | 'warning';
}) {
  const map = {
    neutral: { bg: '$color3', fg: '$gray12' },
    primary: { bg: '$primary50', fg: '$primary700' },
    success: { bg: '$green3', fg: '$green11' },
    warning: { bg: '$yellow3', fg: '$yellow11' }
  } as const;

  const t = map[tone];

  return (
    <XStack
      paddingHorizontal="$2.5"
      paddingVertical="$1"
      borderRadius={5}
      backgroundColor={t.bg as any}
    >
      <Text fontSize={12} fontWeight="900" color={t.fg as any}>
        {label}
      </Text>
    </XStack>
  );
}

export function ListItem({
  children,
  subtle = false
}: {
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      gap="$3"
      padding="$3"
      borderRadius={10}
      backgroundColor={subtle ? '$color2' : 'transparent'}
    >
      {children}
    </XStack>
  );
}
