import React from 'react';
import ReactDOM from 'react-dom/client';
import { createbrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ErrorPage from './pages/Error/Error.jsx';
import Goals from './pages/Goals/All-Goals.jsx';
import Tasks from './pages/Tasks/Tasks.jsx';
import DemoApp from './components/calendar/calendar.jsx';
import OneGoal from './pages/Goals/One-Goal.jsx';
// import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
console.log(domain);
console.log(clientId);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        // }, {
        //   path: '/dashboard',
        //   element: <Dashboard />
      },
      {
        path: "/goals",
        element: <Goals />,
      },
      {
        path: "/goals/:goalId",
        element: <OneGoal />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      }, {
        path: '/calendar',
        element: <DemoApp />,
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
