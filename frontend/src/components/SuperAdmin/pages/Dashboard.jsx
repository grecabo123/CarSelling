import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function Dashboard() {

    const [AllData, setAllData] = useState([]);
    const [loading, setloading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [BrgyData, setBrgy] = useState([]);
    const [PickBrgy, setPickBrgy] = useState([]);
    const [CreateData, setCreate] = useState({
        name: "",
        email: "",
        contact: "",
    });

    const toast = useRef();

    useEffect(() => {
        DataList();
    },[]);

    useEffect(() => {
        axios.get(`/api/BarangayData`).then(res => {
            if (res.data.status === 200) {
                setBrgy(res.data.brgy);
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warninng", error.response.statusText, 'warning');
            }
        })
    }, []);

    const BarangayData = BrgyData.map((data) => {
        return (
            { label: data.brgy_name, value: data.id }
        )
    });


    const DataList = () => {
        axios.get(`/api/AllData`).then(res => {
            if(res.data.status === 200) {
                setAllData(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    }

    const SupplierContact = (AllData) => {
        return (
            <>
                <span>0{AllData.contact}</span>
            </>
        )
    }

    const AddData = () => {
        setVisible(true);
    }

    const onHide = () => {
        setVisible(false);
    }

    const handleInput = (e) => {
        e.persist();
        setCreate({...CreateData, [e.target.name] : e.target.value});
    }

    const CreateAccount = (e) => {
        e.preventDefault();

        const data = {
            name: CreateData.name,
            email: CreateData.email,
            contact: CreateData.contact,
            brgy: PickBrgy,
        };

        axios.post(`/api/CreateAccount`,data).then(res => {
            if(res.data.status === 200) {
                setVisible(false);
                toast.current.show({severity: "success", summary: "Manufacture Account", detail: "Created"});
                document.getElementById('form_reset').reset();
                setPickBrgy([])
                DataList();
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
            <Card title="Manufacture Data List">
                <div className="m-3 d-flex justify-content-end">
                    <Button onClick={AddData} className='p-button-sm p-button-info' label='Add Manufacture' />
                </div>
                <DataTable value={AllData} rows={9} paginator paginatorLeft loading={loading}>
                    <Column field='supplier_name' header="Supplier Name"></Column>
                    <Column field='email' header="Supplier Email"></Column>
                    <Column field='contact' body={SupplierContact} header="Supplier Contact"></Column>
                    <Column field='brgy_name' header="Address"></Column>
                </DataTable>
            </Card>

            <Dialog onHide={onHide} header="Register Manufacture" visible={visible} position='top' draggable={false}  style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <form onSubmit={CreateAccount} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Manufacture Name
                                </label>
                                <InputText className='w-100' name='name' onChange={handleInput} placeholder='' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Manufacture Email
                                </label>
                                <InputText className='w-100' name='email' placeholder='' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Manufacture Contact
                                </label>
                                <InputText className='w-100' name='contact' placeholder=''  onChange={handleInput}/>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Barangay 
                                </label>
                                <Dropdown value={PickBrgy}  options={BarangayData} onChange={(e) => setPickBrgy(e.value)} className='w-100' placeholder='Barangay' filter />
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-success p-button-sm' label='Create Account'  />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

        </div>
    )
}

export default Dashboard