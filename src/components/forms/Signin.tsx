import { ChangeEvent, useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { Input } from "./Input";
import { Google } from "../general/Icons";
import {  FieldDatas, FormEvents } from "../../types/types";
import { Link, useParams } from "react-router-dom";


const Signin = () => {

    const theme = useTheme();
    const [ formData, setFormData ] = useState({
        email:"", password: ""
    })
    const [ fieldColors, setfieldColors] = useState({
        email: theme?.gray,
        password: theme?.gray
    });

    const [ formErrors, setformErrors] = useState({
        email: "", password: ""
    });

    const updateVal = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData( data => {
            return {
                ...data,
                [e.target.name]: e.target.value
            }
        })
    }

    const updateColor = (field:  React.FocusEvent<HTMLInputElement>, event: FormEvents) => {
        if(event === FormEvents.FOCUS){
            setfieldColors( data => {
                return{
                    ...data,
                    [field.target.name]: theme?.appColor
                }
            })
        } else if(event === FormEvents.ERROR){
            setfieldColors( data => {
                return{
                    ...data,
                    [field.target.name]: theme.error
                }
            })
        } else {
            setfieldColors( data => {
                return{
                    ...data,
                    [field.target.name]: theme?.gray
                }
            })
        }
    }
    
    

    return (
            <FStyles.Signin>
                 <title >Signin</title>
            <FStyles.Form>

            <div className=" my-[1rem] ">
                <FStyles.Text fontSize="1.4rem" fontWeight="600" >Welcome back</FStyles.Text>
                <FStyles.Text fontSize="15px" fontWeight="500" color={theme.darkGray} >
                    Securely login to your account
                </FStyles.Text>
            </div>

                <form >
                    <Input 
                    field={"email"} 
                    value={formData.email} 
                    placeholder="joe@example."
                    type="text"
                    updateVal={updateVal} 
                    color={fieldColors.email} 
                    error={formErrors.email} 
                    updateColor={updateColor} 
                    />
                            
                    <Input 
                        field={"password"} 
                        value={formData.password} 
                        placeholder="Minimum of 8 characters"
                        type="password"
                        updateVal={updateVal} 
                        color={fieldColors.password} 
                        error={formErrors.password} 
                        updateColor={updateColor} 
                    />



                    <div className="mt-8">
                    <FStyles.Button>Log in</FStyles.Button>
                    <FStyles.CMText>Don't have an account?<Link to="/signup/patient"> Signup</Link></FStyles.CMText>
                    </div>
                </form>
            </FStyles.Form>
            </FStyles.Signin>
    )
}

export default Signin