import Logs from "../components/Customer/pages/Activity/Logs";
import Dashboard from "../components/Customer/pages/Dashboard";
import Sell from "../components/Customer/pages/Product/Sell";
import Transaction from "../components/Customer/pages/TransactionHistory/Transaction";

const CustomerRoutes = [
    {path: "/customer/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    {path: "/customer/logs", exact: true, name: "Dashboard", component: Logs },
    {path: "/customer/transaction", exact: true, name: "Dashboard", component: Transaction },
    {path: "/customer/sell", exact: true, name: "Dashboard", component: Sell },
];

export default CustomerRoutes;