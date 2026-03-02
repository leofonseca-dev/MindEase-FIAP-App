import { ChevronDown, ListFilter } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { XStack, YStack, Button, Input, Accordion, Paragraph } from 'tamagui';
import { Select } from '@/components/Select/Select';
import type { TaskStatus, TaskPriority } from '../model/Task';

type Props = {
  onChange: (f: { q?: string; status?: TaskStatus; priority?: TaskPriority }) => void;
};

export function TasksFilters({ onChange }: Props) {
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [q, setQ] = useState('');

  const apply = () =>
    onChange({
      q: q.trim() || undefined,
      status: (status || undefined) as any,
      priority: (priority || undefined) as any
    });

  const clear = () => {
    setStatus('');
    setPriority('');
    setQ('');
    onChange({});
  };

  return (
    <Accordion overflow="hidden" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderWidth={1}
          borderColor="$color5"
          borderRadius={10}
          backgroundColor="$color1"
          padding="$3"
        >
          <XStack alignItems="center" gap="$2">
            <ListFilter color="$primary400" />
            <Paragraph color="$primary400" fontWeight="900">
              Filtros
            </Paragraph>
          </XStack>
          <ChevronDown color="$primary400" />
        </Accordion.Trigger>

        <Accordion.HeightAnimator>
          <Accordion.Content exitStyle={{ opacity: 0 }}>
            <YStack gap="$3" paddingTop="$3">
              <XStack gap="$2" flexWrap="wrap">
                <YStack width="48%">
                  <Select
                    value={status}
                    onValueChange={setStatus}
                    placeholder="Status"
                    variant="outlined"
                    iconAfter={ChevronDown as any}
                    options={[
                      { label: 'Todos', value: '' },
                      { label: 'A fazer', value: 'TODO' },
                      { label: 'Em andamento', value: 'DOING' },
                      { label: 'Concluída', value: 'DONE' }
                    ]}
                    disablePreventBodyScroll
                  />
                </YStack>

                <YStack width="48%">
                  <Select
                    value={priority}
                    onValueChange={setPriority}
                    placeholder="Prioridade"
                    variant="outlined"
                    iconAfter={ChevronDown as any}
                    options={[
                      { label: 'Todas', value: '' },
                      { label: 'Leve', value: 'LOW' },
                      { label: 'Normal', value: 'MEDIUM' },
                      { label: 'Alta', value: 'HIGH' }
                    ]}
                    disablePreventBodyScroll
                  />
                </YStack>

                <YStack width="100%">
                  <Input
                    value={q}
                    onChangeText={setQ}
                    placeholder="Buscar por título, próximo passo, notas…"
                  />
                </YStack>
              </XStack>

              <XStack gap="$2" justifyContent="flex-end">
                <Button onPress={clear} variant="outlined">
                  Limpar
                </Button>
                <Button onPress={apply}>Aplicar</Button>
              </XStack>
            </YStack>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
}
