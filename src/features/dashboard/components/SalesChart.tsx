import { AlertCircle } from '@tamagui/lucide-icons';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
import { YStack, XStack, Text, Button, getTokens, Tooltip as TmTooltip, Card } from 'tamagui';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory-native';

import { useInlineComparatives } from '../hooks/useInlineComparatives';
import { InlineComparative, InsightFilterEnum } from '../repository/InsightRepository';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n ?? 0);

export default function SalesChart({
  height = 350,
  chartHeight = 205
}: {
  height?: number;
  chartHeight?: number;
}) {
  const tokens = getTokens();
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const { data: insights = [], isLoading } = useInlineComparatives();

  const [uncontrolledFilter, setUncontrolledFilter] = useState<string | number | undefined>(
    undefined
  );

  useEffect(() => {
    if (insights.length > 0 && !uncontrolledFilter) {
      setUncontrolledFilter(insights[0].id);
    }
  }, [insights, uncontrolledFilter]);

  const currentFilter = uncontrolledFilter;

  const filtered = useMemo<InlineComparative>(() => {
    const found = insights.find((i) => i.id === currentFilter) ?? insights[0];
    return (
      found ?? {
        id: 'empty',
        title: '—',
        amount: 0,
        compareAmount: 0,
        diff: 0,
        percentage: 0,
        chart: { data: [] }
      }
    );
  }, [insights, currentFilter]);

  const data = useMemo(
    () =>
      (filtered.chart?.data ?? []).map((d) => ({
        x: d.label,
        y: Number(d.value) || 0
      })),
    [filtered]
  );

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  const onPick = (id: InsightFilterEnum) => {
    setUncontrolledFilter(id);
  };

  const trendColor =
    filtered.percentage >= 0 ? tokens.color.$primary400.val : tokens.color.$red500.val;

  const primary = tokens.color.$primary400.val;

  if (isLoading || insights.length === 0) {
    return (
      <Card height={height} padding="$4" backgroundColor="$color1" width="100%">
        <Text>Carregando...</Text>
      </Card>
    );
  }

  return (
    <Card height={height} padding="$4" backgroundColor="$color1" width="100%">
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
        <XStack alignItems="center" gap="$2">
          <XStack>
            <Text fontWeight="700">Lucro Mensal</Text>
          </XStack>
          <TmTooltip placement="top">
            <XStack alignItems="center">
              <AlertCircle size={16} color={tokens.color.$gray500.val} />
            </XStack>
          </TmTooltip>
        </XStack>

        <XStack gap="$1">
          {insights.map((i) => {
            const isActive = uncontrolledFilter === i.id;
            return (
              <Button
                key={String(i.id)}
                size="$1"
                paddingHorizontal="$2"
                backgroundColor={isActive ? '$color3' : 'transparent'}
                color={isActive ? '$primary400' : '$gray8'}
                fontWeight="700"
                onPress={() => onPick(i.id as InsightFilterEnum)}
              >
                {i.title}
              </Button>
            );
          })}
        </XStack>
      </XStack>

      <XStack justifyContent="space-between" alignItems="center" marginVertical="$3" gap="$2">
        <XStack alignItems="center" gap="$2">
          <Text fontSize={18} fontWeight="800" color={tokens.color.$primary400.val}>
            {formatCurrency(filtered.amount)}
          </Text>
          <XStack
            backgroundColor="$primary50"
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius={8}
          >
            <Text fontWeight="700" color={trendColor} fontSize={12}>
              {filtered.percentage >= 0 ? '+' : ''}
              {filtered.percentage.toFixed(2)}%
            </Text>
          </XStack>
          <Text fontWeight="700" color={trendColor}>
            {filtered.diff >= 0 ? '+' : '–'} {formatCurrency(Math.abs(filtered.diff))}
          </Text>
        </XStack>
      </XStack>

      <YStack marginTop="$3" height={chartHeight} onLayout={handleLayout} overflow="hidden">
        {containerWidth > 0 && (
          <Svg width={containerWidth} height={chartHeight}>
            <Defs>
              <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={primary} stopOpacity={0.3} />
                <Stop offset="1" stopColor={primary} stopOpacity={0.05} />
              </LinearGradient>
            </Defs>

            <VictoryChart
              width={containerWidth}
              height={chartHeight}
              padding={{ top: 10, bottom: 40, left: 45, right: 24 }}
              domainPadding={{ x: 18, y: [8, 16] }}
              standalone={false}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) =>
                    `${typeof datum.x === 'string' ? datum.x : ''}\n${formatCurrency(
                      Number(datum.y)
                    )}`
                  }
                  labelComponent={
                    <VictoryTooltip
                      renderInPortal={false}
                      flyoutStyle={{
                        fill: tokens.color.$primary100.val,
                        stroke: tokens.color.$primary200.val
                      }}
                      cornerRadius={6}
                      flyoutPadding={{ top: 8, bottom: 8, left: 10, right: 10 }}
                    />
                  }
                />
              }
            >
              <VictoryAxis
                style={{
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                  tickLabels: { fill: tokens.color.$gray900.val, fontSize: 10 }
                }}
                tickFormat={(t) => (typeof t === 'string' ? t.slice(0, 3) : t)}
              />

              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: 'transparent' },
                  grid: { stroke: tokens.color.$gray300.val, strokeDasharray: '3,3' },
                  tickLabels: { fill: tokens.color.$gray900.val, fontSize: 10 }
                }}
              />

              <VictoryArea
                interpolation="natural"
                animate={false}
                data={data}
                x="x"
                y="y"
                style={{
                  data: { stroke: primary, strokeWidth: 2, fill: 'url(#areaGradient)' }
                }}
              />
            </VictoryChart>
          </Svg>
        )}
      </YStack>
    </Card>
  );
}
