import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';

import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/produtos" exact component={Products} isPrivate />
    <Route path="/signin" component={SignIn} />
  </Switch>
)

export default Routes;