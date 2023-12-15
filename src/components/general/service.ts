import { jwtDecode } from "jwt-decode";
import { JwtPayload, UserDetails } from "../../types/types";
import { DispatchFunc } from "../../redux/hooks/hooks";
import { notify } from "../../redux/notification/NotificationSlice";

export const getAccess_token = () => {
    const access_token = localStorage.getItem("access_token");
    if(access_token){
        try{
            const decoded = jwtDecode(access_token);
            if(decoded?.exp){
                const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
                if(decoded?.exp > currentTimestamp){
                    return access_token;
                }else{
                    console.log("token expired");
                    return null;
                }
            }else{
                console.log("no expiring date");
                return null
            }

        }catch(error){
            console.log("someting went wrong");
            return null;
        }
        
    }else{
        console.log("not logged in");
        return undefined;
    }
    // check if token is valid and not expired
}
export const getRole = (access_token: string) => {

    if(access_token){
        try{
            const decoded: JwtPayload = jwtDecode(access_token);
            if(decoded?.role){
                
                return decoded?.role
            }else{
                console.log("no role on jwt payload");
                return null
            }

        }catch(error){
            console.log("someting went wrong");
            return null;
        }
        
    }else{
        console.log("not logged in");
        return undefined;
    }
}


export const getUserDetails = ():UserDetails|undefined => {

    const info = localStorage.getItem("_infos");
    if(!info){
        return;
    }

    try {
        const decoded = window.atob(info);
        const parsedInfo = JSON.parse(decoded);  

        if(parsedInfo?.id > 0){
            return parsedInfo;
        }

    } catch (error) {
        
    }

    return;
}

export const showError = (error: any, dispatch: Function, optionalMessage?: string) => {
    const message = error?.response?.data?.message || optionalMessage;
        dispatch(
            notify({
                show: true,
                error: true,
                message: message
            })
        )

        console.log(error);
        
}