import styled from "styled-components";
import tw from "twin.macro"

  const StyledPlaceHolder = styled.div`
        height: 100dvh;
        background-color: ${ props => props.theme.appColor};
        display: flex;
        justify-content: center;
        align-items: center;

     img{
        max-width: 80dvw;
        ${tw` mt-[-15dvw] lg:mt-[0]`}
     }
    
  `

  const StyledOnBoarding = styled.div`
        max-width: 500px;
        margin: auto;
        padding: 20px 0;

  `

  const StyledOutlet = styled.div`
        height: 75dvh;
  `

  const StyledIndexes = styled.div`
        max-width: 80px;
        height: 30px;
        margin: 20px auto 0;
        display: flex;
        justify-content: space-around;
        align-items: center;

        @media (max-height: 760px) {
            margin: 10px auto 0;
        }
  `

  const StyledBottom = styled.div`
        display: flex;
        margin:10px 0;
        align-items: center;
        justify-content: space-between;

        span{
            opacity: 0.8;
            color: ${ props => props.theme.appColor};;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            cursor: pointer;
        }

        button{
            display: flex;
            padding: 8px 18px;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            background: ${ props => props.theme.appColor};
            color: #FFF;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
  `

  const StyledOnboardingPages = styled.div`
     text-align: left;


        
        img{
            height: 55dvh;
            width: auto;
            margin: auto;

            @media (max-height: 760px) {
                height:45dvh;
            }

        }

        section{
            padding:20px;

            @media (max-height: 760px) {
                padding:10px 20px;
            }
        }
        
        h1{
            color: ${ props => props.theme.onboardingHeaderTextColor};
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            font-size: 20px;
            font-style: normal;

            font-weight: 700;
            line-height: normal;
            letter-spacing: 0.1px;
            margin: 20px 0;

            span{
                color: ${ props => props.theme.appColor};
            }

            @media (max-height: 760px) {
                font-size: 18px;
            }

            ${tw` text-[20px] lg:text-[18px]`}
        }


        p{
            color: ${ props => props.theme.onboardingTextColor };
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: 0.08px;

            @media (max-height: 760px) {
                font-size: 15px;
            }
        }
  ` 
  
  const StyledBed = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(125, 125, 125, 0.72);
 ` 

 const StyledOpBoard = styled.div`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    width: 80dvw;
    max-width:300px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    height: 200px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    transform: translate(calc(50dvw - 50%), calc(50dvh - 50%));
    border: 1px solid ${ props => props.theme.backgroundColor };
    background: ${ props => props.theme.backgroundColor };

    button{
        text-align: center;
        width:80%;
        padding: 10px 0;
        border-radius: 8px;
        margin: 10px auto;
        background-color: ${ props => props.theme.appColor };
        color: ${ props => props.theme.backgroundColor };
        border: 1px solid ${ props => props.theme.backgroundColor };;
        font-weight: 600;
        font-size: 16px;

        font-style: normal;
        line-height: normal;

        &:active{
            opacity: 0.7;
        }

        &:hover{
            color: ${ props => props.theme.appColor };
            background-color: ${ props => props.theme.backgroundColor };
            border: 1px solid ${ props => props.theme.appColor };;
            font-weight: 700;
        }
    }

    div{
        text-align: center;
        width:80%;
        padding: 10px 0;
        border-radius: 8px;
        margin: 10px auto;

        color: ${ props => props.theme.appColor };
        background-color: ${ props => props.theme.backgroundColor };
        border: 1px solid ${ props => props.theme.appColor };;

        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;

        &:active{
            opacity: 0.7;
        }

        &:hover{
            background-color: ${ props => props.theme.appColor };
            color: ${ props => props.theme.backgroundColor };
            border: 1px solid ${ props => props.theme.backgroundColor };;
            font-weight: 600;
        }
    }



 `


  export const Index = styled.span<{stats?: string}>`
        height: 6px;
        width: 6px;
        border-radius: 9999px;
        background-color: ${ props => props.stats === "ACTIVE" ? props.theme.appColor : "#D9D9D9" };
  `



  




  const Styles = {
    PlaceHolder: StyledPlaceHolder,
    Onboarding: StyledOnBoarding,
    Outlet: StyledOutlet,
    Indexes: StyledIndexes,
    Bottom: StyledBottom,
    OnboardComp: StyledOnboardingPages,
    Bed: StyledBed,
    OpBoard: StyledOpBoard,
 }





 export { Styles as default };

