import axios from 'axios'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import moment from 'moment';

function Logs() {

    const [ActivityLogs , setLogs] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() =>{
        GetLogs();
    },[])

    const GetLogs = () => {
        axios.get(`/api/GetLogs/${localStorage.getItem('auth_id')}`).then(res => {
            if(res.data.status === 200) {
                setLogs(res.data.logs);
            }
            else{

            }
            setloading(false)
        }).catch((error) => {
            if(error.responses.status === 500) {
                swal("Warning",error.responses.statusText,'warning');
            }
        })
    }

    const DateFormat = (ActivityLogs) => {
        return (
            <span>{moment(ActivityLogs.created_at).format('MMM DD YYYY')}</span>
        )
    }

    return (
        <div >
            <Card title="Logs">
                <DataTable value={ActivityLogs} loading={loading} paginator rows={8} paginatorLeft>
                    <Column field='description' header="Activity"></Column>
                    <Column field='created_at' body={DateFormat} header="Date Created"></Column>
                </DataTable>
            </Card>
        </div>
    )
}

export default Logs