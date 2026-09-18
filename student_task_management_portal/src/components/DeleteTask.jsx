function deleteTask(taskId, setTasks) {
  fetch(`http://localhost:5050/api/tasks/${taskId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        console.log('Task deleted successfully');
        setTasks((currentTasks) =>
          currentTasks.filter((task) => task.id !== taskId)
        );
      } else {
        console.error('Failed to delete task');
      }
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    });
}

export default deleteTask;