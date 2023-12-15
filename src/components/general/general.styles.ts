import styled from "styled-components";
import tw from "twin.macro";



export const Notification = styled.div<{state: "hidden"|"visible"}>`
    top: ${ props => props.state === "visible" ? "20px" : "-300px"};
    transition: 1s top;
    color: ${ props => props?.theme?.textColor};
    font-size: 14px;
    font-weight: 500;
    border-width: 3px;
    border-style: solid;

    border-color: ${ props => props?.theme?.appColor };
    border-radius: 8px;

    ${tw` py-2 px-1 text-center w-[80dvw] max-w-[400px] mx-auto shadow-md fixed left-0 right-0 `}
`