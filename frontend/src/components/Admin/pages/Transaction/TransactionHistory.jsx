import axios from 'axios';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'

function TransactionHistory() {

    const [transactiondata, setTransaction] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios.get(`/api/TransactionSeller/${localStorage.getItem('auth_id')}`).then(res => {
            if(res.data.status === 200) {
                setTransaction(res.data.data)
            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    },[]);

    const moneyformat = (transactiondata) => {
        return (
            <>
                <span>₱{transactiondata.current_price.toFixed(2)}</span>
            </>
        )
    }

    
    const dealer_format = (transactiondata) => {
        return (
            <>
                <span>₱{transactiondata.sold_price.toFixed(2)}</span>
            </>
        )
    }

    return (
        <div>
            <Card title="Transaction History">
            <DataTable value={transactiondata} loading={loading} rows={9} paginator paginatorLeft >
                <Column field='supplier_name' header="Supplier"></Column>
                <Column field='VID' header="VID #"></Column>
                <Column field='current_price' body={moneyformat} header="Product Price"></Column>
                <Column field='sold_price' body={dealer_format} header="Dealer Price"></Column>
            </DataTable>
            </Card>
        </div>
    )
}

export default TransactionHistory