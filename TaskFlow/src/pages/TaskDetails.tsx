import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import './TaskDetails.css';

function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  
  const navigate = useNavigate();
  
  // Get task from Redux store
  const task = useAppSelector(state => 
    state.tasks.items.find(t => t.id === id)
  );

  if (!task ) {
    return (
      <div className="task-details-container">
        <div className="task-not-found">
          <span className="not-found-icon">🔍</span>
          <h2>Tâche non trouvée</h2>
          <p>La tâche que vous recherchez n'existe pas.</p>
          <button className="btn-back" onClick={() => navigate('/')}>
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-details-container">
      <button className="btn-back" onClick={() => navigate('/')}>
        ← Retour à l'accueil
      </button>

      <div className="task-details-card">
        <div className="task-details-header">
          <h1 className="task-details-title">{task.title}</h1>
          <span className={`task-status status-${task.status}`}>
            {task.status}
          </span>
        </div>

        <div className="task-details-meta">
          <span className={`task-priority priority-badge-${task.priority}`}>
            Priorité: {task.priority}
          </span>
          <span className="task-date">
            Créée le: {new Date(task.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>

        <div className="task-details-description">
          <h3>Description</h3>
          <p>{task.description || 'Aucune description fournie.'}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
