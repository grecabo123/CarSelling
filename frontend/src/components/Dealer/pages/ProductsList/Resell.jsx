import axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function Resell(props) {


    const [Details, setDetails] = useState([]);
    const [loading, setloading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [btn, setbtn] = useState(true);
    const [amountbuy, setbuy] = useState({
        money: "",
    });
    const [DealerPrice, setDealer] = useState([])
    const [AmountSell, setAmount] = useState();

    useEffect(() => {
        axios.get(`/api/ProductDetailsDealer/${props.data.uniq}`).then(res => {
            if (res.data.status === 200) {
                setDetails(res.data.data);
                setDealer(res.data.details);
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const handleinput = (e) => {
        e.persist();
        setbuy({...amountbuy, [e.target.name] : e.target.value});
    }

    const BuyProduct = () => {
        setVisible(true)
    }

    const onHide = () => {
        setVisible(false)
    }

    const Amount = (e) => {
        if(e.target.value > Details.price) {
            setbtn(false)
            // setbuy({
            //     money: e.target.value
            // })
        }
        else{
            setbtn(true)
        }
    } 

    const BuyProductModal = (e) => {
        e.preventDefault();

        const data = {
            id: localStorage.getItem('auth_id'),
            amount: AmountSell,
            uniq: props.data.uniq,   
        }

        axios.put(`/api/SellProducts`,data).then(res => {
            if(res.data.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                },1500)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })


    }


    return (
        <div>
            {
                loading ? <Skeleton className='p-skeleton' width='100%' />
                    :
                    <div className="container-fluid">
                       <form onSubmit={BuyProductModal}>
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
                                    <span className='text-light'>Manufacture Price</span>
                                    <span className='text-light'>₱{Details.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Dealer Price</span>
                                    <span className='text-light'>₱{Details.dealer_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Customer Price</span>
                                    {
                                        DealerPrice.dealer_price === 0.00 ? 
                                        <InputText className='p-inputtext-sm' name='customer_price' keyfilter={'int'} value={AmountSell} onChange={(e) => setAmount(e.target.value)} />
                                        :
                                    <span className='text-light'>₱{ DealerPrice.dealer_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    }
                                    {/* <span className='text-light'>₱{Details.dealer_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> */}
                                </li>
                                <li className="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center">
                                    <span className='text-light'>Image</span>
                                </li>
                                <Image src={`http://127.0.0.1:8000/${Details.image}`} preview width='100%' height='300' />
                            </ul>
                            <div className="mt-3 d-flex justify-content-end">
                                   
                                <Button  className='p-button-sm p-button-info' data-id={props.data} label='Sell Product' />
                                
                            </div>
                        </div>
                       </form>

                        <Dialog header="Price" visible={visible} onHide={onHide} position='top' draggable={false} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} >
                            <form onSubmit={BuyProductModal}>
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
                                            <InputText onKeyUp={Amount} onChange={handleinput} keyfilter={'money'} name='money' className='w-100' />
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

export default Resell