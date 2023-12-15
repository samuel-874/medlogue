import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const RedirectPage = () => {

    const {  user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const params = useParams();
    const { REACT_APP_BURL:base_url } = process.env
    const loginUser = async () => {

        try {
            
            const role = params.user || localStorage.getItem("role") || "patient"
            const provider = params.provider  || localStorage.getItem("provider") || "provider"

            const data = {
                firstname: user?.given_name,
                lastname: user?.family_name,
                email: user?.email,
                role: role,
                provider: provider
            }

            
       const response = await axios.post(`${base_url}/auth/social-login`,data)
       const info = window.btoa(`${data.email} ${role} ${provider?.toLowerCase()} `)

       localStorage.setItem("access_token",response.data?.access_token)
       localStorage.setItem("info",info)
        navigate('/dashboard')

        } catch (error) {
            console.log(error);
            navigate("/login?status=request-timeout")

            
        }
    }

    

    useEffect(() => {
        if(user){
            loginUser()
        }

    }, [user])


    return (
        <div>
            You would be redirected shortly...
        </div>
    )
}