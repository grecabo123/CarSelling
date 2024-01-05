import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React from 'react'

function Reserve() {
    return (
        <div>
            <Panel header="Reserve Form">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="" className="form-label">
                                Name:
                            </label>
                            <InputText className='w-100' name='' />
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    )
}

export default Reserve