

export type SignupType = {
    
        fullname:"",
        email:"",
        password:"",
        confirmPassowrd:"",
    
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
        fieldData: FieldData
    }
    
 export type FieldData = {
        label: string,
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