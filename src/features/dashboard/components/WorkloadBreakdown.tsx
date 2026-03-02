import React, { useMemo } from 'react';
import { Card, XStack, YStack, Text, getTokens } from 'tamagui';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';

type Slice = { label: string; value: number };

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export default function WorkloadBreakdown({
  data = [
    { label: 'Estudo', value: 45 },
    { label: 'Trabalho', value: 35 },
    { label: 'Pausas', value: 20 }
  ]
}: {
  data?: Slice[];
}) {
  const prefs = usePreferences();
  const tokens = getTokens();

  const total = useMemo(() => data.reduce((acc, s) => acc + s.value, 0) || 1, [data]);

  const sizes = { w: 220, h: 220, r: 86, stroke: 16 };
  const cx = sizes.w / 2;
  const cy = sizes.h / 2;

  const colors = [
    tokens.color.$primary400.val,
    tokens.color.$primary200.val,
    tokens.color.$gray200.val
  ];

  const arcs = useMemo(() => {
    let cursor = 0;
    return data.map((s, idx) => {
      const frac = clamp01(s.value / total);
      const start = cursor * 360;
      const end = (cursor + frac) * 360;
      cursor += frac;
      return { ...s, start, end, color: colors[idx % colors.length] };
    });
  }, [data, total]);

  return (
    <Card padding="$4" backgroundColor="$color1">
      <YStack gap="$1" marginBottom="$3">
        <Text fontWeight="800">Distribuição da carga</Text>
        <Text opacity={0.7}>Equilíbrio ajuda o foco</Text>
      </YStack>

      <XStack gap="$3" alignItems="center" justifyContent="space-between">
        <YStack gap="$2" flex={1}>
          <Text fontWeight="800">Semana atual</Text>
          <Text opacity={0.7}>Ajuste sua rotina com pausas planejadas.</Text>

          <YStack gap="$1.5" marginTop="$2">
            {arcs.map((s) => (
              <XStack key={s.label} alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" gap="$2">
                  <CircleLegend color={s.color} />
                  <Text fontWeight="700">{s.label}</Text>
                </XStack>
                <Text opacity={0.75}>{Math.round((s.value / total) * 100)}%</Text>
              </XStack>
            ))}
          </YStack>
        </YStack>

        {!prefs.summaryMode && (
          <YStack alignItems="center" justifyContent="center">
            <Svg width={sizes.w} height={sizes.h}>
              <G>
                {/* track */}
                <Circle
                  cx={cx}
                  cy={cy}
                  r={sizes.r}
                  stroke={tokens.color.$gray200.val}
                  strokeWidth={sizes.stroke}
                  fill="none"
                />
                {arcs.map((s) => (
                  <Path
                    key={s.label}
                    d={describeArc(cx, cy, sizes.r, s.start, s.end)}
                    stroke={s.color}
                    strokeWidth={sizes.stroke}
                    strokeLinecap="round"
                    fill="none"
                  />
                ))}
              </G>
            </Svg>
          </YStack>
        )}
      </XStack>
    </Card>
  );
}

function CircleLegend({ color }: { color: string }) {
  return <YStack width={10} height={10} borderRadius={99} backgroundColor={color as any} />;
}
