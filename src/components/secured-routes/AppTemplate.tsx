import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { getAccess_token } from "../general/service";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setUserInfo } from "../../redux/user slice/UserSlice";

export const AppTemplate = () => {
    
    const { REACT_APP_BURL: base_url } = process.env
    const dispatch = useAppDispatch();

    const getInfo = async () => {

        const token = getAccess_token();
        if(!token){
            alert("no token")
            return;
        }


        try {
            const response = await axios.get(`${base_url}/api/v1/users/me`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })  

            const usersInfo = response.data
            dispatch(setUserInfo(usersInfo))

            console.log(response);
            
        } catch (error) {
            alert("an error occurred")
        }
    }


    useEffect(() => {

        getInfo();


    }, [])
    
    return (
        <div>
            <Outlet />
        </div>
    )
}