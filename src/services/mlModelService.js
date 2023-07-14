import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_OFSOS_BACKEND_URL;
const API_URL = `${BACKEND_URL}/mlmodel/`;

//GET BEST SELLING PRODUCTS COMBINATIONS
const getBestSelling = async () => {
    const response = await axios.get(`${API_URL}bestselling`);
    return response.data;
};

//RANK BEST SELLING PRODUCTS
const getBestSellingProducts = async () => {
    const response = await axios.get(`${API_URL}bestsellingproducts`);
    return response.data;
};

//FORECAST THE DEMAND OF PARAW
const forecastDemandParaw = async () => {
    const response = await axios.get(`${API_URL}forecast/PARAW`);
    return response.data;
};

//FORECAST THE DEMAND OF TUNA
const ForecastDemandTuna = async () => {
    const response = await axios.get(`${API_URL}forecast/TUNA`);
    return response.data;
};




const mlModelService = {
    getBestSelling,
    getBestSellingProducts,
    forecastDemandParaw,
    ForecastDemandTuna, 
};

export default mlModelService;
