import doctorsSVG from "../../../assets/cicculatory-system.svg";
import Styles from "../onboarding.styles";


 function OB4() {
    return (
        <Styles.OnboardComp>
        { <img src={doctorsSVG} alt="doctors" />}
        <section>
          <h1>
               Know more <span>about</span> your own <span>health</span>
          </h1>
          <p>
             The greater understanding of your 
             own medical problems, the better 
             you’ll be about determining whether 
             you need to see a doctor.
          </p>
        </section> 
      </Styles.OnboardComp>
    )
 }
 
 export default OB4;