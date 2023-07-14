import axios from "axios";

const BACKEND_URL = "https://ofsosnode-api.onrender.com/api"
const API_URL = `${BACKEND_URL}/orders/`;

//FETCH ALL ORDERS
const getOrders = async () => {
  const response = await axios.get(API_URL + 'getOrders');
  console.log(response.data);  // Add this line
  return response.data;
};

const orderService = {
  getOrders,
};

export default orderService;
