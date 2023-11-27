import { Route, Routes } from 'react-router-dom';
import './App.css';

// components
import PlaceHolder from './components/onboarding/PlaceHolder';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme/theme';
import { useState } from 'react';
import Onboarding from './components/onboarding/Onboarding';
import SignUp from './components/forms/Signup';

function App() {

  const [ theme, setTheme] = useState(defaultTheme);


  return (
    <div className='App' style={{backgroundColor:theme.backgroundColor}}>
      <ThemeProvider theme={theme}>
      <Routes>
         <Route path='/' element={<PlaceHolder />} />
         <Route path='/onboard' element={<Onboarding />} />
         <Route path='/signup' element={<SignUp />}>
            <Route path='patient' element={<div>Patient</div>} />
         </Route>
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
