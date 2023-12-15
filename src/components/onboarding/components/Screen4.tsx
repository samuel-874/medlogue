import doctorsSVG from "../../../assets/travel.svg";
import Styles from "../onboarding.styles";


function OB2() {
    return (
        <Styles.OnboardComp>
        { <img src={doctorsSVG} alt="doctors" />}
        <section>
          <h1>
             No Need to <span>travel</span>
          </h1>
          <p>
            With an online consultation, you don’t 
            need to wait for the bus or get gas for
            your car. You simply go on the internet
                and begin your consultation.
          </p>
        </section> 
      </Styles.OnboardComp>
    )
}

export default OB2;