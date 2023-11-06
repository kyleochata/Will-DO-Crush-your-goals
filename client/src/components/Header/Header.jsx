import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import LoginButton from "../loginButton/loginButton";
import "./Header.css";
import logo from "../../assets/Will Do-logos_black.png";
import menu from '../../assets/burger-menu.svg';


export default () => {
    const [showMenu, setShowMenu] = useState(false);
    const { isAuthenticated } = useAuth0();
    const location = useLocation();
    const shouldDisplayBurgerMenu = isAuthenticated;


    let title = '';

  if (location.pathname.startsWith('/goals/')) {
    title = 'GOAL DETAIL';
  } else if (location.pathname.startsWith('/tasks/')) {
    title = 'TASK DETAIL';
  } else {
    // Define titles for other routes
    const routeToTitle = {
      '/': 'DASHBOARD',
      '/goals': 'GOALS',
      '/tasks': 'TASKS',
      '/report': 'REPORTS',
      '/profile': 'PROFILE',
    };
    title = routeToTitle[location.pathname] || '';
  }

    return (
        <div className="header">
            <div className="navItems">
                <img src={logo} className="logo" />
                {isAuthenticated ? (
                    <ul className="navLinks">
                        <Link to="/" className={`navLinkItem ${location.pathname === '/' ? 'active' : ''}`} ><li>Home</li></Link>
                        <Link to="/goals" className={`navLinkItem ${location.pathname === '/goals' ? 'active' : ''}`} ><li>Goals</li></Link>
                        <Link to="/tasks" className={`navLinkItem ${location.pathname === '/tasks' ? 'active' : ''}`} ><li>Tasks</li></Link>
                        {/* <Link to="/calendar" className={`navLinkItem ${location.pathname === '/calendar' ? 'active' : ''}`}><li>Calendar</li></Link> */}
                        <Link to="/report" className={`navLinkItem ${location.pathname === '/report' ? 'active' : ''}`} ><li>Reports</li></Link>
                    </ul>
                ) : null}
                <LoginButton />

                {shouldDisplayBurgerMenu && (
                <div className="burgerContainer"><img src={menu} alt="menu" className='burgerMenu' onClick={() => setShowMenu(!showMenu)} /> </div>
                    )}

                <div className="mobileMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
                    <Link className={`mobileMenuItem ${location.pathname === '/' ? 'activeMobile' : ''}`}  to='/' onClick={() => setShowMenu(false)}>Home</Link>
                    <Link className={`mobileMenuItem ${location.pathname === '/goals' ? 'activeMobile' : ''}`}  to='/goals' onClick={() => setShowMenu(false)}>Goals</Link>
                    <Link className={`mobileMenuItem ${location.pathname === '/tasks' ? 'activeMobile' : ''}`}  to='/tasks' onClick={() => setShowMenu(false)}>Tasks</Link>
                    {/* <Link className={`mobileMenuItem ${location.pathname === '/calendar' ? 'activeMobile' : ''}`}  to='/calendar' onClick={() => setShowMenu(false)}>Calendar</Link> */}
                    <Link className={`mobileMenuItem ${location.pathname === '/report' ? 'activeMobile' : ''}`}  to='/report' onClick={() => setShowMenu(false)}>Reports</Link>

                </div>


            </div>
            {isAuthenticated && (
            <section className="Title">
                    <h1 className="pageTitle">{title}</h1>
            </section>
            )}
        </div>
    )
}