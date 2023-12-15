import { useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { DropDownProps, FormEvents, InputPros, SignupType } from "../../types/types";
import { PasswordIcon } from "../general/Icons";


export const DropDown = (props :DropDownProps) => {


    return (
        <FStyles.Input>
            <p style={{color: props.color}}>{props?.label||props?.field}</p>
            <div style={{borderColor: props.color}}>

              <select 
                 name={props.field} 
                 onChange={(e) => props.updateVal(e)}
                 onFocus={ (e) => props.updateColor(e,FormEvents.FOCUS)}
                 onBlur={(e) => props.updateColor(e,FormEvents.DEFAULT)}
                 defaultValue="label"
                 >

                <option disabled hidden value="label" className=" text-blue-300">{props.label}</option>         
                {props.values.map((field,i) => 
                <option key={i} value={field?.value}>{field?.label}</option>)}
              </select>
            </div>

            {props.error && <data>{props.error}</data>}
        </FStyles.Input>

    )
}