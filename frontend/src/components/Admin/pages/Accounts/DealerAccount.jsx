import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import swal from 'sweetalert';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { InputNumber } from 'primereact/inputnumber';



function DealerAccount() {

    const [visible, setVisible] = useState(false);
    const [BrgyData, setBrgy] = useState([]);
    const [PickBrgy, setPickBrgy] = useState([]);
    const [loading, setloading] = useState(true);
    const [DealerData, setDealerData] = useState([]);
    const [visibleData, setVisibleData] = useState(false);
    const toast = useRef(null);
    const [Dealer, setDealer] = useState({
        dealer: "",
        brgy: "",
        email: "",
        contact: "",
        error: [],
    });

    const [DetailsData, setDetails] = useState({
        dealer: "",
        email: "",
        contact: "",
        id: "",
    });

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

    useEffect(() => {
        AllData();
    }, []);

    const AllData = () => {
        axios.get(`/api/DealerAccount`).then(res => {
            if (res.data.status === 200) {
                setDealerData(res.data.data)
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }



    const AddDealer = () => {
        setVisible(true);
    }

    const onHide = () => {
        setVisible(false);
        setVisibleData(false)
    }

    const handleInput = (e) => {
        e.persist();
        setDealer({ ...Dealer, [e.target.name]: e.target.value });
    }

    const ContactFormat = (DealerData) => {
        return (
            <span>{'0' + DealerData.contact}</span>
        )
    }

    const ActionButton = (DealerData) => {
        return (
            <div>
                <Button data-id={DealerData.id} data-name={DealerData.name} data-email={DealerData.email} data-contact={DealerData.contact} data-indicator={1} onClick={Details} className='p-button-sm p-button-info me-2' label='Details' />
                <Button data-id={DealerData.id} data-indicator={2} onClick={Details} className='p-button-sm p-button-danger me-2' label='Remove' />
            </div>
        )
    }


    const Details = (e) => {
        if (e.currentTarget.getAttribute('data-indicator') == 1) {
            setDetails({
                id: e.currentTarget.getAttribute('data-id'),
                dealer: e.currentTarget.getAttribute('data-name'),
                contact: e.currentTarget.getAttribute('data-contact'),
                email: e.currentTarget.getAttribute('data-email'),
            })
            setVisibleData(true);
        }
        else {
            axios.delete(`/api/RemoveDealer/${e.currentTarget.getAttribute('data-id')}`).then(res => {
                if (res.data.status === 200) {
                    AllData();
                    toast.current.show({ severity: "success", summary: "Remove Dealer", detail: "Successfully" });
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        }
    }

    const UpdateData = (e) => {
        e.preventDefault();

        const data = DetailsData;

        axios.put(`/api/DealerUpdate`, data).then(res => {
            if (res.data.status === 200) {
                setVisibleData(false);
                AllData();
                toast.current.show({ severity: "success", summary: "Updated Dealer", detail: "Successfully" });

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const Edithandle = (e) => {
console.log(e.target.name);
        e.persist();
        setDetails({ ...DetailsData, [e.target.name]: e.target.value });
    }


    const AddDealerData = (e) => {
        e.preventDefault();

        const data = {
            dealer: Dealer.dealer,
            brgy: PickBrgy,
            email: Dealer.email,
            contact: Dealer.contact,
        };


        axios.post(`/api/AddDealer`, data).then(res => {
            if (res.data.status === 200) {
                document.getElementById('form_reset').reset();
                setVisible(false);
                AllData();
                setPickBrgy([])
                toast.current.show({ severity: "success", summary: "Added Dealer", detail: "Successfully" });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    return (
        <div>
            <Toast ref={toast} />
            <Card title="Dealer">
                <div className="d-flex justify-content-end m-3">
                    <Button className='p-button-sm p-button-info' onClick={AddDealer} label='Add Dealer' icon={PrimeIcons.PLUS} />
                </div>
                <DataTable value={DealerData} loading={loading} paginator paginatorLeft rows={8}>
                    <Column field='name' header="Dealer Name"></Column>
                    <Column field='email' header="Email Address"></Column>
                    <Column field='contact' header="Contact Number" body={ContactFormat}></Column>
                    <Column field='brgy_name' header="Barangay"></Column>
                    <Column field='id' header="Action" body={ActionButton}></Column>
                </DataTable>
            </Card>


            <Dialog header="Add Dealer" visible={visible} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={AddDealerData} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Dealer Name
                                </label>
                                <InputText className='w-100' name='dealer' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Dealer Email
                                </label>
                                <InputText className='w-100' name='email' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Dealer Contact Number
                                </label>
                                <InputText keyfilter={'int'} maxLength={11} className='w-100' name='contact' onChange={handleInput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Barangay
                                </label>
                                <Dropdown value={PickBrgy} className='w-100' filter name='brgy' options={BarangayData} placeholder='Barangay' onChange={(e) => setPickBrgy(e.value)} />
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-sm p-button-info' label='Add Dealer' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog header="Dealer Details" visible={visibleData} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={UpdateData} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Dealer Name
                                </label>
                                <InputText className='w-100' name='dealer' onChange={Edithandle} value={DetailsData.dealer} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Dealer Email
                                </label>
                                <InputText className='w-100' name='email' onChange={Edithandle} value={DetailsData.email} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Dealer Contact Number
                                </label>
                                <InputText keyfilter={'int'} maxLength={11} className='w-100' onChange={Edithandle} name='contact' value={DetailsData.contact} />
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-sm p-button-success' label='Update' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>


        </div>
    )
}

export default DealerAccount