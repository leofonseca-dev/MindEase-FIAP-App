import { CheckCircle2, Circle, Flame, Clock3, CalendarClock, Pencil } from '@tamagui/lucide-icons';
import React, { useMemo } from 'react';
import { Card, XStack, YStack, Text, Button, Progress } from 'tamagui';
import { TaskType } from '../model/Task';

const statusMeta = {
  TODO: { label: 'A fazer' },
  DOING: { label: 'Em andamento' },
  DONE: { label: 'Concluída' }
} as const;

const priorityMeta = {
  LOW: { label: 'Leve' },
  MEDIUM: { label: 'Normal' },
  HIGH: { label: 'Alta' }
} as const;

function pillBg(status: TaskType['status']) {
  if (status === 'DONE') return '$green3';
  if (status === 'DOING') return '$primary3';
  return '$color2';
}

function pillFg(status: TaskType['status']) {
  if (status === 'DONE') return '$green11';
  if (status === 'DOING') return '$primary11';
  return '$gray11';
}

export function TaskCard({ task, onEdit }: { task: TaskType; onEdit?: () => void }) {
  const done = useMemo(() => task.checklist.filter((c) => c.done).length, [task.checklist]);
  const total = task.checklist.length || 1;
  const pct = Math.round((done / total) * 100);

  const statusIcon =
    task.status === 'DONE' ? (
      <CheckCircle2 size={18} color="$green10" />
    ) : (
      <Circle size={18} color="$gray8" />
    );

  return (
    <Card
      padding="$4"
      marginVertical="$2"
      backgroundColor="$color1"
      borderRadius={10}
      bordered
      borderColor="$color5"
      elevate
    >
      <XStack justifyContent="space-between" alignItems="flex-start" gap="$3">
        <XStack alignItems="center" gap="$2" flex={1}>
          {statusIcon}
          <YStack flex={1} gap="$1">
            <Text fontSize={15} fontWeight="900" numberOfLines={1}>
              {task.title}
            </Text>

            <XStack gap="$2" flexWrap="wrap">
              <XStack
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius={10}
                backgroundColor={pillBg(task.status)}
                borderWidth={1}
                borderColor="$color5"
              >
                <Text fontSize={12} fontWeight="900" color={pillFg(task.status)}>
                  {statusMeta[task.status].label}
                </Text>
              </XStack>

              <XStack
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius={10}
                backgroundColor={task.priority === 'HIGH' ? '$red3' : '$color2'}
                borderWidth={1}
                borderColor="$color5"
                alignItems="center"
                gap="$1"
              >
                {task.priority === 'HIGH' && <Flame size={14} color="$red10" />}
                <Text
                  fontSize={12}
                  fontWeight="900"
                  color={task.priority === 'HIGH' ? '$red11' : '$gray11'}
                >
                  {priorityMeta[task.priority].label}
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

        <Button
          icon={<Pencil size={16} />}
          size={34}
          circular
          backgroundColor="$color2"
          borderWidth={1}
          borderColor="$color5"
          onPress={onEdit}
        />
      </XStack>

      <XStack marginTop="$3" justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap="$2">
          <Clock3 size={16} color="$gray10" />
          <Text fontSize={12} color="$gray10" fontWeight="700">
            {task.estimatedMinutes} min
          </Text>
        </XStack>

        {!!task.scheduledTime && (
          <XStack alignItems="center" gap="$2">
            <CalendarClock size={16} color="$gray10" />
            <Text fontSize={12} color="$gray10" fontWeight="700">
              {task.scheduledTime}
            </Text>
          </XStack>
        )}
      </XStack>

      <YStack
        marginTop="$3"
        padding="$3"
        borderRadius={10}
        backgroundColor="$color2"
        borderWidth={1}
        borderColor="$color5"
      >
        <Text fontSize={12} color="$gray10" fontWeight="800">
          Próximo passo
        </Text>
        <Text fontSize={13} fontWeight="800" numberOfLines={2}>
          {task.nextStep}
        </Text>
      </YStack>
      {!!task.checklist.length && (
        <YStack marginTop="$3" gap="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={12} color="$gray10" fontWeight="800">
              Checklist
            </Text>
            <Text fontSize={12} color="$gray10" fontWeight="800">
              {done}/{task.checklist.length} • {pct}%
            </Text>
          </XStack>

          <Progress value={pct} height={8} borderRadius={10} backgroundColor="$color3">
            <Progress.Indicator backgroundColor="$primary400" />
          </Progress>
        </YStack>
      )}
    </Card>
  );
}
