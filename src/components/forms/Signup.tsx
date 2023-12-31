import { ChangeEvent, useEffect, useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { Input } from "./Input";
import { Google } from "../general/Icons";
import {  FormEvents, FormData } from "../../types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TermAndCondition from "./TermsAndCondition";
import axios from "axios";
import { Title } from "../general/GeneralComponents";


function SignUp() {

    const theme = useTheme();
    const params = useParams();
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();
    const [ passwordType, setPasswordType ] = useState("password");
    const [ isLoading, toggleLoading ] = useState(false)
    const [ confirmPasswordType, setConfirmPasswordType ] = useState("password");
    const { REACT_APP_BURL:base_url } = process.env;

    const [ formData, setFormData ] = useState<FormData>({
        fullname: "", email: "", 
        password: "", confirmPassword: "", 
        termsAndCondtionsAgreed: false,
    });



    const [ fieldColors, setFieldColors ] = useState({
        fullname: theme?.gray,
        email: theme?.gray,
        password: theme?.gray,
        confirmPassword: theme?.gray,
        termsAndCondtionsAgreed: theme?.gray
    })

    const [ formErrors, setFormErrors ] = useState({
        fullname: "", email: "", 
        password: "", confirmPassword: "", 
        termsAndCondtionsAgreed: "",
    })

    const fieldData = {
        fullname: {
            label: "Full Name",
            placeholder: "",
            type: "text",
        },
        email: {
            label: "Email",
            placeholder: "cheekybee@gmail.com",
            type: "text",
        },
        password: {
            label: "Password",
            placeholder: " ",
            type: "password",
        },
        confirmPassword: {
            label: "Cofirm Password",
            placeholder: "Minimum of 8 characters ",
            type: "password",
        },
    }


    const updateVal =(e : ChangeEvent<HTMLInputElement>) => {
        setFormData( oldState => {
            return {
                ...oldState,
                [e.target.name]: e.target.value
            }
        })
    }

    const toggleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData( data => {
            return {
                ...data,
                termsAndCondtionsAgreed: e.target.checked
            }
        })
    }

    const updateColor = (field:  React.FocusEvent<HTMLInputElement>, event: FormEvents) => {
        const color = event === FormEvents.FOCUS ? theme?.appColor : (
            event === FormEvents.ERROR ? theme?.error : theme.gray
        )
            setFieldColors( data => {
                return {
                    ...data,
                    [field.target.name]: color
                }
            })
       
    }

    const validateFormData = () => {
        const error = { fullname: "", email: "", password: "", confirmPassword: "", termsAndCondtionsAgreed: "" };

        const { fullname, email, password, confirmPassword, termsAndCondtionsAgreed } = formData;

        // checking if user entered first and last name
        if(fullname.length < 2){
            error.fullname = "*fullname is required"
        }else if(fullname.split(" ").length != 2 || fullname.split(" ").some(val => val.length < 1)){
            error.fullname = "*both first and last name is required"
        }else{
            error.fullname = ""
        }


        // is email syntax is valid
        if(email?.length < 1){
            error.email = "*enter an email to continue to Medlogue"
        }else if(!email.match(/^\S+@\S+\.com$/)){
            error.email = "*invalid email address"
        }else{
            error.email = ""
        }

        if(password.length < 6){
            error.password =  "*password must be atleast 6 characters"
        }else{
            error.password =  "" 
        }

        if(confirmPassword !== password){
            error.confirmPassword =  "*passwords don't match"
        }else{
            error.confirmPassword =  ""
        }

        if(!termsAndCondtionsAgreed){
            error.termsAndCondtionsAgreed = "*this field is required"
        }else{
            error.termsAndCondtionsAgreed = ""
        }

       return error
    }

    

    const submitForm = async (e: any) => {
        e.preventDefault();

        const role = params.user

        const errors = validateFormData();


        setFormErrors(errors);
        if(!Object.values(errors).every( error => error.length === 0)){
            for (const [key, value] of Object.entries(errors)) {
                if(value.length > 0){
                    setFieldColors( colors => {
                        return {
                            ...colors,
                            [key]: theme.error
                        }
                    })
                }
            }
            
            return;
        }
   

        const { fullname, email, password, confirmPassword, termsAndCondtionsAgreed } = formData;
        const data = {
            firstname: fullname.split(" ")[0] ,
            lastname:  fullname.split(" ")[1],
            email, password,
            role: role
        }


        try{
            
            toggleLoading(true)
            const response  = await  axios.post(`${base_url}/auth/register`,data)
            const info = window.btoa(`${data.email} ${params.user} medlogue`)
            const token = response.data?.access_token;

            // setting credentials for signin purpose
            localStorage.setItem("info",info)
            localStorage.setItem("access_token",token)
            navigate("/dashboard")

        }catch(error: any){
            
            toggleLoading(false)
            if(error?.response?.data?.message === "Email has been taken"){
                setFormErrors( errors => {
                    return {
                        ...errors,
                        email: "*email has been taken"
                    }
                })
            }else{
                alert("regisration was not sucessful try again")
            }
            console.log(error);   
        }
    }

    const connectWithGoogle = () => {
        
        console.info(`${window.origin}/callback/google/${params?.user||"patient"}`)
        loginWithRedirect({
          authorizationParams: {
             connection: 'google-oauth2',
             redirect_uri: `${window.origin}/callback/google/${params?.user||"patient"}`
          }
        });
      }

    useEffect(() => {
        const role = params.user
        if(role !== "patient" && role !==  "doctor"){
            alert("Role is required")
            navigate("/")
        }
    }, [params])


    return (
        <FStyles.Signup>
                <Title label="Signup" />
            <FStyles.Form>
            <div className=" my-[1rem]">
               <FStyles.Text 
                    fontSize="1.4rem" 
                    fontWeight="600"
                >
                     Create new account
                </FStyles.Text>
               <FStyles.Text fontSize="15px" fontWeight="500" color={theme.darkGray} >Create a account</FStyles.Text>
            </div>

            <form onSubmit={ e => !isLoading && submitForm(e)}>

                 <Input 
                   field={"fullname"} 
                   value={formData.fullname} 
                   updateVal={updateVal}
                   label="Full Name"
                   placeholder="Akindiya Beulah"
                   type="text" 
                   color={fieldColors.fullname} 
                   error={formErrors.fullname} 
                   updateColor={updateColor} 
                 />

                 <Input 
                   field={"email"} 
                   value={formData.email} 
                   updateVal={updateVal} 
                   placeholder="you@example.com"
                   type="text"
                   color={fieldColors.email} 
                   error={formErrors.email} 
                   updateColor={updateColor} 
                 />

                 <Input 
                   field={"password"} 
                   value={formData.password} 
                   type="password"
                   placeholder="Minimum of 8 characters"
                   updateVal={updateVal} 
                   color={fieldColors.password} 
                   error={formErrors.password} 
                   updateColor={updateColor} 
                 />

                 <Input
                   field={"confirmPassword"} 
                   value={formData.confirmPassword} 
                   type="password"
                   placeholder="Minimum of 8 characters"
                   label="Confirm Password"
                   updateVal={updateVal} 
                   color={fieldColors.confirmPassword} 
                   error={formErrors.confirmPassword} 
                   updateColor={updateColor} 
                 />

                <TermAndCondition 
                  checked={formData.termsAndCondtionsAgreed} 
                  error={formErrors.termsAndCondtionsAgreed}
                  toggleFunc={toggleCheck}
                />

                <div className="mt-8">
                    <FStyles.Button status={isLoading ? "disabled" : "enabled"}>{ isLoading ? `Registering your account...` : `Sign Up`}</FStyles.Button>
                    <FStyles.CMText>Already have an account?<Link to="/login"> Log in</Link></FStyles.CMText>
                </div>

            </form>
            
            <FStyles.GGLButton onClick={() => connectWithGoogle()}> 
                <Google /> Connect With Google
            </FStyles.GGLButton>

            </FStyles.Form>
        </FStyles.Signup>
    )
}

export default SignUp;