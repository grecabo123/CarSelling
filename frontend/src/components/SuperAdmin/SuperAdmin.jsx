import React, { useRef } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback } from 'react-icons/fc'
import { FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaUserAlt, FaUsers } from 'react-icons/fa'
import axios from 'axios';
import swal from 'sweetalert';
import SuperAdminRoutes from '../../routes/SuperAdminRoutes';


function SuperAdmin() {

    const history = useHistory();
    const menu = useRef(null);
    

    const Logout = () => {
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_id');
                swal('Success', res.data.message, 'success');
                history.push('/login');
            }
        });
    }

    let items = [
        { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        { label: 'My Account', icon: 'pi pi-fw pi-user' },
        // { label: <span>Sidebar</span>, icon: 'pi pi-fw pi-user' },
        { label: <span className='text-danger fw-bold' onClick={Logout}>Logout</span>, icon: 'pi pi-fw pi-power-off' },
    ];

    return (
        <>
             <div class="sidebar sidebar-dark sidebar-fixed" id="sidebar">
                <div class="sidebar-brand d-none d-md-flex">
                    <h4>Manufacture</h4>
                </div>
                <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li class="nav-item"><br /></li>

                    <li class="nav-title">Pages</li>
                    <li class="nav-item"><a class="nav-link" href="/admin">
                        <FcHome className='nav-icon' /> Dashboard</a></li>   

                    {/* History */}
                    <li class="nav-title">History</li>
                    <li class="nav-item"><Link class="nav-link" to="/admin/logs">
                        <FcSurvey className='nav-icon' /> Activity Logs</Link></li>

                  
                </ul>
            </div>

      

            <div class="wrapper d-flex flex-column min-vh-100">
                <header class="header  mb-4">
                    <div class="container-fluid">
                        <FaBars className='text-white d-md-none' style={{ cursor: "pointer" }} size={25} onClick={(e) => setVisible(true)} />


                        <ul class="header-nav ms-auto">
                        </ul>
                        <ul class="header-nav ms-3">
                            <Menu model={items} id="popup_menu" popup ref={menu} />
                            <Avatar className='text-white fw-bold' onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup shape='square' label='A' size='large' />
                        </ul>
                    </div>

                </header>

                <Switch>
                    {
                        
                        SuperAdminRoutes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => <route.component {...props} />}
                                    />
                                )
                            )
                        })
                    }
                    <Redirect from='/cars' to='/cars/dashboard' />
                </Switch>
            </div>
        </>
    )
}

export default SuperAdmin