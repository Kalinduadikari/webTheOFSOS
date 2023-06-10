import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProduct,
  getProduct,
  selectIsLoading,
  selectProduct,
} from '../../redux/features/product/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/productForm/ProductForm';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Fetched product ID:", id);
  const product = useSelector(selectProduct);
  const [editedProduct, setEditedProduct] = useState(product);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
      setImagePreview(product.image.url);
      console.log("Product image:", product.image); 
      setLoading(false);
    }
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editedProduct.name);
    formData.append('price', editedProduct.price);
    formData.append('availability', editedProduct.availability);
    if (productImage) {
      formData.append('image', productImage);
    }

    await dispatch(editProduct({ id, formData }));

    navigate('/dash');
  };

  console.log('editedProduct', editedProduct);

  return (
    <div className="edit-product">
      {isLoading && <Loader />}
      <h3 style={{color: "white"}}>Edit Product</h3>
      {editedProduct && (
  <ProductForm
    key={editedProduct._id}
    product={editedProduct}
    productImage={productImage}
    imagePreview={imagePreview || product.image}
    handleInputChange={handleInputChange}
    handleImageChange={handleImageChange}
    saveProduct={saveProduct}
    formTitle=""
    isEditing={true}
  />
)}

    </div>
  );
  
};

export default EditProduct;
