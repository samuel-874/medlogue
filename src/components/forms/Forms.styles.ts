import styled from "styled-components";


const StyledSignup = styled.div`
    padding: 3rem 0;
    text-align: left;
`

const StyledSignin = styled.div`
    padding-top: 20dvh;
    text-align: left;
`

const StyledText = styled.div<{fontSize: string, color?: string,fontWeight?: string}>`
    font-size: ${ props => props.fontSize };
    color: ${ props => props.color || props.theme.appColor};
    font-weight: ${ props => props.fontWeight };
    line-height: normal;
`

const StyledForm = styled.div`
    width: 90dvw;
    max-width: 470px;
    margin-left:auto;
    margin-right:auto;

    form{
        margin-bottom: 40px;
    }
`

const StyledInput = styled.div`
    margin: 20px 0;
    
    p{
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: capitalize;
    }

    div{
        border-radius: 4px;
        border: 1.5px solid ;
        background: transparent;
        display: flex;
        padding: 4px;
        height: 45px;
        align-items: center;    
        flex-shrink: 0;
        margin: 7px 0;

        input{
            flex: 1;
            height: 80%;

            border: none;

            &:focus{
                outline: none;
            }

            &::placeholder{
                font-size: 0.8rem;
            }
            /* border: 1px solid black; */
        }

        select{
            flex: 1;
            height: 80%;

            border: none;

            &:focus{
                outline: none;
            }
 
        }
    }

    data{
        font-size: 13px;
        color: red;
    }

`

const StyledCheckBox = styled.label`

    div{
          display: flex;
          font-size: 0.9rem;

    }
  
    data{
        color: red;
        display: block;
        font-size: 13px;

    }

    a{
        font-weight: 600;
    }

    p{
        margin-left:5px;
    }

`

export const Button = styled.button<{status?: "disabled"|"enabled"}>`
        text-align: center;
        width:100%;
        height: 50px;
        border-radius: 8px;
        margin: 10px auto;
        background-color: ${ props => props.theme.appColor };
        color: ${ props => props.theme.backgroundColor };
        border: 1px solid ${ props => props.theme.backgroundColor };;
        font-weight: 600;
        font-size: 16px;
        white-space:nowrap;
        text-overflow: ellipsis;
        font-style: normal;
        line-height: normal;
        opacity: ${ props => props.status === "disabled" ? 0.5 : 1};
        

        &:active{
            opacity: 0.7;
        }

        &:hover{
            color: ${ props => props.theme.appColor };
            background-color: ${ props => props.theme.backgroundColor };
            border: 1px solid ${ props => props.theme.appColor };;
            font-weight: 700;
        }
`

const StyledButton2 = styled(Button)`
        text-align: center;
        width:100%;
        height: 50px;
        border-radius: 8px;
        margin: 10px auto;
        background-color: transparent;
        color: ${ props => props?.theme?.deepGray };
        border: 1px solid ${ props => props?.theme?.darkGray };;
        font-weight: 600;
        font-size: 16px;
        font-style: normal;

        display: flex;
        justify-content: center;
        align-items: center;


        svg{
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            margin: 0 12px;
        }

        &:active{
            opacity: 0.7;
        }

`

const StyledComfirmation = styled.div`
        font-size: 1rem;
        color: ${ props => props.theme.onboardingTextColor};
        text-align: center;
        font-weight: 500;

        a{
            color: ${ props => props.theme.appColor};
        }
`





 const FStyles = {
    Signup: StyledSignup,
    Signin: StyledSignin,
    Text: StyledText,
    Form: StyledForm,
    Input: StyledInput,
    Checkbox: StyledCheckBox,
    Button,
    GGLButton: StyledButton2,
    CMText: StyledComfirmation,
 }

 export { FStyles as default };