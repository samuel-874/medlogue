import { useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { FormEvents, InputPros, SignupType } from "../../types/types";
import { PasswordIcon } from "../general/Icons";


export const Input = (props :InputPros) => {

    const [ type, setType ] = useState(props?.type);

    return (

        <FStyles.Input>
        <p style={{color: props.color}}>{props?.label||props?.field}</p>
         <div style={{borderColor: props.color}}>
            <input
               name={props.field} 
               value={props.value}
               onChange={(e) => props.updateVal(e)}
               onFocus={ (e) => props.updateColor( e,FormEvents.FOCUS)}
               onBlur={ (e) => props.updateColor( e,FormEvents.DEFAULT)}
               type={type} placeholder={props.placeholder}
            />

        { props?.type === "password" &&             
            <span onClick={ () =>  setType(currentType => currentType === "password" ? "text" : "password")}>
                <PasswordIcon show={type !== "password"} />
             </span>
        }
         </div>


         { props.error && <data>{props.error}</data>}
     </FStyles.Input>

    )
}