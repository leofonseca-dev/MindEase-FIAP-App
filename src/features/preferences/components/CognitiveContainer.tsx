import React from 'react';
import { YStack } from 'tamagui';
import { usePreferences } from '../hooks/usePreferences';

export function CognitiveContainer({ children }: { children: React.ReactNode }) {
  const prefs = usePreferences();

  const pad = prefs.spacingScale === 1 ? '$3' : prefs.spacingScale === 3 ? '$5' : '$4';
  const gap = prefs.spacingScale === 1 ? '$3' : prefs.spacingScale === 3 ? '$5' : '$4';

  return (
    <YStack padding={pad} gap={gap} flex={1}>
      {children}
    </YStack>
  );
}
