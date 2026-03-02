import { differenceInMinutes } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { TaskType } from '../model/Task';
import { loadDoingMap } from '../utils/taskCognitiveTimers';

type AlertKind = 'LONG_DOING' | 'TOO_MANY_DOING' | 'SCHEDULE_NOW';

export type CognitiveAlert = {
  id: string;
  kind: AlertKind;
  title: string;
  message: string;
  taskId?: string;
};

export function useCognitiveAlerts(tasks: TaskType[], prefs: any) {
  const [alert, setAlert] = useState<CognitiveAlert | null>(null);

  const doingTasks = useMemo(() => tasks.filter((t) => t.status === 'DOING'), [tasks]);

  useEffect(() => {
    if (prefs.focusMode && alert?.kind === 'TOO_MANY_DOING') return;

    if (doingTasks.length >= 2) {
      setAlert({
        id: 'too-many-doing',
        kind: 'TOO_MANY_DOING',
        title: 'Muita coisa ao mesmo tempo',
        message: `Você tem ${doingTasks.length} tarefas em andamento. Que tal escolher só 1 agora?`
      });
      return;
    }

    const doingMap = loadDoingMap();
    const now = new Date();
    const LONG_MIN = prefs.focusMode ? 15 : 25;

    const tooLong = doingTasks
      .map((t) => ({ t, startedAt: doingMap[t.id] }))
      .find((x) => x.startedAt && differenceInMinutes(now, new Date(x.startedAt)) >= LONG_MIN);

    if (tooLong) {
      setAlert({
        id: `long-doing-${tooLong.t.id}`,
        kind: 'LONG_DOING',
        title: 'Tempo de checar sua energia',
        message: `Você está nessa tarefa há um tempo. Quer fazer uma pausa curta ou iniciar uma sessão de foco?`,
        taskId: tooLong.t.id
      });
      return;
    }

    const SCHEDULE_WINDOW_MIN = 10;
    const [hh, mm] = [now.getHours(), now.getMinutes()];
    const nowMinutes = hh * 60 + mm;

    const scheduled = tasks.find((t) => {
      if (!t.scheduledTime || t.status !== 'TODO') return false;
      const [h, m] = t.scheduledTime.split(':').map(Number);
      const taskMinutes = h * 60 + m;
      return Math.abs(taskMinutes - nowMinutes) <= SCHEDULE_WINDOW_MIN;
    });

    if (scheduled) {
      setAlert({
        id: `schedule-${scheduled.id}`,
        kind: 'SCHEDULE_NOW',
        title: 'Horário da tarefa',
        message: `Está perto de ${scheduled.scheduledTime}. Quer começar agora?`,
        taskId: scheduled.id
      });
      return;
    }

    setAlert(null);
  }, [tasks, doingTasks.length, prefs.focusMode]);

  return { alert, dismiss: () => setAlert(null) };
}
