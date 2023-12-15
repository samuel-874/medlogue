import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FStyles from "../../forms/Forms.styles";
import { useTheme } from "styled-components";
import { Input } from "../../forms/Input";
import {  FieldDatas, FormEvents, UserDetails } from "../../../types/types";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuth0  } from "@auth0/auth0-react";
import * as S  from "./ProfileCompletion.styles";
import { Title } from "../../general/GeneralComponents";
import { getAccess_token, getUserDetails, showError } from "../../general/service";
import { DropDown } from "../../forms/DropDown";
import { notify } from "../../../redux/notification/NotificationSlice";
import { useAppDispatch } from "../../../redux/hooks/hooks";



export const ProfileCompletion = () => {

    const theme = useTheme();
    const [ colors, setColors ] = useState({
        fullname: "", dateOfBirth: "", bloodGroup: "",
        genotype: "", height: "", weight: "",gender: ""   
    });
    const dispatch = useAppDispatch();
    const [ isLoading, toggleLoading ] = useState(false);
    const navigate = useNavigate();
    const [ usersInfo, setUsersInfo ] = useState<UserDetails>()

    const [ formData, setFormData ] = useState({
        fullname: "", dateOfBirth: "", bloodGroup: "",
        genotype: "", height: "", weight: "",gender: "MALE"
    })

    const [ formErrors, setFormErrors ] = useState({
        fullname: "", dateOfBirth: "", bloodGroup: "",
        genotype: "", height: "", weight: "",gender: ""
    })

    const updateFormData = (e :ChangeEvent<HTMLInputElement>) => {
        setFormData(data => {
            return{
                ...data,
                [e.target.name]: e.target.value
            }
        })
    }

    const setGender = (gender: string) => {
        setFormData(data => {
            return{
                ...data,
                gender: gender
            }
        })
    }

    const updateColor = (
         field:  React.FocusEvent<HTMLInputElement>,
         event: FormEvents
         ) => {
            
        const color = event === FormEvents.FOCUS ? theme?.appColor : (
            event === FormEvents.ERROR ? theme?.error : theme.gray
        )
            setColors( data => {
                return {
                    ...data,
                    [field.target.name]: color
                }
            })
       
    }

    const Genders = [{
       label: "Male",
       value: "MALE"
    },{
      label: "Female",
      value: "FEMALE"
    },{
      label: "Prefer not to say",
      value: "NOT MENTIONED"
    }]

    const GenoType = [{
        label: "A",
        value: "A"
    },{
        label: "B",
        value: "B"
    },{
        label: "O",
        value: "O"
    },{
        label: "Others",
        value: "OTHERS"
    }]

    const BloodGroup = [{
        label: "A Postive",
        value: "A+"
    },{
        label: "A Negative",
        value: "A-"
    },{
        label: "B Positive",
        value: "B+"
    },{
        label: "B Negative",
        value: "B-"
    },{
        label: "AB Positive",
        value: "AB+"
    },{
        label: "AB Negative",
        value: "AB-"
    },{
        label: "O Positive",
        value: "O+"
    },{
        label: "O Negative",
        value: "O-"
    },{
        label: "Other",
        value: "OTHERS"
    }]

    const validateForm = () => {

        const { dateOfBirth, bloodGroup,genotype, 
                height,weight,gender} = formData;

        const errors = {  fullname:"", dateOfBirth: "",bloodGroup: "",genotype: "",height: "",weight: "",gender: "" };

        
        console.log("expected",new Date().getFullYear() - 12 );
        console.log("actual", new Date(dateOfBirth).getFullYear() );

        const usersBirthDate = new Date(dateOfBirth);
        const olderThan12 =  new Date().getFullYear() - 12 > usersBirthDate.getFullYear() && usersBirthDate.getMonth() <= new Date().getMonth();

        if(!dateOfBirth){
            errors.dateOfBirth = "*date of birth is required"
        }else if(!olderThan12){
           errors.dateOfBirth = "*you must be atleast 12 years old" 
        }else{
            errors.dateOfBirth = "" 
        }

        if(!bloodGroup){
            errors.bloodGroup = "*select a blood group to continue"
        }else{
            errors.bloodGroup = ""
        }

        if(!genotype){
            errors.genotype = "*select a genotype to continue" 
        }else{
            errors.genotype = "" 
        }

        if(!gender){
            errors.gender = "*select a gender to continue" 
        }else{
            errors.gender = "" 
        }


        if(!height){
            errors.height = "*height is required"
        }else if(parseInt(height) <= 0){
            errors.height = "*height cannot be less than or equals to 0"
        }else{
            errors.height = ""
        }

        if(!weight){
            errors.weight = "*weight is required"
        }else if(parseInt(height) < 1){
            errors.weight = "*weight cannot be less than 1"
        }else{
            errors.weight = ""
        }

        setFormErrors(errors);

        if(Object.values(errors).every( val => !val)){
            // there are no errors
            return false;
        }else{
            return true;
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const anyError = validateForm()
        
        if(anyError){
            window.scroll({
                top:0,
                behavior:"smooth"
            })

            return;
        }

        if(isLoading){
            return;
        }
        const { REACT_APP_BURL: base_url } = process.env;
        const token = getAccess_token();
        const user = getUserDetails();

        const data = {
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            ...formData,
            weight: parseInt(formData.weight),
            height: parseInt(formData.height),
        }
        console.log(data);
        

        try {
            const response = await axios.put(`${base_url}/users`,data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            const updatedInfo = response.data?.data
            // TO BE TESTED
           const dataJSON = JSON.stringify(updatedInfo);
           const encodedInfo = window.btoa(dataJSON);
           localStorage.setItem("_infos",encodedInfo)
            navigate("/dashboard")
            
        } catch (error: any) {
            showError(error,dispatch,"Unable to complete Profile")
               
        }



        
        
    }


    useEffect(() => {
        const info = getUserDetails();        

        const token = getAccess_token();

        if(!token || !info){
            navigate('/login?authorized-access');
        }


            setFormData( data => {
                return {
                    ...data,
                    fullname: `${info?.firstname} ${info?.lastname}`
                }
            }) 

            setUsersInfo(info)

    }, [])


        return (
            <S.StyledProfile>
                <Title label="Profile Completion" />
             
                <S.Form onSubmit={handleSubmit}>
                <S.Heading>
                    <h1>Complete your Profile</h1>
                    <p>Input your data</p>
                </S.Heading>
                    <div>
                        <div>
                          <h2 className=" font-bold my-2">Select Gender</h2>
                          <div className=" flex-between">
                            {Genders.map( (gender, i) =>
                             <S.Bar 
                             status={formData.gender === gender.value ? "selected" : "notselected"  }
                             onClick={() => setGender(gender.value)}
                             className="flex-center"
                             key={i}>{gender.label}</S.Bar> )
                            }
                         </div>
                        </div>

                        <Input 
                          color={colors.fullname} 
                          value={formData.fullname}
                          field="fullname"
                          readonly
                          error={formErrors.fullname}
                          updateColor={updateColor}
                          updateVal={updateFormData}
                          placeholder="Adediran Oyesola"
                          type="text"
                          label="Full Name"
                          capitalize
                        />

                        <Input 
                          color={colors.dateOfBirth} 
                          value={formData.dateOfBirth}
                          field="dateOfBirth"
                          error={formErrors.dateOfBirth}
                          updateColor={updateColor}
                          updateVal={updateFormData}
                          placeholder="Enter date if birth here"                          
                          type="date"
                          label="Date of Birth"
                        />

                        <DropDown 
                          color={colors.genotype} 
                          values={GenoType}
                          field="genotype"
                          error={formErrors.genotype}
                          updateColor={updateColor}
                          updateVal={updateFormData}
                          label="Genotype"
                        />

                        <DropDown 
                         color={colors.bloodGroup} 
                         values={BloodGroup}
                         field="bloodGroup"
                         error={formErrors.bloodGroup}
                         updateColor={updateColor}
                         updateVal={updateFormData}
                         label="Blood Group"
                        />

                        <Input 
                          color={colors.height} 
                          value={formData.height}
                          field="height"
                          error={formErrors.height}
                          updateColor={updateColor}
                          updateVal={updateFormData}
                          placeholder="8"                          
                          type="number"
                          label="Height"
                        />

                        <Input 
                          color={colors.weight} 
                          value={formData.weight}
                          field="weight"
                          error={formErrors.weight}
                          updateColor={updateColor}
                          updateVal={updateFormData}
                          placeholder="8"                          
                          type="number"
                          label="Weight"
                        />

                    </div>
                    <S.Buttons>Continue</S.Buttons>
                </S.Form>
            </S.StyledProfile>
        )
}