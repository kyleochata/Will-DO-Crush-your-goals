import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from "../../components/logoutButton/logoutButton.jsx"

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
console.log(user);
  return (
    <div>
      {isAuthenticated && (
        <article className='profile'>
            {user?.picture && <img className="userPic" src={user.picture} alt={user?.name} />}
            <h2 className="profileTitle">{user?.name}</h2>
            <ul className="userList">
                <li>Name: {user?.nickname}</li>
                <li>Email: {user?.email}</li>
            </ul>
            <LogoutButton />
        </article>
      )}
    </div>
  );
};

export default Profile