import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert'
import img1 from '../iamge/icon.png';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { TabView, TabPanel } from 'primereact/tabview';
import Register from './Register';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Login() {

    const [LoginData, setLogin] = useState({
        email: "",
        password: "",
        error: [],
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const history = useHistory();
    const handleinput = (e) => {
        e.persist();
        setLogin({ ...LoginData, [e.target.name]: e.target.value });
    }

    const LoginForm = (e) => {
        e.preventDefault();

        const data = {
            email: LoginData.email,
            password: LoginData.password,
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/Login`, data).then(res => {
                if (res.data.status === 200) {
                    if(res.data.role === 1){
                        localStorage.setItem('auth_id',res.data.id)
                        localStorage.setItem('auth_token',res.data.token)
                        swal("Success",res.data.message, 'success');
                        history.push(`/admin`);
                    }
                    else if(res.data.role === 2) {
                        localStorage.setItem('auth_id',res.data.id)
                        localStorage.setItem('auth_name',res.data.name);
                        localStorage.setItem('auth_token',res.data.token)
                        swal("Success",res.data.message, 'success');
                        history.push(`/dealer`);
                    }
                    else if(res.data.role === 4){
                        localStorage.setItem('auth_id',res.data.id)
                        localStorage.setItem('auth_token',res.data.token)
                        swal("Success",res.data.message, 'success');
                        history.push(`/cars`);
                    }
                    else{
                        localStorage.setItem('auth_id',res.data.id)
                        localStorage.setItem('auth_token',res.data.token)
                        swal("Success",res.data.message, 'success');
                        history.push(`/customer`);
                    }
                }
                else{
                    setLogin({ ...LoginData, error: res.data.error });
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        });
    }

    return (
        <div class="container">
            <div className="row justify-content-center vertical-center">
                <div class="card bg-transparent border-light-subtle shadow-sm border-0">
                    <div class="row g-0">
                        <div class="col-12 col-md-6">
                            <div class="d-flex align-items-center justify-content-center h-100">
                                <div class="col-10 col-xl-8 py-3">
                                    <img class="img-fluid rounded mb-4" loading="lazy" src={img1} width="245" height="80" alt="BootstrapBrain Logo" />
                                    <hr class="border-primary-subtle mb-4" />
                                    <h4 class="mb-4 text-light">Driving Dreams, Delivering Quality: Your Journey Starts with Us.</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card-body p-3 p-md-4 p-xl-5">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-5">
                                            <h3 className='text-light'>{
                                                activeIndex === 0 ? "Login" : "Create Account"
                                            }</h3>
                                        </div>
                                    </div>
                                </div>
                                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                                    <TabPanel header="Login">
                                        <form onSubmit={LoginForm}>
                                            <div class="row gy-3 gy-md-4 overflow-hidden">
                                                <div class="col-12">
                                                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                                    <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='email' />
                                                    <span className='text-danger'>{LoginData.error.email}</span>
                                                </div>
                                                <div class="col-12">
                                                    <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                                                    <InputText type='password' className='w-100 p-inputtext-sm' onChange={handleinput} name='password' />
                                                    <span className='text-danger'>{LoginData.error.password}</span>
                                                </div>
                                                <div class="col-12">
                                                    <Button raised className='w-100 p-button-sm p-button-info' label='Login' />
                                                </div>
                                            </div>
                                        </form>
                                    </TabPanel>
                                    <TabPanel header="Register">
                                        <Register />
                                    </TabPanel>
                                </TabView>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login