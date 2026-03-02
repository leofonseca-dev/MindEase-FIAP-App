import { useEffect, useMemo, useState } from 'react';
import { Card, XStack, YStack, Text, Button } from 'tamagui';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';

const pad = (n: number) => String(n).padStart(2, '0');

export default function FocusSession({ dashboard = false }: { dashboard?: boolean }) {
  const prefs = usePreferences();

  const focusMinutes = prefs.focusMode ? 15 : 25;
  const breakMinutes = 5;

  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);

  const timeLabel = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${pad(m)}:${pad(s)}`;
  }, [secondsLeft]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running) return;
    setSecondsLeft((mode === 'FOCUS' ? focusMinutes : breakMinutes) * 60);
  }, [focusMinutes, breakMinutes, mode, running]);

  const reset = () => {
    setRunning(false);
    setMode('FOCUS');
    setSecondsLeft(focusMinutes * 60);
  };

  return (
    <Card padding="$4" backgroundColor="$color1">
      {dashboard && (
        <YStack gap="$1" marginBottom="$3">
          <Text fontWeight="800">Sessão de foco</Text>
          <Text opacity={0.7}>
            {prefs.focusMode ? 'Modo foco ativo: sessões mais curtas' : 'Ritmo guiado com pausas'}
          </Text>
        </YStack>
      )}

      <YStack gap="$3">
        <YStack>
          <Text opacity={0.7}>{mode === 'FOCUS' ? 'Foco' : 'Pausa'}</Text>
          <Text fontSize={34} fontWeight="900">
            {prefs.hideSensitiveValues ? '••:••' : timeLabel}
          </Text>
          <Text opacity={0.7}>
            Próxima ação: {mode === 'FOCUS' ? 'trabalhar em 1 tarefa' : 'respirar/alongar e voltar'}
          </Text>
        </YStack>

        <XStack gap="$2" flexWrap="wrap">
          <Button
            backgroundColor="white"
            borderWidth={0.2}
            borderColor="$gray500"
            onPress={() => setRunning((v) => !v)}
          >
            {running ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button onPress={reset} backgroundColor="white" borderWidth={0.2} borderColor="$gray500">
            Reiniciar
          </Button>
        </XStack>

        {prefs.summaryMode && (
          <Text opacity={0.7}>
            No modo resumo, mostramos só o essencial para reduzir sobrecarga.
          </Text>
        )}
      </YStack>
    </Card>
  );
}
