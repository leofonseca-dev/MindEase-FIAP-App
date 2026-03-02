import React, { Suspense } from 'react';
import { ScrollView, Text, YStack } from 'tamagui';

import { CognitiveContainer } from '@/features/preferences/components/CognitiveContainer';
import { usePreferences } from '@/features/preferences/hooks/usePreferences';
import { useSelector } from '@/store/Store';

const DashboardPreferencesBar = React.lazy(() => import('../components/DashboardPreferencesBar'));

const WorkloadBreakdown = React.lazy(() => import('../components/WorkloadBreakdown'));
const TodayPlan = React.lazy(() => import('../components/TodayPlan'));
const RecentActivity = React.lazy(() => import('../components/RecentActivity'));
const QuickActions = React.lazy(() => import('../components/QuickActions'));
const FocusSession = React.lazy(() => import('../components/FocusSession'));

export function DashboardScreen() {
  const prefs = usePreferences();
  const widgets = useSelector((s) => s.widgets);

  const allow = (widgetKey: keyof typeof widgets) => {
    if (!widgets[widgetKey]) return false;

    if (prefs.focusMode) {
      return widgetKey === 'todayPlan' || widgetKey === 'focusSession';
    }

    if (prefs.complexityLevel === 1) {
      return widgetKey === 'focusSession' || widgetKey === 'quickActions';
    }
    if (prefs.complexityLevel === 2) {
      return widgetKey !== 'workloadBalance';
    }

    return true;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} marginBottom="$12">
      <CognitiveContainer>
        <YStack gap="$4">
          <Suspense
            fallback={<Text>{prefs.summaryMode ? 'Carregando…' : 'Carregando painel…'}</Text>}
          >
            <DashboardPreferencesBar />

            {allow('workloadBalance') && <WorkloadBreakdown />}
            {allow('todayPlan') && <TodayPlan />}
            {allow('recentActivities') && <RecentActivity />}

            {allow('quickActions') && (
              <QuickActions onGoTasks={() => {}} onCreateTask={() => {}} onStartFocus={() => {}} />
            )}

            {allow('focusSession') && <FocusSession dashboard />}
          </Suspense>
        </YStack>
      </CognitiveContainer>
    </ScrollView>
  );
}
