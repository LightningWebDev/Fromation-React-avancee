import type { Task } from '../types';
import Modal from './Modal';
import './TaskDetailsModal.css';

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

function TaskDetailsModal({ task, isOpen, onClose }: TaskDetailsModalProps) {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails de la tâche">
      <div className="task-modal-content">
        <div className="task-modal-header">
          <h3 className="task-modal-title">{task.title}</h3>
          <span className={`task-modal-status status-${task.status}`}>
            {task.status === 'todo' && 'À faire'}
            {task.status === 'in-progress' && 'En cours'}
            {task.status === 'done' && 'Terminé'}
          </span>
        </div>

        <div className="task-modal-meta">
          <div className="meta-item">
            <span className="meta-label">Priorité</span>
            <span className={`meta-value priority-${task.priority}`}>
              {task.priority === 'low' && '🟢 Basse'}
              {task.priority === 'medium' && '🟡 Moyenne'}
              {task.priority === 'high' && '🔴 Haute'}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date de création</span>
            <span className="meta-value">
              {new Date(task.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        <div className="task-modal-description">
          <h4>Description</h4>
          <p>{task.description || 'Aucune description fournie.'}</p>
        </div>

        <div className="task-modal-id">
          <span>ID: {task.id}</span>
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailsModal;
