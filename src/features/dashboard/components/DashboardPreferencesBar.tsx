import React from 'react';
import { ChevronDown, SlidersHorizontal } from '@tamagui/lucide-icons';
import {
  Accordion,
  Button,
  Card,
  Paragraph,
  Separator,
  Switch,
  Text,
  XStack,
  YStack
} from 'tamagui';

import { Select } from '@/components/Select/Select';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';

import type {
  ComplexityLevel,
  ContrastMode,
  FontScale,
  SpacingScale
} from '@/store/preferences/PreferencesSlice';
import { usePreferencesActions } from '../hooks/usePreferencesActions';

type Option<T extends string | number> = { label: string; value: T };

const complexityOptions: Option<ComplexityLevel>[] = [
  { label: 'Nível 1 — Simples', value: 1 },
  { label: 'Nível 2 — Padrão', value: 2 },
  { label: 'Nível 3 — Detalhado', value: 3 }
];

const contrastOptions: Option<ContrastMode>[] = [
  { label: 'Normal', value: 'NORMAL' },
  { label: 'Alto contraste', value: 'HIGH' }
];

const spacingOptions: Option<SpacingScale>[] = [
  { label: 'Compacto', value: 1 },
  { label: 'Padrão', value: 2 },
  { label: 'Confortável', value: 3 }
];

const fontOptions: Option<FontScale>[] = [
  { label: 'Menor', value: 1 },
  { label: 'Padrão', value: 2 },
  { label: 'Maior', value: 3 }
];

export default function DashboardPreferencesBar() {
  const prefs = usePreferences();
  const a = usePreferencesActions();

  return (
    <Card
      padding="$4"
      backgroundColor="$color1"
      borderRadius={12}
      borderWidth={1}
      borderColor="$color5"
    >
      <XStack alignItems="center" justifyContent="space-between" gap="$3" marginBottom="$3">
        <YStack flex={1} gap="$1">
          <Text fontWeight="900" fontSize={16}>
            Painel Cognitivo
          </Text>
          <Text opacity={0.7}>Ajuste complexidade, foco e estímulos visuais.</Text>
        </YStack>

        <XStack
          alignItems="center"
          gap="$2"
          paddingHorizontal="$2.5"
          paddingVertical="$2"
          borderRadius={8}
          borderWidth={1}
          borderColor="$color5"
          backgroundColor="$color2"
        >
          <Text fontWeight="800">Modo foco</Text>
          <Switch
            checked={prefs.focusMode}
            onCheckedChange={a.toggleFocusMode}
            aria-label="Ativar modo foco"
            width={46}
            height={28}
            borderRadius={999}
            backgroundColor={prefs.focusMode ? '$primary400' : '$color5'}
            borderWidth={1}
            borderColor="$color6"
            padding="$0.5"
          >
            <Switch.Thumb
              width={30}
              height={30}
              borderRadius={999}
              backgroundColor="$color1"
              animation="quick"
            />
          </Switch>
        </XStack>
      </XStack>

      <YStack gap="$2" marginBottom="$3">
        <Text fontWeight="800" opacity={0.8}>
          Complexidade
        </Text>

        <Select
          value={String(prefs.complexityLevel)}
          onValueChange={(v) => a.setComplexityLevel(Number(v) as ComplexityLevel)}
          placeholder="Selecione"
          variant="outlined"
          iconAfter={ChevronDown as any}
          options={complexityOptions.map((o) => ({ label: o.label, value: String(o.value) }))}
          disablePreventBodyScroll
        />
      </YStack>

      <Accordion type="single" collapsible overflow="hidden">
        <Accordion.Item value="a1">
          <Accordion.Trigger
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderRadius={8}
            borderWidth={1}
            borderColor="$color5"
            padding="$3"
            backgroundColor="$color2"
          >
            <XStack alignItems="center" gap="$2">
              <SlidersHorizontal size={18} color="$primary400" />
              <YStack>
                <Paragraph fontWeight="800" color="$primary400">
                  Ajustes visuais e privacidade
                </Paragraph>
                <Paragraph opacity={0.7} size="$2">
                  Contraste, espaçamento, resumo, animações e valores.
                </Paragraph>
              </YStack>
            </XStack>

            <ChevronDown color="$primary400" />
          </Accordion.Trigger>

          <Accordion.HeightAnimator>
            <Accordion.Content gap="$3" paddingTop="$3">
              <YStack gap="$3">
                <YStack gap="$2">
                  <Text fontWeight="800" opacity={0.8}>
                    Contraste
                  </Text>
                  <Select
                    value={prefs.contrastMode}
                    onValueChange={(v) => a.setContrastMode(v as ContrastMode)}
                    placeholder="Contraste"
                    variant="outlined"
                    iconAfter={ChevronDown as any}
                    options={contrastOptions}
                    disablePreventBodyScroll
                  />
                </YStack>

                <XStack gap="$2">
                  <YStack flex={1} gap="$2">
                    <Text fontWeight="800" opacity={0.8}>
                      Espaçamento
                    </Text>
                    <Select
                      value={String(prefs.spacingScale)}
                      onValueChange={(v) => a.setSpacingScale(Number(v) as SpacingScale)}
                      placeholder="Espaçamento"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={spacingOptions.map((o) => ({
                        label: o.label,
                        value: String(o.value)
                      }))}
                      disablePreventBodyScroll
                    />
                  </YStack>

                  <YStack flex={1} gap="$2">
                    <Text fontWeight="800" opacity={0.8}>
                      Fonte
                    </Text>
                    <Select
                      value={String(prefs.fontScale)}
                      onValueChange={(v) => a.setFontScale(Number(v) as FontScale)}
                      placeholder="Fonte"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={fontOptions.map((o) => ({ label: o.label, value: String(o.value) }))}
                      disablePreventBodyScroll
                    />
                  </YStack>
                </XStack>

                <Separator />

                <ToggleRow
                  label="Resumo"
                  desc="Mostra só o essencial."
                  checked={prefs.summaryMode}
                  onToggle={a.toggleSummaryMode}
                />
                <ToggleRow
                  label="Reduzir animações"
                  desc="Menos movimento na interface."
                  checked={prefs.reduceMotion}
                  onToggle={a.toggleReduceMotion}
                />
                <ToggleRow
                  label="Ocultar valores"
                  desc="Ajuda em ansiedade/privacidade."
                  checked={prefs.hideSensitiveValues}
                  onToggle={a.toggleHideSensitiveValues}
                />

                {!prefs.focusMode && (
                  <Button variant="outlined" onPress={a.toggleFocusMode} alignSelf="flex-start">
                    Ativar modo foco
                  </Button>
                )}
              </YStack>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onToggle
}: {
  label: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      gap="$3"
      padding="$3"
      borderRadius={8}
      borderWidth={1}
      borderColor="$color5"
      backgroundColor="$color2"
    >
      <YStack flex={1} gap="$1">
        <Text fontWeight="900">{label}</Text>
        <Text opacity={0.7} fontSize={12}>
          {desc}
        </Text>
      </YStack>

      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        aria-label={label}
        width={46}
        height={28}
        borderRadius={999}
        backgroundColor={checked ? '$primary400' : '$color5'}
        borderWidth={1}
        borderColor="$color6"
        padding="$0.5"
      >
        <Switch.Thumb
          width={30}
          height={30}
          borderRadius={999}
          backgroundColor="$color1"
          animation="quick"
        />
      </Switch>
    </XStack>
  );
}
