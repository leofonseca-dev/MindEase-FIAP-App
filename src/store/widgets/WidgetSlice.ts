import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WidgetState {
  todayPlan: boolean;
  quickActions: boolean;
  focusSession: boolean;
  workloadBalance: boolean;
  recentActivities: boolean;
}

const initialState: WidgetState = {
  todayPlan: true,
  quickActions: true,
  focusSession: true,
  workloadBalance: true,
  recentActivities: true,
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidget(state, action: PayloadAction<keyof WidgetState>) {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
