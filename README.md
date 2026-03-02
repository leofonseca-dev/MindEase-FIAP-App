# 🧠 MindEase — Expo + Tamagui  
**App de tarefas com foco em acessibilidade cognitiva (mock-first, modular e escalável)**

O MindEase é um app mobile pensado para **reduzir sobrecarga**, aumentar **previsibilidade** e manter **próxima ação clara** — com suporte a **Modo Foco**, **Modo Resumo** e personalizações de leitura/contraste.

> Nesta fase, o app está **mock-first** (sem backend): tudo roda localmente para acelerar UI/UX e fluxo de produto.  
> Depois você pluga persistência (AsyncStorage/SQLite) ou backend (Firebase/Supabase/REST) sem precisar reescrever telas.

---

## ✨ Principais Features

### ✅ Tarefas (Tasks)
- Lista de tarefas com **status**: `TODO | DOING | DONE`
- **Prioridade**: `LOW | MEDIUM | HIGH`
- **Tempo estimado**, **próximo passo** e **horário opcional**
- **Checklist** por tarefa + progresso visual
- Criar / editar tarefa via modal (mock)

### 🧭 Dashboard (rotina e previsibilidade)
- Cards: **Distribuição da carga**, **Plano de hoje**, **Atividade recente**, **Ações rápidas**, **Sessão de foco**
- Componentes pesados com **React.lazy + Suspense** (melhor perf)

### 🎯 Acessibilidade Cognitiva
- **Modo Foco**: reduz estímulos e prioriza o essencial
- **Modo Resumo**: menos conteúdo, mais clareza
- Preferências: reduzir animações, esconder valores sensíveis, escala de fonte/espaçamento, contraste etc.

---

## 🧱 Arquitetura (modular e pronta pra crescer)

Estrutura orientada a features:

```
src/
  app/                  → rotas (expo-router)
  features/
    dashboard/          → cards e tela do dashboard
    tasks/              → model, mocks, hooks, components, screens
    preferences/        → preferências e CognitiveContainer
  shared/               → hooks e utilitários compartilhados
  store/                → slices do Redux (preferences, tasks, widgets, user...)
  components/           → componentes reutilizáveis (Modal, Select, etc)
  infra/                → (opcional) serviços futuros (api, storage, etc)
```

---

## 🛠 Tecnologias

- **Expo + React Native**
- **Expo Router**
- **Tamagui** (UI)
- **Redux Toolkit** (estado global: preferences, widgets, tasks, user…)
- **React Query** (opcional: para futuro backend / caching)
- **TypeScript**

---

## ✅ Setup

### 1) Instalar dependências
```bash
yarn
```

### 2) Rodar no Expo
```bash
npx expo start
```

> Se algo “estranho” acontecer com cache:
```bash
npx expo start -c
```

---

## 🧪 Scripts úteis

Exemplo (ajuste conforme seu `package.json`):
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "clean": "expo start -c"
  }
}
```

---

## 🧩 Estado global (Redux)

O app usa slices para controlar:
- `preferences` → modo foco, resumo, escala, contraste, etc.
- `widgets` → habilitar/desabilitar cards do dashboard
- `tasks` → lista e edição (mock-first)
- `user` → perfil (mock/local)
- `customizer` / `userpostsReducer` → legado ou módulos auxiliares

---

## 🧊 Mock-first (como funciona)

Nesta fase:
- `features/tasks/mocks/mockTasks.ts` contém os dados iniciais
- `features/tasks/hooks/useMockTasks.ts` implementa:
  - filtros
  - paginação fake
  - refresh fake
  - upsert (create/edit)

Quando você for plugar backend depois:
- troca o hook por um `useTasks()` real com React Query
- mantém **TaskCard/TaskModal/TasksScreen** praticamente iguais

---

## 🧠 Convenções de UX (cognitivo-friendly)
- Cada tarefa deve ter **Próximo passo** (texto curto e direto)
- Preferir títulos curtos e checklists pequenos (2–5 itens)
- No modo foco: mostrar menos cards e menos detalhes
- Evitar “telas vazias” sem orientação: sempre sugerir a próxima ação

---

## 📄 Licença

MIT
