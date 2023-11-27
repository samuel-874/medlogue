import { useNavigate } from "react-router-dom";
import Styles from "../onboarding.styles";

 function NavOptions({toggle}: {toggle: Function}) {

   const navigate = useNavigate();

   const redirect = (route: "patient"|"doctor") => {

      if(route === "doctor"){
         navigate("/signup/doctor")
      }else{
         navigate("/signup/patient")
      }
      
   }
    return (
      <div className=" relative">
         <Styles.Bed onClick={() => toggle()} />
         <Styles.OpBoard>
         {/* Turn each to Link and target my positon nth */}
            <button onClick={() => redirect("patient")}>Sign up as Patient</button>
            <div onClick={() => redirect("doctor")}>Sign up as Doctor</div>
         </Styles.OpBoard>
      </div>
    )
 }
 
 export default NavOptions;