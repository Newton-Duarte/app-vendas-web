import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global'
import AppProvider from './hooks';
import Routes from './routes';
// import MiniDrawer from './components/Drawer';
// import { useAuth } from './hooks/auth';


const App: React.FC = () => {
  // const { user } = useAuth();

  return (
    <Router>
      <AppProvider>
        {/* {user && <MiniDrawer />} */}
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
}

export default App;