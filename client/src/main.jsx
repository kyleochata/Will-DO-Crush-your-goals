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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID
console.log(domain)
console.log(clientId)
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
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
)
