import { useState, useEffect, useRef, memo } from "react"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@apollo/client";
import { CHECK_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginButton = () => {
  const [ checkUser, { error }] = useMutation(CHECK_USER);
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const mountRef = useRef(0);
  if (user != null){
    if(mountRef.current === 0){
      checkUserfunc(user.sub, user.nickname);
    }
    mountRef.current = 1;
  }
  async function checkUserfunc(authID, username) {
    try{
      const { data } = await checkUser({
        variables: {authID, username}
      })
      console.log(data);
      Auth.login(data.checkUser.token);
    }catch(err){
      console.log(err)
    }
  }
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
