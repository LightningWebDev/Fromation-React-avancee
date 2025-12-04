import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskStatus } from '../../types';


export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Comprendre le Virtual DOM',
    description: 'Réviser les concepts de réconciliation et de diffing algorithm de React',
    status: 'done',
    priority: 'high',
    createdAt: '2025-01-10'
  },
  {
    id: '2',
    title: 'Maîtriser JSX',
    description: 'Comprendre JSX en détail, les pièges à éviter et les bonnes pratiques',
    status: 'done',
    priority: 'medium',
    createdAt: '2025-01-11'
  },
  {
    id: '3',
    title: 'Gestion des événements',
    description: 'Event handling, autobinding et délégation dans React',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2025-01-15'
  }
]

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: initialTasks,
  loading: false,
  error: null
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.items.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  }
});

export const { addTask, deleteTask, updateTaskStatus, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;