import React, { useState } from 'react';
import './ProductForm.scss';
import Sidebar from '../sidebar/Sidebar';
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/features/product/productSlice';


const ProductForm = ({
  product,
  productImage,
  imagePreview,
  handleInputChange,
  handleImageChange: handleImageChangeProp,
  saveProduct,
  formTitle,
  isEditing,
}) => {
  const [isExpanded, setIsExpanded] = useState(isEditing && productImage != null);
  const isLoading = useSelector(selectIsLoading)

  const handleImageChange = (e) => {
    handleImageChangeProp(e);
    setIsExpanded(true);
  };

  console.log('Rendering ProductForm component');

  return (
    <div className="add-productz">
      <Sidebar>
      {isLoading && <Loader />}
        <div className={`card ${isExpanded ? 'expanded' : ''}`}>
        <h2 className="form-title">{formTitle}</h2>
          <form onSubmit={saveProduct} className="product-form">
            <div className="group">
              <label>Product Image </label>
              <code style={{color: "white", fontSize: "10px"}}>
                 Supported formats: jpeg, png
              </code>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="file-input"
              />
             ...
              {isEditing && productImage.url ? (
                <div className="image-preview">
                  <img src={productImage.url} alt="product" />
                </div>
              ) : (
                imagePreview != null ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="product" />
                  </div>
                ) : (
                  <p style={{color: 'white'}}>No image set for this product.</p>
                )
              )}



            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  placeholder="Product name"
                  name="name"
                  value={product?.name}
                  onChange={handleInputChange}
                  className="text-input"
                />
              </div>
              <div className="form-group">
                <label>Product Price:</label>
                <input
                  type="text"
                  placeholder="Product price"
                  name="price"
                  value={product?.price}
                  onChange={handleInputChange}
                  className="text-input"
                />
              </div>
            </div>
            <div className="form-group">
                <label>Product Availability:</label>
                <input
                    type="checkbox"
                    name="availability"
                    checked={product?.availability}
                    onChange={handleInputChange}
                    className="checkbox-input"
                />
                <span className="checkbox-label">Available</span>
                </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </Sidebar>
    </div>
  );
};

export default ProductForm;
