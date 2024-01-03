import React, { useRef } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback } from 'react-icons/fc'
import { FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaUserAlt, FaUsers } from 'react-icons/fa'
import { HiOutlineX } from "react-icons/hi";
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios';
import swal from 'sweetalert';
import CustomerRoutes from '../../routes/CustomerRoutes';



function Customer() {

    const history = useHistory();
    const menu = useRef(null);
    
    const Logout = () => {
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_id');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                history.push('/');
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
                    <h4>Customer</h4>
                </div>
                <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li class="nav-item"><br /></li>

                    <li class="nav-title">Pages</li>
    
                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <FcManager className='nav-icon' />List</a>
                    </li>
                    <div class="collapse" id='collapseOne'>
                        <li class="nav-item"><Link class="nav-link" to="/customer/dealer"><FcCheckmark className='nav-icon' />Manufacture Name</Link></li>
                    </div>

                    <li class="nav-item"><Link class="nav-link" to="/customer/sell">
                        <FcFolder className='nav-icon' /> View Sells</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/customer/sell">
                        <FcOpenedFolder className='nav-icon' /> Reserve Form</Link></li>
                    <div class="collapse" id='price'>
                        <li class="nav-item"><Link class="nav-link" to="/customer/AddProduct"> <span className='nav-icon'></span>Add Product</Link></li>
                    </div>


                    <li class="nav-title">Payment</li>
                    <li class="nav-item"><Link class="nav-link" to="/customer/transaction">
                        <FaDollarSign className='nav-icon' /> Transaction History</Link></li>


                    {/* History */}
                    <li class="nav-title">History</li>
                    <li class="nav-item"><Link class="nav-link" to="/customer/logs">
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
                        
                        CustomerRoutes.map((route, idx) => {
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
                    <Redirect from='/customer' to='/customer/dashboard' />
                </Switch>
            </div>
        </>
    )
}

export default Customer