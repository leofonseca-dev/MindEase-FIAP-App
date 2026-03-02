import { TaskType } from '../model/Task';

export const mockTasks: TaskType[] = [
  {
    id: '1',
    title: 'Revisar aula (20 min)',
    status: 'TODO',
    priority: 'MEDIUM',
    estimatedMinutes: 20,
    nextStep: 'Abrir o PDF e ler 1 página',
    scheduledTime: '08:30',
    checklist: [
      { id: '1-1', label: 'Abrir material', done: false },
      { id: '1-2', label: 'Ler 1 página', done: false },
      { id: '1-3', label: 'Anotar 3 pontos', done: false }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: '2',
    title: 'Entregar atividade (1h)',
    status: 'DOING',
    priority: 'HIGH',
    estimatedMinutes: 60,
    nextStep: 'Completar a parte 1 e salvar',
    scheduledTime: '10:00',
    checklist: [
      { id: '2-1', label: 'Fazer parte 1', done: true },
      { id: '2-2', label: 'Fazer parte 2', done: false },
      { id: '2-3', label: 'Revisar e enviar', done: false }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
  },
  {
    id: '3',
    title: 'Pausa guiada (5 min)',
    status: 'DONE',
    priority: 'LOW',
    estimatedMinutes: 5,
    nextStep: 'Respirar e voltar para a tarefa',
    checklist: [{ id: '3-1', label: 'Pausar', done: true }],
    createdAt: new Date().toISOString()
  }
];
