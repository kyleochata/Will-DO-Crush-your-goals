import { Link, useLocation } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import LoginButton from "../loginButton/loginButton"
import "./Header.css"
import logo from "../../assets/Will Do-logos_black.png"
import menu from '../../assets/burger-menu.svg'


export default () => {
    const [showMenu, setShowMenu] = useState(false);
    const { isAuthenticated } = useAuth0();
    const location = useLocation();

    const routeToTitle ={
        '/': 'DASHBOARD',
        '/goals': 'GOALS',
        '/tasks': 'TASKS',
        '/calendar': 'CALENDAR',
        '/report': 'REPORTS',
    };

    const title = routeToTitle[location.pathname] || '';

    return (
        <div className="header">
            <div className="navItems">
                <img src={logo} className="logo" />
                {isAuthenticated ? (
                    <ul className="navLinks">
                        <Link to="/" className="navLinkItem" activeClass='active'><li>Home</li></Link>
                        <Link to="/goals" className="navLinkItem" activeClass='active'><li>Goals</li></Link>
                        <Link to="/tasks" className="navLinkItem" activeClass='active'><li>Tasks</li></Link>
                        <Link to="/calendar" className="navLinkItem" activeClass='active'><li>Calendar</li></Link>
                        <Link to="/report" className="navLinkItem" activeClass='active'><li>Reports</li></Link>
                    </ul>
                ) : null}
                <LoginButton />

                <img src={menu} alt="menu" className='burgerMenu' onClick={() => setShowMenu(!showMenu)} />
                <div className="mobileMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
                    <Link className="mobileMenuItem" activeClass='active' to='/' onClick={() => setShowMenu(false)}>Home</Link>
                    <Link className="mobileMenuItem" activeClass='active' to='/goals' onClick={() => setShowMenu(false)}>Goals</Link>
                    <Link className="mobileMenuItem" activeClass='active' to='/tasks' spy={true} offset={-200} smooth={true} duration={500} onClick={() => setShowMenu(false)}>Tasks</Link>
                    <Link className="mobileMenuItem" activeClass='active' to='/calendar' spy={true} offset={-150} smooth={true} duration={500} onClick={() => setShowMenu(false)}>Calendar</Link>
                    <Link className="mobileMenuItem" activeClass='active' to='/report' spy={true} offset={-150} smooth={true} duration={500} onClick={() => setShowMenu(false)}>Reports</Link>

                </div>


            </div>
            <section className="Title">
                    <h1 className="pageTitle">{title}</h1>
            </section>
        </div>
    )
}