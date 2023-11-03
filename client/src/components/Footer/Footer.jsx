import { Link, useLocation } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import LoginButton from "../loginButton/loginButton"
import "./Header.css"
import logo from "../../assets/Will Do-logos_black.png"
import menu from '../../assets/burger-menu.svg'


export default () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="footer">
           
        </div>
    )
}