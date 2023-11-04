import { useQuery, useMutation } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './components/Header/Header'
// import Footer from "./components/Footer";
import LoginButton from './components/loginButton/loginButton'
import LogoutButton from './components/logoutButton/logoutButton'
import { QUERY_ALL_USERS } from './utils/queries'
import { ADD_USER, LOGIN_USER } from './utils/mutations'
import { useEffect, useState } from 'react'

// // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
// 	uri: "/graphql",
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
// 	// get the authentication token from local storage if it exists
// 	const token = localStorage.getItem("id_token");
// 	// return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : "",
// 		},
// 	};
// });

// const client = new ApolloClient({
// 	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

function App() {
  const { user, isAuthenticated } = useAuth0()

  const { loading, error, data } = useQuery(QUERY_ALL_USERS)

  const [addUser] = useMutation(ADD_USER)
  const [loginUser] = useMutation(LOGIN_USER)

  useEffect(() => {
    if (isAuthenticated) {
      const getUser = async () => {
        const userCheck = data?.users.find(
          (singleUser) => singleUser.auth0 === user.sub
        )
        if (!userCheck) {
          const newUser = {
            name: user.name,
            email: user.email || `${user.name}@email.com`,
            auth0: user.sub,
          }
          await addUser({ variables: { ...newUser } })
        } else {
          // Log in the user
          try {
            const loginResult = await loginUser({
              variables: {
                auth0: userCheck.auth0,
              },
            })

            // Handle the login result, e.g., store the user data in your client state
            console.log('User logged in:', loginResult.data.loginUser)
          } catch (error) {
            console.error('Login failed:', error.message)
          }
        }
      }

      getUser()
    }
  }, [user])
  // Render your components based on the user's authentication status and data

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  // const currentUser = data?.users.find(
  //   (userAuth0) => userAuth0.auth0 === user.sub
  // ) ||
  // console.log(currentUser)
  // if (!currentUser) {
  //   return (
  //     <div className="mainBody">
  //       <Header />
  //       <div className="container">
  //         <Outlet />
  //       </div>
  //       <LogoutButton />
  //       {/* <Footer /> */}
  //     </div>
  //   )
  // }
  // console.log(currentUser)
  // const userCondition = currentUser.auth0 === user.sub ? true : false
  // console.log(userCondition)
  // const localUser = useMutation(userCondition ? LOGIN_USER : ADD_USER)

  // const [currentUser, setcurrentUser] = useState(user)
  // if (!data?.user || !user) {
  //   return
  // }
  // console.log(data)

  // const userCheck = data.users.filter(
  //   (singleUser) => singleUser.auth0 === user.sub
  // )
  // if (currentUser.auth0 === userCheck.auth0) {
  //   return (
  //     <div className="mainBody">
  //       <Header />
  //       <div className="container">
  //         <Outlet />
  //       </div>
  //       <LogoutButton />
  //       {/* <Footer /> */}
  //     </div>
  //   )
  // }

  // const localDBUser = useMutation(!userCheck ? ADD_USER : LOGIN_USER)
  // console.log(localDBUser)
  return (
    // <ApolloProvider client={client}>
    <div className="mainBody">
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <LogoutButton />
      {/* <Footer /> */}
    </div>
    // </ApolloProvider>
  )
}

export default App
