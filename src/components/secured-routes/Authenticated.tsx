import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getAccess_token, getUserDetails } from "../general/service";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setUserInfo } from "../../redux/user slice/UserSlice";
import { UserDetails } from "../../types/types";

export const AppTemplate = () => {
    
    const { REACT_APP_BURL: base_url } = process.env;
    const [ appState, setAppState ] = useState("isLoading")
    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const getInfo = async () => {
        
        const token = getAccess_token();
        if(!token){
            alert("no token")
            return;
        }


        try {

            const infos = getUserDetails();
            if(infos && infos?.id){
                                
                if(infos?.profileCompleted === false){
                    setAppState("mounted")
                    navigate("/profile-completion")
                }
                setAppState("mounted")
                return;
            }

            const response = await axios.get(`${base_url}/users/me`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })  


            const usersInfo: UserDetails = response.data
            if(usersInfo && usersInfo?.id > 0){
                const stringified = JSON.stringify(usersInfo);
                const encoded = window.btoa(stringified);
                localStorage.setItem("_infos",encoded);

                if(!usersInfo?.profileCompleted){
                    setAppState("mounted")
                    navigate("/profile-completion")
                }
                setAppState("mounted")
            }else{
                alert("Something went wrong")
            }            
        } catch (error) {
            alert("an error occurred")
        }
    }


    useEffect(() => {
        getInfo();
    }, [])

    if(appState === "isLoading"){
        return <div>Loading...</div>
    }
    
    return (
        <div>
           <Outlet />
        </div>
    )
}