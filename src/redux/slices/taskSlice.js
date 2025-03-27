import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.priority = priority;
      }
    }
  },
});

export const { setTasks, addTask, removeTask, updateTaskPriority } = taskSlice.actions;

export default taskSlice.reducer;
