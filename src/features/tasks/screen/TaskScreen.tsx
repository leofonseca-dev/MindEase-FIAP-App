import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { YStack, Text, View, getTokens, Button, XStack } from 'tamagui';

import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { TaskType } from '../model/Task';
import { useMockTasks, TaskFilters } from '../hooks/useMockTasks';

export function TasksScreen() {
  const tokens = getTokens();
  const { open, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState<TaskFilters | undefined>(undefined);

  const { items, fetchNextPage, hasNextPage, refetch, isRefetching, upsert, resetPaging } =
    useMockTasks(filters);

  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  function handleEditTask(task: TaskType) {
    setSelectedTask(task);
    onOpen();
  }

  return (
    <YStack
      flex={1}
      paddingHorizontal="$4"
      paddingTop="$3"
      paddingBottom="$5"
      backgroundColor={tokens.color.$background}
    >
      <View flex={1} gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <YStack gap={2}>
            <Text fontSize={22} fontWeight="900" color="$gray800">
              Tarefas
            </Text>
            <Text fontSize={13} color="$gray10">
              Próxima ação clara, sem bagunça.
            </Text>
          </YStack>

          <Button backgroundColor="$primary200" onPress={onOpen} borderRadius={10}>
            <Text fontWeight="900" color="$gray100">
              Adicionar
            </Text>
          </Button>
        </XStack>

        {/* <TasksFilters
          onChange={(f) => {
            setFilters(f);
            resetPaging();
          }}
        /> */}

        {!items.length ? (
          <YStack
            padding="$4"
            borderRadius={10}
            backgroundColor="$color1"
            borderWidth={1}
            borderColor="$color5"
            gap="$2"
          >
            <Text fontWeight="900">Nada por aqui</Text>
            <Text color="$gray10">Crie uma tarefa pequena e comece pelo próximo passo.</Text>
            <Button onPress={onOpen} backgroundColor="$primary200">
              <Text color="$gray100" fontWeight="900">
                Criar tarefa
              </Text>
            </Button>
          </YStack>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskCard task={item} onEdit={() => handleEditTask(item)} />}
            onEndReachedThreshold={0.6}
            onEndReached={() => hasNextPage && fetchNextPage()}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginBottom: 60, backgroundColor: tokens.color.$gray100.val }}
          />
        )}
      </View>

      <TaskModal
        open={open}
        onClose={() => {
          setSelectedTask(null);
          onClose();
        }}
        task={selectedTask}
        onSaved={(t) => {
          upsert(t);
          onClose();
          setSelectedTask(null);
        }}
      />
    </YStack>
  );
}
