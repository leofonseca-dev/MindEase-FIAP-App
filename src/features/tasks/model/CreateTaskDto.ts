import { TaskStatus } from './Task';

export type CreateTaskDto = {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  attachmentUrl?: string;
};
