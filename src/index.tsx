import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

 const { REACT_APP_AUTH0_DOMAIN: domain, REACT_APP_AUTH0_CLIENT_ID: client_id  } = process.env
 
root.render(
   
   <BrowserRouter>
   <Auth0Provider
    domain={domain||""}
    clientId={client_id||""}
    authorizationParams={{
      redirect_uri:`${window.location.origin}/callback`
    }}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
   </BrowserRouter>
);

