import { Route, Routes } from 'react-router-dom';
import './App.css';

// components
import PlaceHolder from './components/onboarding/PlaceHolder';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme/theme';
import { useState } from 'react';
import Onboarding from './components/onboarding/Onboarding';
import SignUp from './components/forms/Signup';
import { RedirectPage } from './components/general/GeneralComponents';
import Signin from './components/forms/Signin';
import { AppTemplate } from './components/secured-routes/AppTemplate';
import { Dashboard } from './components/secured-routes/dashboard/Dashboard';

function App() {

  const [ theme, setTheme] = useState(defaultTheme);


  return (
    <div className='App' style={{backgroundColor:theme.backgroundColor}}>
      <ThemeProvider theme={theme}>
      <Routes>
         <Route path='/' element={<PlaceHolder />} />
         <Route path='/onboard' element={<Onboarding />} />
         <Route path='/signup/:user' element={<SignUp />} />
         <Route path='/login' element={<Signin />} />
         <Route path='/callback/:provider/:user' element={<RedirectPage />} />
         <Route path='/' element={<AppTemplate />} >
            <Route path='dashboard' element={<Dashboard />} />
         </Route>
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
