import Logs from "../components/Dealer/pages/Acitivity/Logs";
import Dashboard from "../components/Dealer/pages/Dashboard";
import Product from "../components/Dealer/pages/ProductsList/Product";
import ReserveData from "../components/Dealer/pages/Reserve/ReserveData";
import SellProducts from "../components/Dealer/pages/Sell/SellProducts";
import Transactionhistory from "../components/Dealer/pages/Transaction/Transactionhistory";


const DealerRoutes = [
    {path: "/dealer/dashboard", exact: true, name: "Dashboard", component: Dashboard },
    {path: "/dealer/sell", exact: true, name: "Dashboard", component: SellProducts },
    {path: "/dealer/transaction", exact: true, name: "Dashboard", component: Transactionhistory },
    {path: "/dealer/logs", exact: true, name: "Dashboard", component: Logs },
    {path: "/dealer/product", exact: true, name: "Dashboard", component: Product },
    {path: "/dealer/reserve", exact: true, name: "Dashboard", component: ReserveData },
];

export default DealerRoutes;