import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { taskSchema, type TaskSchemaType } from '../schemas/taskSchema';
import type { Task } from '../types';
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onUpdateTask?: (task: Task) => void;
  taskToEdit?: Task | null;
  onCancelEdit?: () => void;
}

function TaskForm({ 
  onAddTask, 
  onUpdateTask,
  taskToEdit,
  onCancelEdit 
}: TaskFormProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const isEditing = !!taskToEdit;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium'
    }
  });

  useEffect(() => {
    if (taskToEdit) {
      setIsFormVisible(true);
      reset({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority
      });
    } else if (!isFormVisible) {
      reset({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium'
      });
    }
  }, [taskToEdit, reset, isFormVisible]);

  const onSubmit = (data: TaskSchemaType) => {
    if (isEditing && taskToEdit && onUpdateTask) {
      onUpdateTask({
        ...taskToEdit,
        title: data.title,
        description: data.description || '',
        status: data.status,
        priority: data.priority
      });
      onCancelEdit?.();
      setIsFormVisible(false);
    } else {
      const newTask: Task = {
        ...data,
        description: data.description || '',
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      onAddTask(newTask);
      setIsFormVisible(false);
    }
    reset({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium'
    });
  };

  const handleCancel = () => {
    reset({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium'
    });
    
    if (isEditing) {
      onCancelEdit?.();
    }
    setIsFormVisible(false);
  };

  if (!isFormVisible && !isEditing) {
    return (
      <div className="task-form-container">
        <button
          className="btn-add-task"
          onClick={() => {
            if (taskToEdit) {
              onCancelEdit?.();
            }
            reset({
              title: '',
              description: '',
              status: 'todo',
              priority: 'medium'
            });
            setIsFormVisible(true);
          }}
        >
          + Nouvelle Tâche
        </button>
      </div>
    );
  }

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>{isEditing ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}</h3>
        
        <div className="form-group">
          <label htmlFor="title">Titre *</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            placeholder="Entrez le titre de la tâche"
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Décrivez la tâche..."
            rows={3}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              {...register('status')}
              className={errors.status ? 'input-error' : ''}
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
            {errors.status && (
              <span className="error-message">{errors.status.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priorité</label>
            <select
              id="priority"
              {...register('priority')}
              className={errors.priority ? 'input-error' : ''}
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
            {errors.priority && (
              <span className="error-message">{errors.priority.message}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isEditing ? 'Enregistrer' : 'Ajouter la tâche'}
          </button>
          <button 
            type="button" 
            className="btn-cancel"
            onClick={handleCancel}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;