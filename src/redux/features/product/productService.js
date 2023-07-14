import axios from "axios";



const BACKEND_URL = process.env.REACT_APP_OFSOS_BACKEND_URL;


const API_URL = `${BACKEND_URL}/products/`;

//CREATE NEW PRODUCT 
const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

//GET ALL PRODUCTS
const getProducts = async () => {
    const response = await axios.get(`${API_URL}getAllProducts`);
    return response.data;
};

//DELETE PRODUCT
const deleteProducts = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

// GET SINGLE PRODUCT
const getProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
  };
  
  // EDIT PRODUCT
const editProduct = async (id, formData) => {
    const response = await axios.put(`${API_URL}${id}`, formData);
    return response.data;
  };

const productService = {
    createProduct,
    getProducts,
    deleteProducts,
    getProduct,
    editProduct, 
};

export default productService;