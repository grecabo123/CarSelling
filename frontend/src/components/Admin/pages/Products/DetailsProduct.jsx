import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function DetailsProduct(props) {

    const [Details, setDetails] = useState([]);
    const [loading, setloading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [btn, setbtn] = useState(true);


    useEffect(() => {
        axios.get(`/api/ProductDetails/${props.data}`).then(res => {
            if (res.data.status === 200) {
                setDetails(res.data.data);
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const BuyProduct = () => {
        setVisible(true)
    }

    const onHide = () => {
        setVisible(false)
    }

    const Amount = (e) => {
        if(e.target.value > Details.price) {
            setbtn(false)
        }
        else{
            setbtn(true)
        }
    } 


    return (
        <div>
            {
                loading ? <Skeleton className='p-skeleton' width='100%' />
                    :
                    <div className="container-fluid">
                        <div className="row">
                            <ul className="list-group">
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Supplier Name:</span>
                                    <span className='text-light'>{Details.supplier_name}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>VID #:</span>
                                    <span className='text-light'>{Details.VID}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Transmission</span>
                                    <span className='text-light'>{Details.transmission}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Body Type</span>
                                    <span className='text-light'>{Details.supplier_name}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Model</span>
                                    <span className='text-light'>{Details.model}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Brand</span>
                                    <span className='text-light'>{Details.brand}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Model Year</span>
                                    <span className='text-light'>{Details.model_year}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Price</span>
                                    <span className='text-light'>₱{Details.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Image</span>
                                </li>
                                <Image src={`http://127.0.0.1:8000/${Details.image}`} preview width='100%' height='300' />
                            </ul>
                            <div className="mt-3 d-flex justify-content-end">
                                <Button onClick={BuyProduct} className='p-button-sm p-button-info' data-id={props.data} label='Buy Product' />
                            </div>
                        </div>

                        <Dialog header="Price" visible={visible} onHide={onHide} position='top' draggable={false} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} >
                            <form>
                                <div className="container">
                                    <div className="row">
                                    <div className="col-lg-12 mb-2">
                                            <label htmlFor="" className="form-label">
                                               Current Price
                                            </label>
                                            <InputText readOnly value={Details.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} keyfilter={'money'} name='money' className='w-100' />
                                        </div>
                                        <div className="col-lg-12 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Price
                                            </label>
                                            <InputText onKeyUp={Amount} keyfilter={'money'} name='money' className='w-100' />
                                        </div>
                                        <div className="mt-3 d-flex justify-content-end" >
                                            <Button className='p-button-info p-button-sm' label='Submit' disabled={btn} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Dialog>
                    </div>
            }
        </div>
    )
}

export default DetailsProduct