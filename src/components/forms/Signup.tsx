import { useState } from "react";


function SignUp() {

    const [ passwordType, setpasswordType ] = useState("password");
    const [ confirmPasswordType, setConfirmPasswordType ] = useState("password");
    return (
        <div>
            <div>
               <div>Create new account</div>
               <span>Create an account</span>
            </div>
            <label>
                <p>Full Name</p>
                <div>
                    <input type="text" placeholder="Full name" />
                </div>
            </label>
            <label>
                <p>Email</p>
                <div>
                   <input type="email" placeholder="email" />
                </div>
            </label>
            <label>
                <p>Password</p>
                <div>
                    <input type={passwordType} placeholder="Mininum of 8 characters" />
                    {/* password icon */}
                </div>
            </label>
            <label>
                <p>Confirm Password</p>
                <div>
                    <input type={confirmPasswordType} placeholder="Mininum of 8 characters" />
                    {/* password icon */}
                </div>
            </label>
            <label>
                <input type="checkbox" name="" id="" />
                <p>I agree to the terms & conditions</p>
            </label>
            <button>Sign Up</button>
            <div>Already have an account?<span>Log in</span></div>
            <button>Connect With Google</button>

        </div>
    )
}

export default SignUp;