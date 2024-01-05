import axios from 'axios'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

function ReserveData() {

    const [Report, setReport] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/ReportData/${localStorage.getItem('auth_id')}`).then(res => {
            if(res.data.status === 200) {
                setReport(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);


    const AnnualFormat = (Report) => {
        return (
            <span>₱{Report.annual_income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        )
    }

    return (
        <div>
            <Card title="Reserve Form">
                <DataTable value={Report} paginator paginatorLeft rows={9} loading={loading}>
                    <Column field='name' header="Name"></Column>
                    <Column field='product_id' header="VID #"></Column>
                    <Column field='description' header="Description"></Column>
                    <Column field='annual_income' body={AnnualFormat} header="Annual Income"></Column>
                    <Column field='reserve_date' header="Reserve Date"></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default ReserveData