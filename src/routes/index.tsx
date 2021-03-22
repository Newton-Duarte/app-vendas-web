import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Groups from '../pages/Groups';
import Divisions from '../pages/Divisions';

import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/produtos" component={Products} isPrivate />
    <Route path="/grupos" component={Groups} isPrivate />
    <Route path="/divisoes" component={Divisions} isPrivate />
    <Route path="/signin" component={SignIn} />
  </Switch>
)

export default Routes;