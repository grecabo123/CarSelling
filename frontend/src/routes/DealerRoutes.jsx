import Logs from "../components/Dealer/pages/Acitivity/Logs";
import Dashboard from "../components/Dealer/pages/Dashboard";
import SellProducts from "../components/Dealer/pages/Sell/SellProducts";
import Transactionhistory from "../components/Dealer/pages/Transaction/Transactionhistory";


const DealerRoutes = [
    {path: "/dealer/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    {path: "/dealer/sell", exact: true, name: "Dashboard", component: SellProducts },
    {path: "/dealer/transaction", exact: true, name: "Dashboard", component: Transactionhistory },
    {path: "/dealer/logs", exact: true, name: "Dashboard", component: Logs }
];

export default DealerRoutes;