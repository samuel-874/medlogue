

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
        readonly?: boolean,
        capitalize?: boolean
    }
    
export type DropDownProps = {
    color: string,
    field: string,
    label: string,
    values: {
        label: string;
        value: string;
    }[],
    updateVal: Function,
    updateColor: Function,
    error: string,
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


export enum Roles{
        PATIENT="patient",
        DOCTOR="doctor",
        ADMIN="admin",
        SUPER_ADMIN="super admin"
}

export type UserDetails = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    dateOfBirth: string;
    registeredOn: string;
    lastLogin: string;
    genotype: string;
    bloodGroup: string;
    height: string;
    weight: string,
    role: string;
    gender: string;
    provider: string;
    profileCompleted: boolean;
}

export type JwtPayload = {
    sub: number;
    email: string;
    role: Roles;
}
