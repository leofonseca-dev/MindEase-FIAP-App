import { useCallback, useMemo, useState } from 'react';

import { mockTasks } from '../components/MockTasks';
import { TaskType, TaskStatus, TaskPriority } from '../model/Task';

export type TaskFilters = {
  q?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
};

const normalize = (s: string) => s.trim().toLowerCase();

export function useMockTasks(filters?: TaskFilters) {
  const [list, setList] = useState<TaskType[]>(mockTasks);
  const [isRefetching, setIsRefetching] = useState(false);

  // paginação fake
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const filteredAll = useMemo(() => {
    const q = filters?.q ? normalize(filters.q) : '';
    return list
      .filter((t) => {
        if (filters?.status && t.status !== filters.status) return false;
        if (filters?.priority && t.priority !== filters.priority) return false;
        if (!q) return true;

        const hay = `${t.title} ${t.nextStep} ${t.notes ?? ''}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [list, filters?.q, filters?.priority, filters?.status]);

  const items = useMemo(() => filteredAll.slice(0, page * pageSize), [filteredAll, page]);
  const hasNextPage = items.length < filteredAll.length;

  const fetchNextPage = useCallback(() => {
    if (!hasNextPage) return;
    setPage((p) => p + 1);
  }, [hasNextPage]);

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await new Promise((r) => setTimeout(r, 350));
    setIsRefetching(false);
  }, []);

  const upsert = useCallback((task: TaskType) => {
    setList((prev) => {
      const idx = prev.findIndex((t) => t.id === task.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = task;
        return copy;
      }
      return [task, ...prev];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setList((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const resetPaging = useCallback(() => setPage(1), []);

  return {
    items,
    isLoading: false,
    isFetchingNextPage: false,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    upsert,
    remove,
    resetPaging
  };
}
