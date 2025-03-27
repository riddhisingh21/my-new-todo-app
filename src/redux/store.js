import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import weatherReducer from './slices/weatherSlice';
import themeReducer from './slices/themeSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    weather: weatherReducer,
    theme: themeReducer,
  },
});