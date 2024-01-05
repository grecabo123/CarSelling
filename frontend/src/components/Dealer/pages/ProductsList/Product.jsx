import axios from 'axios'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'
import DetailsProduct from '../../../Admin/pages/Products/DetailsProduct'
import { Badge } from 'primereact/badge'
import Resell from './Resell'

function Product() {

    const [Product, setProduct] = useState([]);
    const [loading, setloading] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [ProductDetails, setProductDetails] = useState({
        uniq: "",
        status: "",
    });


    useEffect(() => {
        axios.get(`/api/MyProduct`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }, [])

    const Actions = (Product) => {
        return (
            <span><Button onClick={GetDetails} data-status={Product.is_dealer_sold} className='p-button-sm p-button-info' data-unique={Product.unique_key} label='Details' /></span>
        )
    }

    const GetDetails = (e) => {
        setVisibleModal(true)
        setProductDetails({
            uniq: e.currentTarget.getAttribute('data-unique'),
            status: e.currentTarget.getAttribute('data-status'),
        });    
    }


    const onHide = (e) => {
        setVisibleModal(false)
    }

    const Product_Stat = (Product) => {
        return (
            <>
                {
                    Product.is_customer_sold === 1 ? <Badge severity={"success"} value={"Sold"}  /> : <Badge severity={'danger'} value={"Not Sold"} />
                }
            </>
        )
    }

    return (
        <div>
            <Card title="Product Sell">
                <DataTable loading={loading} value={Product} rows={8} paginator paginatorLeft>
                    <Column field='supplier_name' header="Supplier Name"></Column>
                    <Column field='VID' header="VID #"></Column>
                    <Column field='transmission' header="Transmission"></Column>
                    <Column field='bodytype' header="Body Type"></Column>
                    {/* <Column field='is_customer_sold' body={Product_Stat} header="Product Status"></Column> */}
                    <Column field='unique_key' body={Actions} header="Action"></Column>
                </DataTable>
            </Card>



            <Dialog header="Details" visible={visibleModal} position='top' draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                {/* <DetailsProduct data={ProductDetails} /> */}
                <Resell data={ProductDetails} />
            </Dialog>
        </div>
    )
}

export default Product