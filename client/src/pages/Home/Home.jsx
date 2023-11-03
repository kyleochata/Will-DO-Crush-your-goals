import { useAuth0 } from "@auth0/auth0-react"
export default () => {
    const {user} = useAuth0();
    console.log(user);
    return(
    <div>

        
    </div>
    )

} 