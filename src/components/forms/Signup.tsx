import { ChangeEvent, useState } from "react";
import FStyles from "./Forms.styles";
import { useTheme } from "styled-components";
import { Input } from "./Input";
import { Google } from "../general/Icons";
import {  FieldDatas, FormEvents } from "../../types/types";
import { Link, useParams } from "react-router-dom";


type FormData =  {
    "fullname": string;
    "email": string;
    "password": string;
    "confirmPassword": string;
    "termsAndCondtionsAgreed": boolean;
}

function SignUp() {

    const theme = useTheme();
    const params = useParams();
    const [ passwordType, setPasswordType ] = useState("password");
    const [ confirmPasswordType, setConfirmPasswordType ] = useState("password");

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
            placeholder: "Akindiya Beulah",
            type: "text",
        },
        email: {
            label: "Email",
            placeholder: "cheekybee@gmail.com",
            type: "text",
        },
        password: {
            label: "Password",
            placeholder: "Minimum of 8 characters ",
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
        if(event === FormEvents.FOCUS){
            setFieldColors( data => {
                return{
                    ...data,
                    [field.target.name]: theme?.appColor
                }
            })
        } else if(event === FormEvents.ERROR){
            setFieldColors( data => {
                return{
                    ...data,
                    [field.target.name]: theme.error
                }
            })
        } else {
            setFieldColors( data => {
                return{
                    ...data,
                    [field.target.name]: theme?.gray
                }
            })
        }
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
        if(email?.length < 4){
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

        return error;
    }

    

    const submitForm = (e: any) => {
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
       
        // check that user is either doctor | patient

        // check if any errors
        // register user by role
        // store the role, provided (password | google) and email encoded in the local storage
        // redirect to login page
        // if user signedup with social login redirect to profile completions
        // if user signedup with social login on the login page dont showing input for password

        console.log("type -",params.user);
        console.log("data", formData );
    }


    return (
        <FStyles.Signup>
                <title >Signup</title>
            <FStyles.Form>
            <div className=" my-[1rem]">
               <FStyles.Text fontSize="1.4rem" fontWeight="600" >Create new account</FStyles.Text>
               <FStyles.Text fontSize="15px" fontWeight="500" color={theme.darkGray} >Create a account</FStyles.Text>
            </div>

            <form onSubmit={ e => submitForm(e)}>
                { 
                
                Object.entries(formData)
                .filter(([_,value]) => typeof value === "string")
                .map(([key, value]) => {
                    return (
                        <Input 
                        field={key} 
                        value={value} 
                        fieldData={fieldData[key as keyof FieldDatas]}
                        updateVal={updateVal} 
                        color={fieldColors[key as keyof FormData]} 
                        error={formErrors[key as keyof FormData]} 
                        updateColor={updateColor} 
                         />
                    )
                })
                }


            <FStyles.Checkbox>
              <div>
                <input 
                    type="checkbox" 
                    checked={formData.termsAndCondtionsAgreed} 
                    onChange={e => toggleCheck(e)}
                />
                <p>I agree to the <a href="/terms-of-service#terms" target="_blank">terms</a> & <a  href="/terms-of-service#terms" target="_blank">conditions</a></p>
              </div>
              { formErrors.termsAndCondtionsAgreed && <data>{formErrors.termsAndCondtionsAgreed}</data>}

            </FStyles.Checkbox>
            <div className="mt-8">
                <FStyles.Button>Sign Up</FStyles.Button>
                <FStyles.CMText>Already have an account?<Link to="/login"> Log in</Link></FStyles.CMText>
            </div>

            </form>
            
            <FStyles.GGLButton> <Google /> Connect With Google</FStyles.GGLButton>
            </FStyles.Form>
        </FStyles.Signup>
    )
}

export default SignUp;