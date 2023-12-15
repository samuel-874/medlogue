import styled from "styled-components"
import FStyles, { Button } from "../../forms/Forms.styles";
import tw from "twin.macro";


export  const StyledProfile = styled(FStyles.Signup)`
    padding: 2rem 1rem 0rem;
 `

export const Form = styled.form`
    width: 90dvw;
    max-width: 470px;
    margin-left:auto;
    margin-right:auto;

`

export const Buttons = styled.button`
     text-align: center;
     width:100%;
     height: 50px;
     border-radius: 8px;
     background-color: ${ props => props.theme.appColor };
     color: ${ props => props.theme.backgroundColor };
     border: 1px solid ${ props => props.theme.backgroundColor };
     margin: 2rem auto;
     font-weight: 500;

     ${tw` shadow-md`}
`

export const Heading = styled.div`
    margin: 2rem 0;

    h1{
        color: ${ props => props.theme?.deepGray};
        font-weight: 600;
        font-size: 1.3rem;
    }

    p{
        color: ${ props => props.theme?.darkGray};
        font-weight: 500;
        font-size: 1rem;
    }
`

export const Bar = styled.span<{status?: "selected"|"notselected"}>`
    padding: 0 20px;
    height: 38px;    
    border: 1.5px solid ${({theme}) => theme?.appColor };
    border-radius: 4px;
    color:  ${ props => props?.status === "selected" ? "#FFF" : props?.theme?.appColor  };
    font-weight:  600;
    background-color: ${ props => props?.status === "selected" && props?.theme?.appColor  };
    cursor: pointer;

    ${tw`shadow-md`}
`