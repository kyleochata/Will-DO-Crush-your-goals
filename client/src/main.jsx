import React from 'react';
import ReactDOM from 'react-dom/client';
import { createbrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Error from './pages/Error.jsx';
import Goals from './pages/Goals.jsx';
import Tasks from './pages/Tasks.jsx';
import Calendar from './components/calendar/calendar.jsx';
import OneGoal from './pages/OneGoal.jsx';
import OneTask from './pages/OneTask.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';

const router = createbrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/goals',
        element: <Goals />,
      }, {
        path: '/goals/:goalId',
        element: <OneGoal />,
      }, {
        path: '/tasks',
        element: <Tasks />,
      }, {
        path: '/tasks/:taskId',
        element: <OneTask />,
      }, {
        path: '/calendar',
        element: <Calendar />,
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
