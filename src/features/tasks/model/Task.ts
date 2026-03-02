export type TaskStatus = 'TODO' | 'DOING' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type TaskChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type TaskType = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedMinutes: number;
  nextStep: string;
  scheduledTime?: string;
  checklist: TaskChecklistItem[];
  notes?: string;
  attachment?: File | null;
  createdAt: string;
};
