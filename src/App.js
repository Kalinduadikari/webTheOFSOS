import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Dashboard from './pages/Dashboard/Dashboard';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/addProduct/AddProduct';
import EditProduct from './pages/editProduct/EditProduct';
import BestSelling from './pages/MlModel/BestSelling';
import BestProducts from './pages/MlModel/BestProducts';
import ForecastDemandParaw from './components/forecastDemand/Paraw';
import ForecastDemandTuna from './components/forecastDemand/Tuna';
import Orders from './pages/Orders/Order';
import OrderDetails from './pages/Orders/OrderDetails';
import Chats from './pages/chatInterface/chatScreen';


axios.defaults.withCredentials = true;


function App() {
  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:resetToken" element={<Reset />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/best" element={<BestSelling />} />
        <Route path="/bestpr" element={<BestProducts />} />
        <Route path="/besr" element={<ForecastDemandParaw/>} />
        <Route path="/tu" element={<ForecastDemandTuna/>} />
        <Route path="/order" element={<Orders/>} />
        <Route path="/order/:id" element={<OrderDetails/>} />
        <Route path="/chat" element={<Chats/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
