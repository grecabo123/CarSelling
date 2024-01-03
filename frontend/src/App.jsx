import React from 'react'
import axios from 'axios';
import Login from './components/Login';
import PrimeReact from 'primereact/api';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import PrivateAdminRoutes from './private/PrivateAdminRoutes';
import PrivateDealerRoutes from './private/PrivateDealerRoutes';
import PrivateCustomerRoutes from './private/PrivateCustomerRoutes';
import PrivateSuperAdminRoutes from './private/PrivateSuperAdminRoutes';

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});


function App() {

    PrimeReact.ripple = true;
    
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Login} />


                    
                    <PrivateAdminRoutes path="/admin" name="admin" />
                    <PrivateDealerRoutes path="/dealer" name="dealer" />
                    <PrivateCustomerRoutes path="/customer" name="customer" />
                    <PrivateSuperAdminRoutes path="/cars" name="cars" />
                </Switch>
            </Router>
        </div>
    )
}

export default App