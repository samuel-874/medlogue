import { ChangeEvent, useEffect, useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { Input } from "./Input";
import { Google } from "../general/Icons";
import {  FieldDatas, FormEvents } from "../../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0  } from "@auth0/auth0-react";


const Signin = () => {


    const { loginWithPopup, loginWithRedirect } = useAuth0();
    const theme = useTheme();
    const params = useParams();
    const navigate = useNavigate();
    const [isloading, toggleLoading ] = useState(false)
    const [ formData, setFormData ] = useState({
        email:"", password: ""
    });

    const [ defaultUser, setDefaultUser ] = useState({
        email:"", role:"", provider:""
    })
    
    const [ fieldColors, setfieldColors] = useState({
        email: theme?.gray,
        password: theme?.gray
    });

    const [ formErrors, setformErrors] = useState({
        email: "", password: ""
    });

    const connectWithGoogle = () => {


        loginWithRedirect({
          authorizationParams: {
             connection: 'google-oauth2',
             redirect_uri: `${window.origin}/callback/google/${defaultUser?.role||"patient"}`
          }
        });
      }

    const updateVal = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData( data => {
            return {
                ...data,
                [e.target.name]: e.target.value
            }
        })
    }

    const updateColor = (field:  React.FocusEvent<HTMLInputElement>|string, event: FormEvents) => {
        const color = event === FormEvents.FOCUS ? theme?.appColor : (
            event === FormEvents.ERROR ? theme?.error : theme.gray
        )
            if(typeof field === "string"){
                setfieldColors( data => {
                    return {
                        ...data,
                        [field]: color
                    }
                })
    
            }else{
                setfieldColors( data => {
                    return {
                        ...data,
                        [field.target.name]: color
                    }
                })
            }
    }

    const validateForm = () => {
        const errors = { email:"", password:"" }
        const { email, password } = formData;
        const { email: defaultEmail, provider } = defaultUser;

        if(provider === "google"){
            errors.password = ""
        }else if(password.length < 6){
            errors.password = "*password must be 6 characters or more"
        }else{
            errors.password = ""
        }

        if(!defaultEmail){

            if(email?.trim()?.length < 1){
                errors.email = "*email is required"
            } else if(!email.match(/^\S+@\S+\.com$/)){
                errors.email = "*invalid email address"
            }
        }

        setformErrors({...errors})


        if(Object.values(errors).every( val => val === "")){

            return true;
        }else{

            Object.entries(errors).forEach(([key,value]) => value.length > 0 && updateColor(key,FormEvents.ERROR))
            return false
        }
    }

    const signIn = async (e : any) => {
        e.preventDefault();

        const isValid = validateForm();

        if(!isValid){
            return;
        }

        try {

            const { REACT_APP_BURL: base_url } = process.env;
            toggleLoading(true)


            const data = {
                email: defaultUser.email || formData.email,
                password: formData.password
            }
           const response =  await axios.post(`${base_url}/api/v1/auth/login`,data)

            const token = response.data?.access_token;
            const info = window.btoa(`${data.email} medlogue`)


            localStorage.setItem("access_token", token);
            localStorage.setItem("info", info);
            toggleLoading(false)
            navigate("/dashboard")
                
    
        } catch (error: any) {
            toggleLoading(false)
            if(error?.response?.data?.message === "Unauthorized"){
                setformErrors( allErrors => {
                    return {
                        ...allErrors,
                        password: '*password is not correct'
                    }
                })

                updateColor("password",FormEvents.ERROR)
            }

            console.log(error);
            
            
        }

    } 




    useEffect(() => {

        const info = localStorage.getItem("info");

        if(!info){
            setDefaultUser( data => {
                return {
                    ...data,
                    provider: "medlogue",
                    role: "patient"
                }
            })
            return;
        }
        // checking to see if users email and provider (i.e Google or Medlogue)
       const decodedInfo = window.atob(info);

       if(decodedInfo){
            const value = decodedInfo.split(" ")
            const email = value[0]
            const role = value[1]
            const provider = value[2]
            
            if(email && provider){
               console.log(email);
               setDefaultUser({email,role,provider})
            }
       }

    },[])
    
    

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

                <form onSubmit={signIn} >
                    { !defaultUser.email &&  
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
                    }

                    { defaultUser.provider === "medlogue" &&
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
                    }


                    <div className="mt-8">
                        {
                            defaultUser?.provider !== "google" ?

                            <FStyles.Button status={isloading ? "disabled" : "enabled"}>{ isloading ? `Logging you in...` : `Log In `}</FStyles.Button>
                            :<FStyles.GGLButton  onClick={connectWithGoogle} status={isloading ? "disabled" : "enabled"}>{ isloading ? `Logging you in...` : `Log In  ${defaultUser.provider}`}</FStyles.GGLButton>
                        }
                    <FStyles.CMText>Don't have an account?<Link to="/signup/patient"> Signup</Link></FStyles.CMText>
                    </div>
                </form>
            </FStyles.Form>
            </FStyles.Signin>
    )
}

export default Signin