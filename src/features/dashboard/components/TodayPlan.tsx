import React, { useMemo } from 'react';
import { XStack, YStack, Text, Button } from 'tamagui';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';
import { DashboardCard, Pill, ListItem } from './DashboardCard';

type Task = { title: string; tag: string; next?: string };

export default function TodayPlan({
  tasks = [
    { title: 'Revisar aula (20min)', tag: 'Curta', next: 'Abrir a tarefa e iniciar foco.' },
    { title: 'Entregar atividade (1h)', tag: 'Importante', next: 'Quebrar em 3 passos.' },
    { title: 'Ler resumo (15min)', tag: 'Leve', next: 'Escolher 1 capítulo.' },
    { title: 'Organizar agenda', tag: 'Rotina', next: 'Listar 3 prioridades do dia.' }
  ],
  onGoTasks
}: {
  tasks?: Task[];
  onGoTasks?: () => void;
}) {
  const prefs = usePreferences();

  const visibleTasks = useMemo(
    () => (prefs.focusMode ? tasks.slice(0, 2) : tasks.slice(0, 3)),
    [prefs.focusMode, tasks]
  );

  return (
    <DashboardCard title="Plano de hoje" subtitle="Próxima ação clara, sem bagunça">
      {!prefs.summaryMode && !prefs.focusMode && (
        <XStack gap="$2" marginBottom="$3">
          <Pill label="Ritmo" tone="primary" />
          <Text fontSize={12} color="$gray10">
            Foco 6h • Pausas 2h • Planeje pausas curtas
          </Text>
        </XStack>
      )}

      <YStack gap="$2">
        {visibleTasks.map((t, idx) => (
          <ListItem key={t.title} subtle={idx === 0}>
            <XStack alignItems="center" gap="$2" flex={1}>
              <Bullet />
              <YStack flex={1} gap="$1">
                <XStack alignItems="center" justifyContent="space-between" gap="$2">
                  <Text fontWeight="900" flex={1} numberOfLines={1}>
                    {t.title}
                  </Text>
                  {!prefs.hideSensitiveValues && <Pill label={t.tag} />}
                </XStack>

                {prefs.summaryMode && (
                  <Text fontSize={12} color="$gray10">
                    Próximo passo: {t.next ?? 'abrir e iniciar foco.'}
                  </Text>
                )}
              </YStack>
            </XStack>
          </ListItem>
        ))}

        <Button
          marginTop="$2"
          onPress={onGoTasks}
          backgroundColor="white"
          borderWidth={0.2}
          borderColor="$gray500"
        >
          Ir para tarefas
        </Button>

        <Text fontSize={12} color="$gray10" marginTop="$1">
          Dica: no **Modo foco**, mostramos menos itens e passos menores.
        </Text>
      </YStack>
    </DashboardCard>
  );
}

function Bullet() {
  return <YStack width={10} height={10} borderRadius={99} backgroundColor="$primary400" />;
}
