import { jwtDecode } from "jwt-decode";

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