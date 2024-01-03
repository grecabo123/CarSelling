import Logs from "../components/SuperAdmin/pages/Activity/Logs";
import Dashboard from "../components/SuperAdmin/pages/Dashboard";


const SuperAdminRoutes = [
    {path: "/cars/dashboard", exact: true, name: "Super", component: Dashboard},
    {path: "/cars/logs", exact: true, name: "Super", component: Logs},
];

export default SuperAdminRoutes;