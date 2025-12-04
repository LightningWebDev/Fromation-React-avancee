import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TaskCard from '../TaskCard';
import type { Task } from '../../types';

const mockTask: Task = {
  id: '1',
  title: 'Apprendre React',
  description: 'Comprendre les hooks et le state',
  status: 'in-progress',
  priority: 'high',
  createdAt: '2025-01-15'
};

// Helper pour wrapper avec Router (nécessaire car TaskCard utilise useNavigate)
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('TaskCard', () => {
  test('affiche le titre de la tâche', () => {
    renderWithRouter(<TaskCard task={mockTask} onDelete={jest.fn()} />);

    expect(screen.getByText('Apprendre React')).toBeInTheDocument();
  });

  test('affiche la description de la tâche', () => {
    renderWithRouter(<TaskCard task={mockTask} onDelete={jest.fn()} />);

    expect(screen.getByText('Comprendre les hooks et le state')).toBeInTheDocument();
  });

  test('affiche le statut et la priorité', () => {
    renderWithRouter(<TaskCard task={mockTask} onDelete={jest.fn()} />);

    expect(screen.getByText('in-progress')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  test('appelle onDelete avec le bon id au clic sur Supprimer', async () => {
    const mockDelete = jest.fn();
    const user = userEvent.setup();
    renderWithRouter(<TaskCard task={mockTask} onDelete={mockDelete} />);

    await user.click(screen.getByRole('button', { name: /supprimer/i }));

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  test('affiche le bouton Voir détails', () => {
    renderWithRouter(<TaskCard task={mockTask} onDelete={jest.fn()} />);
    expect(screen.getByRole('button', { name: /voir détails/i })).toBeInTheDocument();
  });
});
