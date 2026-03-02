import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { mockTasks } from '@/features/tasks/components/MockTasks';
import { TaskType } from '@/features/tasks/model/Task';

type TasksState = {
  list: TaskType[];
  editing: TaskType | null;
};

const initialState: TasksState = {
  list: mockTasks,
  editing: null
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskType>) {
      state.list.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    setEditingTask(state, action: PayloadAction<TaskType | null>) {
      state.editing = action.payload;
    },
    editTask(state, action: PayloadAction<{ id: string; data: Partial<TaskType> }>) {
      const idx = state.list.findIndex((t) => t.id === action.payload.id);
      if (idx >= 0) {
        state.list[idx] = { ...state.list[idx], ...action.payload.data };
      }
    }
  }
});

export const { addTask, deleteTask, editTask, setEditingTask } = tasksSlice.actions;
export default tasksSlice.reducer;
