import TaskList from '../components/TaskList';

function Home() {
  // No props needed! TaskList gets data from Redux
  return (
    <main>
      <TaskList />
    </main>
  );
}

export default Home;
