import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskDashboard from './pages/task_dashboard/task_dashboard';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';

//import { AuthProvider, RequireAuth } from './contexts/AuthContext';


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<TaskDashboard />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/profile" element={<Profile />}>
        </Route>
      </Routes>
  );
};

export default App;