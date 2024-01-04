import axios from 'axios'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'
import DetailsProduct from './DetailsProduct'

function Sell() {

    const [AllData, setAllData] = useState([]);
    const [loading, setloading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const toast = useRef();
    const [amount, setValue] = useState([]);
    const [ProductDetails, setProduct] = useState();
    const [NewPrice, setNewPrice] = useState();
    const [ProductDataInfo, setData] = useState({
        vid: "",
        body: "",
        color: "",
        brand: "",
        model: "",
        transmission: "",
        engine: "",
        year: "",
        error: [],
    });
    const [FileData, setFile] = useState([]);
    const [DetailsProduct , setDetails] = useState({
        id: "",
        uniq: "",
        bodytype: "",
        color: "",
        vid: "",
        color: "",
        brand: "",
        transmission: "",
        price: "",
        model: "",
        model_year: "",
        engine: "",
    })

    useEffect(() => {
        ProductData();
    }, []);

    const fileHandler = (e) => {
        e.persist();
        setFile({ file: e.target.files[0] });
    }

    const ProductData = () => {
        axios.get(`/api/AllProduct`).then(res => {
            if (res.data.status === 200) {
                setAllData(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const AddSellProduct = () => {
        setVisible(true);
    }

    const onHide = () => {
        setVisible(false)
        setVisibleDetails(false)
    }

    const handleinput = (e) => {
        e.persist();
        setData({ ...ProductDataInfo, [e.target.name]: e.target.value });
    }

    const handleUpdate = (e) => {
        e.persist();
        setDetails({...DetailsProduct, [e.target.name] : e.target.value})
    }

    

    const ActionsBtn = (AllData) => {
        return (
            <>
                <Button onClick={GetDetails}  
                className='p-button-sm p-button-info' 
                label='Details' 
                data-id={AllData.id} 
                data-uniq={AllData.unique_key} 
                data-bodytype={AllData.bodytype}
                data-VID={AllData.VID}
                data-engine={AllData.engine}
                data-brand={AllData.brand}
                data-color={AllData.color}
                data-price={AllData.price}
                data-model={AllData.model}
                data-year={AllData.model_year}
                data-transmission={AllData.transmission}
                />
            </>
        )
    }


    const GetDetails = (e) => {
        setVisibleDetails(true)
        setDetails({
            id: e.currentTarget.getAttribute('data-id'),
            uniq: e.currentTarget.getAttribute('data-uniq'),
            bodytype: e.currentTarget.getAttribute('data-bodytype'),
            vid: e.currentTarget.getAttribute('data-vid'),
            engine: e.currentTarget.getAttribute('data-engine'),
            brand: e.currentTarget.getAttribute('data-brand'),
            color: e.currentTarget.getAttribute('data-color'),
            price: e.currentTarget.getAttribute('data-price'),
            model: e.currentTarget.getAttribute('data-model'),
            model_year: e.currentTarget.getAttribute('data-year'),
            transmission: e.currentTarget.getAttribute('data-transmission'),
        })
    }

 

    const AddProduct = (e) => {
        e.preventDefault();

        const data = new FormData;

        data.append('files', FileData.file);
        data.append('vid', ProductDataInfo.vid);
        data.append('body', ProductDataInfo.body);
        data.append('color', ProductDataInfo.color);
        data.append('price', amount);
        data.append('brand', ProductDataInfo.brand);
        data.append('model', ProductDataInfo.model);
        data.append('transmission', ProductDataInfo.transmission);
        data.append('engine', ProductDataInfo.engine);
        data.append('year', ProductDataInfo.year);
        data.append('auth_id', localStorage.getItem('auth_id'));

        axios.post(`/api/AddProduct`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Added Product", detail: "Successfully" });
                setVisible(false);
                ProductData();
                document.getElementById('form_reset').reset();
            }
            else {
                setData({ ...ProductDataInfo, error: res.data.error });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const UpdateProduct = (e) => {
        e.preventDefault();

        const data = DetailsProduct;

        axios.put(`/api/UpdateProduct`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Data Has Been Updated", detail: "Successfully"});
                setVisibleDetails(false);
                document.getElementById('form_reset_update').reset();
                ProductData();
            }
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    }

    return (
        <div className='container'>
            <Toast ref={toast} />
            <Card title="Product">
                <div className="d-flex justify-content-end mb-2">
                    <Button className='p-button-sm p-button-info' onClick={AddSellProduct} label='Add Product' />
                </div>

                <DataTable paginator paginatorLeft value={AllData} rows={8} loading={loading}>
                    <Column field='VID' header="VID #"></Column>
                    <Column field='bodytype' header="Body"></Column>
                    <Column field='brand' header="Brand"></Column>
                    <Column field='color' header="Color"></Column>
                    <Column field='engine' header="Engine"></Column>
                    <Column field='unique_key' body={ActionsBtn} header="Actions"></Column>
                </DataTable>
            </Card>

            <Dialog header="Add Product" visible={visible} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <form onSubmit={AddProduct} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    VID #
                                </label>
                                <InputText className='w-100' name='vid' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Body Type
                                </label>
                                <InputText className='w-100' name='body' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Color
                                </label>
                                <InputText maxLength={11} className='w-100' name='color' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Brand
                                </label>
                                <InputText maxLength={11} className='w-100' name='brand' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Model
                                </label>
                                <InputText maxLength={11} className='w-100' name='model' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Transmission
                                </label>
                                <InputText maxLength={11} className='w-100' name='transmission' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Engine
                                </label>
                                <InputText maxLength={11} className='w-100' name='engine' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Model Year
                                </label>
                                <InputText maxLength={11} className='w-100' name='year' onChange={handleinput} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Price Product
                                </label>
                                <div className="p-inputgroup">
                                    <span className='p-inputgroup-addon'>₱</span>
                                    <InputNumber value={amount} mode='decimal' className='w-100' name='year' onValueChange={(e) => setValue(e.value)} />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Image
                                </label>
                                <InputText type='file' className='border-0 w-100' onChange={fileHandler} name='file' />
                            </div>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-sm p-button-info' label='Post Product' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog header="Details" visible={visibleDetails} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
            <form onSubmit={UpdateProduct} id='form_reset_update'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    VID #
                                </label>
                                <InputText className='w-100' value={DetailsProduct.vid} name='vid' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Body Type
                                </label>
                                <InputText className='w-100' value={DetailsProduct.bodytype} name='bodytype' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Color
                                </label>
                                <InputText maxLength={11} className='w-100' value={DetailsProduct.color} name='color' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Brand
                                </label>
                                <InputText maxLength={11} className='w-100' value={DetailsProduct.brand} name='brand' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Model
                                </label>
                                <InputText maxLength={11} className='w-100' value={DetailsProduct.model} name='model' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Transmission
                                </label>
                                <InputText maxLength={11} className='w-100' value={DetailsProduct.transmission} name='transmission' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Engine
                                </label>
                                <InputText maxLength={11} className='w-100' value={DetailsProduct.engine} name='engine' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Model Year
                                </label>
                                <InputText maxLength={11} className='w-100' value={DetailsProduct.model_year} name='year' onChange={handleUpdate} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Price Product
                                </label>
                                <div className="p-inputgroup">
                                    <span className='p-inputgroup-addon'>₱</span>
                                    <InputText keyfilter={'money'} name='price' onChange={handleUpdate} value={DetailsProduct.price} />
                                    {/* <InputNumber value={DetailsProduct.price} mode='decimal' className='w-100' name='price' onValueChange={(e) => setNewPrice(e.value)} /> */}
                                </div>
                            </div>
                           
                            <div className="mt-3 d-flex justify-content-end">
                                <Button className='p-button-sm p-button-info' label='Update Product' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>


          
        </div>
    )
}

export default Sell