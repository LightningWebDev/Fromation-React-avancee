import { useState, useCallback, useMemo, memo } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addTask, deleteTask, updateTask } from '../store/slices/tasksSlice';
import type { Task } from '../types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskDetailsModal from './TaskDetailsModal';
import { useModal } from '../hooks';
import './TaskList.css';
import { useTranslation } from "react-i18next";

const TaskList = memo(function TaskList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.items);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const { isOpen, open, close } = useModal();

  const handleAddTask = useCallback((task: Task) => {
    dispatch(addTask(task));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id: string) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const handleViewDetails = useCallback((task: Task) => {
    setSelectedTask(task);
    open();
  }, [open]);

  const handleCloseModal = useCallback(() => {
    close();
    setSelectedTask(null);
  }, [close]);

  const handleEditTask = useCallback((task: Task) => {
    setTaskToEdit(task);
  }, [dispatch]);

  const handleUpdateTask = useCallback((task: Task) => {
    dispatch(updateTask(task));
    setTaskToEdit(null);
  }, [dispatch]);

  const handleCancelEdit = useCallback(() => {
    setTaskToEdit(null);
  }, []);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length
    };
  }, [tasks]);

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Mes Tâches</h2>
        <span className="task-count">{t("tasks.count", { count: stats.total})}</span>
      </div>

      <div className="task-stats">
        <div className="stat-item stat-todo">
          <span className="stat-value">{stats.todo}</span>
          <span className="stat-label">À faire</span>
        </div>
        <div className="stat-item stat-progress">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">En cours</span>
        </div>
        <div className="stat-item stat-done">
          <span className="stat-value">{stats.done}</span>
          <span className="stat-label">Terminé</span>
        </div>
      </div>

      <TaskForm 
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        taskToEdit={taskToEdit}
        onCancelEdit={handleCancelEdit}
      />

      {tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📝</span>
          <p>Aucune tâche pour le moment</p>
          <p className="empty-hint">Cliquez sur "Nouvelle Tâche" pour commencer</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={handleDeleteTask}
              onViewDetails={handleViewDetails}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      <TaskDetailsModal
        task={selectedTask}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
})

export default TaskList;
