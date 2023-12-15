import { Route, Routes as AllRoutes } from "react-router-dom";
import PlaceHolder from './components/onboarding/PlaceHolder';
import Onboarding from './components/onboarding/Onboarding';
import SignUp from './components/forms/Signup';
import { RedirectPage } from './components/general/RedirectPage';
import Signin from './components/forms/Signin';
import { AppTemplate } from './components/secured-routes/Authenticated';
import { Dashboard } from './components/secured-routes/dashboard/Dashboard';
import { ProfileCompletion } from './components/secured-routes/profile-completion/ProfileCompletion';

export const Routes = () => {

    return (
        <AllRoutes>
          <Route path='/' element={<PlaceHolder />} />
          <Route path='/onboard' element={<Onboarding />} />
          <Route path='/signup/:user' element={<SignUp />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/callback/:provider/:user' element={<RedirectPage />} />
          <Route path='/' element={<AppTemplate />} >
              <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/profile-completion' element={<ProfileCompletion />} />
        </AllRoutes>
    )
}