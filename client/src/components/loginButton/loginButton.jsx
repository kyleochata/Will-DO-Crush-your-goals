import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
          <Link to="/profile">
            <button className="login">Profile</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
