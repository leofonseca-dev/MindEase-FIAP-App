import React, { useMemo } from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';
import { DashboardCard, ListItem } from './DashboardCard';

type Action = { title: string; desc: string };

export default function QuickActions({
  onGoTasks,
  onCreateTask,
  onStartFocus
}: {
  onGoTasks?: () => void;
  onCreateTask?: () => void;
  onStartFocus?: () => void;
}) {
  const prefs = usePreferences();

  const actions: Action[] = useMemo(
    () => [
      { title: 'Criar tarefa', desc: 'Quebre em passos pequenos' },
      { title: 'Iniciar foco', desc: 'Comece uma sessão guiada' },
      { title: 'Checklist rápido', desc: 'Reduz sobrecarga' },
      { title: 'Trocar de atividade', desc: 'Transição suave' }
    ],
    []
  );

  const visible = useMemo(
    () => (prefs.focusMode ? actions.slice(0, 2) : actions),
    [prefs.focusMode, actions]
  );

  return (
    <DashboardCard title="Ações rápidas" subtitle="Previsível e direto">
      <YStack gap="$2">
        {visible.map((a, idx) => (
          <ListItem key={a.title} subtle={idx === 0}>
            <XStack alignItems="center" gap="$2" flex={1}>
              <YStack width={28} height={28} borderRadius={999} backgroundColor="$primary50" />
              <YStack flex={1} gap="$0.5">
                <Text fontWeight="900">{a.title}</Text>
                {!prefs.hideSensitiveValues && (
                  <Text fontSize={12} color="$gray10">
                    {a.desc}
                  </Text>
                )}
              </YStack>
            </XStack>
          </ListItem>
        ))}

        <YStack gap="$2" marginTop="$2">
          <Button
            marginTop="$2"
            onPress={onGoTasks}
            backgroundColor="white"
            borderWidth={0.2}
            borderColor="$gray500"
          >
            Ir para tarefas
          </Button>

          <XStack gap="$2" flexWrap="wrap">
            {!prefs.focusMode && (
              <Button variant="outlined" onPress={onCreateTask}>
                Criar tarefa
              </Button>
            )}
            <Button variant="outlined" onPress={onStartFocus}>
              Iniciar foco
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </DashboardCard>
  );
}
