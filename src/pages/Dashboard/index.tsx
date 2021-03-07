import React from 'react';
import { makeStyles } from '@material-ui/styles';

import MiniDrawer from '../../components/Drawer';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex'
  }
})

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MiniDrawer />
      <Container>
        <Typography>Dashboard</Typography>
      </Container>
    </div>
  );
}

export default Dashboard;