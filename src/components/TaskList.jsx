import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, updateTaskPriority } from '../redux/slices/taskSlice';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  const handlePriorityChange = (id, newPriority) => {
    dispatch(updateTaskPriority({ id, priority: newPriority }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffbb33';
      case 'low': return '#00C851';
      default: return '#333';
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <div 
          key={task.id} 
          className="task-item"
          style={{ borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}
        >
          <div className="task-content">
            <span className="task-text">{task.text}</span>
            <div className="task-controls">
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                className="priority-select-small"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button 
                onClick={() => handleRemoveTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
