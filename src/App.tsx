import './App.css';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme/theme';
import { useState } from 'react';


import { Routes } from './Routes';
import { Notification } from './components/general/Notification';

function App() {

  const [ theme, setTheme] = useState(defaultTheme);

  return (
    <div className='App' style={{backgroundColor:theme.backgroundColor}}>
      <ThemeProvider theme={theme}>
          <Routes />
      </ThemeProvider>
      <Notification />
    </div>
  );
}

export default App;
