import { useState } from "react";
import OB1 from "./components/Screen1";
import OB2 from "./components/Screen4";
import OB3 from "./components/Screen3";
import Styles, { Index } from "./onboarding.styles";
import OB4 from "./components/Screen2";
import NavOptions from "./components/NavOptions";

function Onboarding() {

    const [ index, setIndex ] = useState(0);
    const [ showNavOptionsBoard, toggleBoard ] = useState(false);
    const components: JSX.Element[] = [<OB1 />,<OB2 />,<OB3 />,<OB4 />];

     

    function nextIndex(){
        if(index + 1 > components.length -1){
            toggleBoard(true)
        }else{
            setIndex(i => i + 1);
        }
    }


    return (
        <Styles.Onboarding>
            <Styles.Outlet>
                { components[index] }
            </Styles.Outlet>
            <div className=" px-5">
            <Styles.Indexes>
                { components.map( (_,i) => <Index key={i} stats={i === index ? "ACTIVE" : ""} /> )}                    
            </Styles.Indexes>
            <Styles.Bottom>
               <span onClick={() => toggleBoard(true)}>{ index + 1 < components.length && 'Skip'}</span>
               <button onClick={nextIndex}>{ index + 1 < components.length ? 'Next' : 'Get Started'}</button>
            </Styles.Bottom>
            </div>
            { showNavOptionsBoard && <NavOptions toggle={ () => toggleBoard(false)} />}
        </Styles.Onboarding>
    )
}

export default Onboarding;