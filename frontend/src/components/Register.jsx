import axios from 'axios'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import React, { useRef, useState } from 'react'
import swal from 'sweetalert'

function Register() {

    const [CreateAccount , setAccount] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
        error: [],
    });

    const toast = useRef();

    const handleinput = (e) => {
        e.persist();
        setAccount({...CreateAccount, [e.target.name] : e.target.value});
    }

    const RegisterAccount = (e) => {
        e.preventDefault();

        const data= {
            fname: CreateAccount.first,
            lname: CreateAccount.last,
            email: CreateAccount.email,
            password: CreateAccount.password,
        };

        axios.post(`/api/RegisterAccount`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Account Created", detail: "Successfully"});
                document.getElementById('reset_form').reset();
            }
            else{

            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    return (
        <div>
            <Toast ref={toast} />
            <form onSubmit={RegisterAccount} id='reset_form'>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-6">
                        <label htmlFor="" className="form-label">
                            First Name
                        </label>
                        <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='first' />
                    </div>
                    <div className="col-6">
                        <label htmlFor="" className="form-label">
                            Last Name
                        </label>
                        <InputText className='w-100 p-inputtext-sm' name='last'  onChange={handleinput} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="" className="form-label">
                            Email Address
                        </label>
                        <InputText className='w-100 p-inputtext-sm' name='email'  onChange={handleinput} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="" className="form-label">
                            Password
                        </label>
                        <InputText type='password' className='w-100 p-inputtext-sm'  onChange={handleinput} name='password' />
                    </div>
                    <div className="mt-3">
                        <Button className='p-button-sm p-button-info w-100' label='Create Account' />
                    </div>
                </div>
            </form> 
        </div>
    )
}

export default Register