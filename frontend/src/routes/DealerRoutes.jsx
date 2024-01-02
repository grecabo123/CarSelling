import Dashboard from "../components/Dealer/pages/Dashboard";
import SellProducts from "../components/Dealer/pages/Sell/SellProducts";


const DealerRoutes = [
    {path: "/dealer/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    {path: "/dealer/sell", exact: true, name: "Dashboard", component: SellProducts }
];

export default DealerRoutes;