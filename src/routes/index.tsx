import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Units from '../pages/Units';
import Groups from '../pages/Groups';
import Divisions from '../pages/Divisions';
import Customers from '../pages/Customers';

import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} isPrivate />
    <Route path="/produtos" component={Products} isPrivate />
    <Route path="/unidades" component={Units} isPrivate />
    <Route path="/grupos" component={Groups} isPrivate />
    <Route path="/divisoes" component={Divisions} isPrivate />
    <Route path="/clientes" component={Customers} isPrivate />
    <Route path="/signin" component={SignIn} />
  </Switch>
)

export default Routes;