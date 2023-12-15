import doctorsSVG from "../../../assets/doctor.svg";
import Styles from "../onboarding.styles";

 function OB1() {
    return (
        <Styles.OnboardComp>
          { <img src={doctorsSVG} alt="doctors" />}
          <section>
            <h1>
              Connect with medical doctors <span>anywhere</span> and <span>anytime</span> 
            </h1>
            <p>
              Connect with a doctor online to get 
              medical advice at any prefereed time
              and from any location
            </p>
          </section> 
        </Styles.OnboardComp>
    )
 }

export default OB1;