import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_CHECK } from "../../utils/queries";

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
        if (user != null){
        const { loading, data } = useQuery(QUERY_USER_CHECK, {
          variables: { authID: user.sub },
        })
        console.log(data)   
      }
         
  useEffect(() => {
      if (user != null){

      }
    }, [user] )

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
