import axios from 'axios';
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function Dashboard() {

    const [loading, setloading] = useState(true)
    const [Manufacture, setmanufacture] = useState([])

    useEffect(() => {
        axios.get(`/api/Manufacture`).then(res => {
            if(res.data.status === 200) {
                setmanufacture(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);

    return (
        <div>
            <Card>
                <DataTable  value={Manufacture} paginator paginatorLeft rows={8} >
                    <Column field='supplier_name' header="Manufacture Name"></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default Dashboard