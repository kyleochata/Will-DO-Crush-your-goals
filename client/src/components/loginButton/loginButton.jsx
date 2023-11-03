import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button className="login" onClick={() => loginWithRedirect()}>
          Sign In
        </button>
      ) : (
        <div>
            {/* //need to replace this with the user name data once we can pull it */}
          <p className="welcome">Welcome, user</p>
          
        </div>
      )}
    </div>
  );
};

export default LoginButton