import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'
import Error from './pages/Error/Error.jsx'
import Goals from './pages/Goals/All-Goals.jsx'
import Tasks from './pages/Tasks/Tasks.jsx'
import Calendar from './components/calendar/calendar.jsx'
import OneGoal from './pages/Goals/One-Goal.jsx'
// import OneTask from './pages/OneTask.jsx';
import Home from './pages/Home/Home.jsx'
import Report from './pages/Report/Report.jsx'
import Profile from './pages/Profile/Profile.jsx'

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    ),
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        // }, {
        //   path: '/dashboard',
        //   element: <Dashboard />
      },
      {
        path: '/goals',
        element: <Goals />,
      },
      {
        path: '/goals/:goalId',
        element: <OneGoal />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
        // }, {
        // path: '/tasks/:taskId',
        // element: <OneTask />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
