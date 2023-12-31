import DealerAccount from "../components/Admin/pages/Accounts/DealerAccount";
import Logs from "../components/Admin/pages/ActivityLogs/Logs";
import Dashboard from "../components/Admin/pages/Dashboard";
import Sell from "../components/Admin/pages/Products/Sell";
import TransactionHistory from "../components/Admin/pages/Transaction/TransactionHistory";
import Sells from "../components/Admin/pages/View/Sells";


const AdminRoutes = [
    {path: "/admin/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    {path: "/admin/dealer", exact: true, name: "Dealer", component: DealerAccount },
    {path: "/admin/AddProduct", exact: true, name: "Add", component: Sell },
    {path: "/admin/logs", exact: true, name: "Add", component: Logs },
    {path: "/admin/transaction", exact: true, name: "Add", component: TransactionHistory },
    {path: "/admin/sell", exact: true, name: "Add", component: Sells },
];

export default AdminRoutes;