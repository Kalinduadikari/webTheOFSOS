import React, { useState } from 'react'
import ProductForm from '../../components/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import './AddProduct.scss';



const initialState = {
    name: "",
    price: "",
    availability: false,
}

const AddProduct = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [product, setProduct] = useState(initialState)
        const [productImage, setProductImage] = useState("")
        const [imagePreview, setImagePreview] = useState(null)

        const isLoading = useSelector(selectIsLoading)

        const {name, price, availability} = product

        const handleInputChange = (e) => {
            const { name, value, type, checked } = e.target; // Add type and checked
            setProduct(prevProduct => ({
              ...prevProduct,
              [name]: type === 'checkbox' ? checked : value, // Handle checkbox input
            }));
          };

        const handleImageChange = (e) => {
            setProductImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        };

       
         const saveProduct = async (e) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append("name", name)
            formData.append("price", price)
            formData.append("availability", availability)
            formData.append("image", productImage)

            console.log(...formData);
            
            await dispatch(createProduct(formData));

            navigate("/dash");
            
         };
        


         return (
          <div className="add-product">
            {isLoading && <Loader />}
            <h3 style={{color: "white"}}>Add New Product</h3>
            <ProductForm
              product={product}
              productImage={productImage}
              imagePreview={imagePreview}
              handleInputChange={handleInputChange}
              handleImageChange={handleImageChange}
              saveProduct={saveProduct}
              formTitle=""
              isEditing={false}
            />
          </div>
        );        
        };

export default AddProduct