import doctorsSVG from "../../../assets/doctors2.svg";
import Styles from "../onboarding.styles";


function OB3() {
    return (
        <Styles.OnboardComp>
        { <img src={doctorsSVG} alt="doctors" />}
        <section>
          <h1>
          Improved ways to check your <span>symptoms</span>
          </h1>
          <p>
             With virtual doctors using intelligent symptom
             checkers, you stand a better chance of identifying
              your symptoms and the causes
          </p>
        </section> 
      </Styles.OnboardComp>
    )
}

export default OB3;