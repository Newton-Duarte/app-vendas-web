import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global'
import AppProvider from './hooks';
import Routes from './routes';
import MiniDrawer from './components/Drawer';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100%',
    marginTop: '24px'
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppProvider>
        <div className={classes.container}>
          <MiniDrawer />
          <Container maxWidth="xl">
            <Routes />
          </Container>
        </div>
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
}

export default App;