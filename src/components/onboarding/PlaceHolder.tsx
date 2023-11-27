import { useEffect } from "react";
import logo from "../../assets/Medlooue.svg";
import Styles from "./onboarding.styles";
import { Link, useNavigate } from "react-router-dom";


function PlaceHolder() {

    const navigate = useNavigate();


    useEffect(()=>{
        setTimeout(() => {
        // navigate("/onboard")        
        }, 3000);
    },[])

    return (
        <Styles.PlaceHolder>
            <Link to="/onboard">
                {/* TO animate the logo */}
              <img src={logo} alt="app logo"  />
            </Link>
        </Styles.PlaceHolder>
    )
}

export default PlaceHolder;