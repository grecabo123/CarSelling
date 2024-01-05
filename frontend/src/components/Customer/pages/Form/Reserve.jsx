import axios from 'axios'
import moment from 'moment'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'

function Reserve() {

    const [visible, setVisible] = useState(false);
    const [reserve, setReserve] = useState({
        name: "",
        vid: "",
        income: "",
        desc: "",
        date: "",
        error: [],
    });
    const [datepick, setpick] = useState([])
    const [income, setincome] = useState([]);
    const [Report, setReport] = useState([])
    const [loading, setLoading] = useState(true)
    const toast = useRef();
    const [Productlist ,setProductlist] = useState([]);
    const [PickProduct, setPickProduct] = useState([]);

    useEffect(() => {
        ReportData();
    },[]);

    useEffect(() => {
        axios.get(`/api/AllProducts`).then(res => {
            if(res.data.status === 200) {
                setProductlist(res.data.data);
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);


    const ProductID = Productlist.map((data) => {
        return(
            {label: data.VID+'-'+data.brand, value: data.id}
        )
    })


    const ReportData = () => {
        axios.get(`/api/ReportData/${localStorage.getItem('auth_id')}`).then(res => {
            if(res.data.status === 200) {
                setReport(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    }

    const handleinput = (e) => {
        e.persist();
        setReserve({...reserve, [e.target.name] : e.target.value});
    }

    const SubmitForm = (e) => {
        e.preventDefault();

        const data = {
            id: localStorage.getItem('auth_id'),
            name: reserve.name,
            vid: PickProduct,
            income: income,
            data: moment(datepick).format('MMM DD YYYY'),
            desc: reserve.desc,
        };
        axios.post(`/api/SubmitReserve`,data).then(res => {
            if(res.data.status === 200) {
                setVisible(false)
                toast.current.show({severity: "success", summary: "Form Submitted", detail: "Successfully"});
                document.getElementById('form_reset').reset();
                setincome([]);
                ReportData();
                setPickProduct([])
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');

            }
        })
    }


    const ModalAdd = () => {
        setVisible(true);
    }

    const FormatDate = (Report) =>{
        return (
            <span>{moment(Report.created_at).format('MMM DD YYYY')}</span>
        )
    }

    const AnnualFormat = (Report) => {
        return (
            <span>₱{Report.annual_income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
    }

    return (
        <div>
            <Toast ref={toast} />
            <Card title="Reserve Form">
                <div className="d-flex justify-content-end m-3">
                    <Button onClick={ModalAdd} className='p-button-sm p-button-info' label='Create Reserve Form' icon={PrimeIcons.PLUS} />
                </div>
                <DataTable value={Report} rows={8} loading={loading} paginator paginatorLeft>
                    <Column field='name' header="Name"></Column>
                    <Column field='product_id' header="VID #"></Column>
                    <Column field='annual_income' body={AnnualFormat} header="Annual Income"></Column>
                    <Column field='description' header="Description"></Column>
                    <Column field='created_at' body={FormatDate} header="Created"></Column>
                </DataTable>

                <Dialog visible={visible} position='top' header="Reserve Form" draggable={false} >
                    {/* <Panel header="Reserve Form"> */}
                    <div className="container">
                        <form onSubmit={SubmitForm} id='form_reset'>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="" className="form-label">
                                        Name:
                                    </label>
                                    <InputText className='w-100' name='name'  onChange={handleinput}/>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="" className="form-label">
                                        VID #
                                    </label>
                                    <Dropdown placeholder='Choose Product' className='w-100' options={ProductID} value={PickProduct} onChange={(e) => setPickProduct(e.target.value)} />
                                    {/* <InputText className='w-100' name='vid' onChange={handleinput} /> */}
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="" className="form-label">
                                        Annual Income
                                    </label>
                                    <InputNumber className='w-100' name='amount' value={income} onValueChange={(e) => setincome(e.value)} />
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="" className="form-label">
                                        Date
                                    </label>
                                    <Calendar className='w-100' name='calendar' value={datepick} onChange={(e) => setpick(e.value)} />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="" className="form-label">
                                        Description
                                    </label>
                                    <InputTextarea className='w-100' rows={5} cols={5} name='desc' onChange={handleinput} />
                                </div>
                                <div className="mt-3 d-flex justify-content-end">
                                    <Button className='p-button-sm p-button-info' label='Submit' />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* </Panel> */}
                </Dialog>
            </Card>
        </div>
    )
}

export default Reserve