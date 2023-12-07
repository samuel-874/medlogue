

export type SignupType = {
    
        fullname:"",
        email:"",
        password:"",
        confirmPassowrd:"",
    
}


export type FormData =  {
    "fullname": string;
    "email": string;
    "password": string;
    "confirmPassword": string;
    "termsAndCondtionsAgreed": boolean;
}

export enum FormEvents {
        ERROR = "error",
        FOCUS = "focus",
        DEFAULT = "default"
}

export type InputPros = {
        color: string,
        field: string,
        value: any,
        updateVal: Function,
        updateColor: Function,
        error: string,
        label?: string,
        placeholder: string,
        type: string,
    }
    


export type FieldDatas = {
        fullname: {
            label: string,
            placeholder: string,
            type: string,
        },
        email: {
            label: string,
            placeholder: string,
            type: string,
        },
        password: {
            label: string,
            placeholder: string,
            type: string,
        },
        confirmPassword: {
            label: string,
            placeholder: string,
            type: string,
        },
    }