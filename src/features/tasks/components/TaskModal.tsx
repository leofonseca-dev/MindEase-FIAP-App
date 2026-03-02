import { ChevronDown, Plus, Trash2 } from '@tamagui/lucide-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { XStack, YStack, Text, Button, Form, Input, Label, Separator, Checkbox } from 'tamagui';

import { Modal } from '@/components/Modal/Modal';
import { Select } from '@/components/Select/Select';
import type { TaskType, TaskChecklistItem } from '../model/Task';

type FormValues = {
  title: string;
  status: TaskType['status'];
  priority: TaskType['priority'];
  estimatedMinutes: string; // input
  nextStep: string;
  scheduledTime?: string;
  notes?: string;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function TaskModal({
  open,
  onClose,
  onSaved,
  task
}: {
  open: boolean;
  onClose: () => void;
  onSaved: (t: TaskType) => void;
  task?: TaskType | null;
}) {
  const isEditing = !!task?.id;

  const initial = useMemo<FormValues>(
    () => ({
      title: task?.title ?? '',
      status: task?.status ?? 'TODO',
      priority: task?.priority ?? 'MEDIUM',
      estimatedMinutes: String(task?.estimatedMinutes ?? 25),
      nextStep: task?.nextStep ?? '',
      scheduledTime: task?.scheduledTime ?? '',
      notes: task?.notes ?? ''
    }),
    [task?.id]
  );

  const [checklist, setChecklist] = useState<TaskChecklistItem[]>(task?.checklist ?? []);
  const [newItem, setNewItem] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: initial
  });

  useEffect(() => {
    if (open) {
      reset(initial);
      setChecklist(task?.checklist ?? []);
      setNewItem('');
    }
  }, [open, initial, reset, task?.checklist]);

  const addChecklistItem = () => {
    const label = newItem.trim();
    if (!label) return;
    setChecklist((prev) => [...prev, { id: uid(), label, done: false }]);
    setNewItem('');
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  };

  const removeChecklist = (id: string) => {
    setChecklist((prev) => prev.filter((c) => c.id !== id));
  };

  const submit = (data: FormValues) => {
    const minutes = Math.max(1, Number(data.estimatedMinutes || 0) || 25);

    const payload: TaskType = {
      id: task?.id ?? uid(),
      title: data.title,
      status: data.status,
      priority: data.priority,
      estimatedMinutes: minutes,
      nextStep: data.nextStep,
      scheduledTime: data.scheduledTime?.trim() || undefined,
      checklist,
      notes: data.notes?.trim() || undefined,
      attachment: null,
      createdAt: task?.createdAt ?? new Date().toISOString()
    };

    onSaved(payload);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Form width={380} padding={24} onSubmit={handleSubmit(submit)} gap="$3">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
            <Text fontSize={20} fontWeight="900" color="$primary400">
              {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
            </Text>

            <Form.Trigger asChild disabled={isSubmitting}>
              <Button backgroundColor="$primary200" disabled={isSubmitting} borderRadius={10}>
                <Text fontWeight="900" color="$gray100">
                  {isEditing ? 'Salvar' : 'Criar'}
                </Text>
              </Button>
            </Form.Trigger>
          </XStack>

          <YStack gap="$2">
            <Label>Título</Label>
            <Controller
              control={control}
              name="title"
              rules={{ required: 'Título é obrigatório' }}
              render={({ field }) => (
                <Input {...field} onChangeText={field.onChange} placeholder="Ex: Revisar aula" />
              )}
            />
            {errors.title && (
              <Text color="red" fontSize={12}>
                {String(errors.title.message)}
              </Text>
            )}

            <XStack gap="$2">
              <YStack flex={1}>
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={onChange}
                      placeholder="Status"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={[
                        { label: 'A fazer', value: 'TODO' },
                        { label: 'Em andamento', value: 'DOING' },
                        { label: 'Concluída', value: 'DONE' }
                      ]}
                      disablePreventBodyScroll
                    />
                  )}
                />
              </YStack>

              <YStack flex={1}>
                <Label>Prioridade</Label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={onChange}
                      placeholder="Prioridade"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={[
                        { label: 'Leve', value: 'LOW' },
                        { label: 'Normal', value: 'MEDIUM' },
                        { label: 'Alta', value: 'HIGH' }
                      ]}
                      disablePreventBodyScroll
                    />
                  )}
                />
              </YStack>
            </XStack>

            <XStack gap="$2">
              <YStack flex={1}>
                <Label>Tempo estimado (min)</Label>
                <Controller
                  name="estimatedMinutes"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      keyboardType="number-pad"
                      onChangeText={field.onChange}
                      placeholder="25"
                    />
                  )}
                />
              </YStack>
              <YStack flex={1}>
                <Label>Horário (opcional)</Label>
                <Controller
                  name="scheduledTime"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} onChangeText={field.onChange} placeholder="09:30" />
                  )}
                />
              </YStack>
            </XStack>

            <Label>Próximo passo</Label>
            <Controller
              name="nextStep"
              control={control}
              rules={{ required: 'Próximo passo é obrigatório' }}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  placeholder="Ex: abrir a aula e anotar 3 pontos"
                  multiline
                  numberOfLines={2}
                />
              )}
            />
            {errors.nextStep && (
              <Text color="red" fontSize={12}>
                {String(errors.nextStep.message)}
              </Text>
            )}

            <Label>Notas (opcional)</Label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  placeholder="Opcional"
                  multiline
                  numberOfLines={3}
                />
              )}
            />

            <Separator marginVertical="$2" />

            <YStack gap="$2">
              <Text fontWeight="900">Checklist</Text>

              <XStack gap="$2">
                <Input
                  flex={1}
                  value={newItem}
                  onChangeText={setNewItem}
                  placeholder="Adicionar item..."
                />
                <Button icon={<Plus />} onPress={addChecklistItem} />
              </XStack>

              {checklist.map((c) => (
                <XStack
                  key={c.id}
                  alignItems="center"
                  justifyContent="space-between"
                  padding="$3"
                  borderWidth={1}
                  borderColor="$color5"
                  backgroundColor="$color1"
                  borderRadius={10}
                  gap="$2"
                >
                  <XStack alignItems="center" gap="$2" flex={1}>
                    <Checkbox checked={c.done} onCheckedChange={() => toggleChecklist(c.id)} />
                    <Text flex={1} fontWeight="800" color={c.done ? '$gray10' : '$gray12'}>
                      {c.label}
                    </Text>
                  </XStack>

                  <Button
                    icon={<Trash2 size={16} />}
                    size={32}
                    circular
                    onPress={() => removeChecklist(c.id)}
                  />
                </XStack>
              ))}

              {!checklist.length && <Text color="$gray10">Sem checklist — opcional.</Text>}
            </YStack>
          </YStack>
        </Form>
      </KeyboardAvoidingView>
    </Modal>
  );
}
