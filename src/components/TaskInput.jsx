import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/taskSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({
        id: Date.now(),
        text: task,
        priority: priority,
        createdAt: new Date().toISOString()
      }));
      setTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter a task"
        className="task-input-field"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <button onClick={handleAddTask} className="add-button">Add Task</button>
    </div>
  );
};

export default TaskInput;
