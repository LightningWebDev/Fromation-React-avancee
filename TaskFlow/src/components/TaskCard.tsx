import type { Task } from '../types';
import { memo } from "react";
import './TaskCard.css';
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onViewDetails: (task: Task) => void;
  onEdit : (task: Task) => void;
}

const TaskCard = memo(
  function TaskCard({ task, onDelete, onViewDetails, onEdit }: TaskCardProps) {
    const { t } = useTranslation();

    console.log("Render TaskCard:", task.title);
    return (
      <div className={`task-card priority-${task.priority}`}>
        <div className="task-card-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`task-status status-${task.status}`}>
            {t(`status.${task.status}`)}
          </span>
        </div>

        <p className="task-description">{task.description}</p>

        <div className="task-meta">
          <span className={`task-priority priority-badge-${task.priority}`}>
            {t(`priority.${task.priority}`)}
          </span>
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString("fr-FR")}
          </span>
        </div>

        <div className="task-actions">
          <button className="btn-details" onClick={() => onViewDetails(task)}>
            Voir détails
          </button>
          <button className="btn-edit" onClick={() => onEdit(task)}>
            Modifier
          </button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>
            Supprimer
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.task.id === nextProps.task.id &&
      prevProps.task.title === nextProps.task.title &&
      prevProps.task.status === nextProps.task.status &&
      prevProps.task.priority === nextProps.task.priority
    );
  }
);

export default TaskCard;
