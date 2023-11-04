import { Link } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';
import "./Footer.css"
import github from "../../assets/githubLink.png"


export default () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="footer">
           <div className="footerEl"><p className="footerText">
            Turn Should Dos into WILL DOs
           </p>
           <Link to="https://github.com/kyleochata/Task-Manager-Project3"><img src={github} className="github" /></Link>
           </div>
        </div>
    )
}