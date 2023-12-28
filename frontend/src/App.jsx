import React from 'react'
import axios from 'axios';
import Login from './components/Login';
import PrimeReact from 'primereact/api';




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
        <>
            <Login />
        </>
    )
}

export default App