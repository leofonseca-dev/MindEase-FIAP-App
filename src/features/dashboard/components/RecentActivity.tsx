import React, { useMemo } from 'react';
import { Card, XStack, YStack, Text } from 'tamagui';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';

type Row = { id: number; type: string; time: string; detail: string; tag: string };

const data: Row[] = [
  { id: 1, type: 'Tarefa concluída', time: '10:20', detail: 'Revisar aula', tag: 'Feito' },
  { id: 2, type: 'Sessão de foco', time: '09:40', detail: '25 min', tag: 'Foco' },
  { id: 3, type: 'Pausa', time: '09:10', detail: '5 min', tag: 'Pausa' }
];

export default function RecentActivity() {
  const prefs = usePreferences();
  const visible = useMemo(() => (prefs.focusMode ? data.slice(0, 2) : data), [prefs.focusMode]);

  return (
    <Card padding="$4" backgroundColor="$color1">
      <YStack gap="$1" marginBottom="$3">
        <Text fontWeight="800">Atividade recente</Text>
        <Text opacity={0.7}>Para manter previsibilidade</Text>
      </YStack>

      <YStack gap="$2">
        {visible.map((row) => (
          <XStack
            key={row.id}
            borderWidth={0.2}
            borderRadius={8}
            padding="$3"
            alignItems="center"
            justifyContent="space-between"
            gap="$2"
          >
            <YStack flex={1} gap="$1">
              <XStack alignItems="center" justifyContent="space-between" gap="$2">
                <Text fontWeight="800" flex={1}>
                  {row.type}
                </Text>
                {!prefs.hideSensitiveValues && <TagPill label={row.tag} />}
              </XStack>

              <XStack alignItems="center" justifyContent="space-between">
                <Text opacity={0.7}>{row.time}</Text>
                <Text fontWeight="700">{prefs.hideSensitiveValues ? '•••' : row.detail}</Text>
              </XStack>
            </YStack>
          </XStack>
        ))}
      </YStack>
    </Card>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <XStack paddingHorizontal="$2" paddingVertical="$1" borderRadius={8} backgroundColor="$color3">
      <Text fontSize={12} fontWeight="800">
        {label}
      </Text>
    </XStack>
  );
}
