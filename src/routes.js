import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './screens/Login';
import Users from './screens/Users';
import Customers from './screens/Customers';
import EditCustomer from './screens/Customers/_utils/EditCustomer';
import EditUser from './screens/Users/_utils/EditUser';
import NewCustomer from './screens/Customers/_utils/NewCustomer';
import NewUser from './screens/Users/_utils/NewUser';

const AppRoutes = () => (
    <App>
        <Switch>
            <Redirect from="/" exact to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/users/new" component={NewUser} />
            <Route path="/users/edit/:id" component={EditUser} />
            <Route path="/users" component={Users} />
            <Route path="/customers/new" component={NewCustomer} />
            <Route path="/customers/edit/:id" component={EditCustomer} />
            <Route path="/customers" component={Customers} />
        </Switch>
    </App>
);

export default AppRoutes;
