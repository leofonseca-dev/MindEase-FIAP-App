import React, { Suspense } from 'react';
import { ScrollView, Text, YStack } from 'tamagui';
import { CognitiveContainer } from '@/features/preferences/components/CognitiveContainer';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';

const WorkloadBreakdown = React.lazy(() => import('../components/WorkloadBreakdown'));
const TodayPlan = React.lazy(() => import('../components/TodayPlan'));
const RecentActivity = React.lazy(() => import('../components/RecentActivity'));
const QuickActions = React.lazy(() => import('../components/QuickActions'));
const FocusSession = React.lazy(() => import('../components/FocusSession'));

export function DashboardScreen() {
  const prefs = usePreferences();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} marginBottom="$12">
      <CognitiveContainer>
        <YStack gap="$4">
          <Suspense
            fallback={<Text>{prefs.summaryMode ? 'Carregando…' : 'Carregando painel…'}</Text>}
          >
            {!prefs.focusMode && <WorkloadBreakdown />}
            <TodayPlan />
            {!prefs.focusMode && <RecentActivity />}
            <QuickActions onGoTasks={() => {}} onCreateTask={() => {}} onStartFocus={() => {}} />
            <FocusSession dashboard />
          </Suspense>
        </YStack>
      </CognitiveContainer>
    </ScrollView>
  );
}
