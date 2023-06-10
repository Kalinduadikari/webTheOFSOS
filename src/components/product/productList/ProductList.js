import React, { useState } from 'react';
import './ProductList.scss';
import Loader from '../../loader/Loader';
import { BsEyeFill } from 'react-icons/bs';
import { FcDeleteDatabase, FcEditImage } from 'react-icons/fc';
import SearchEngine from '../../search/SearchEngine';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { deleteProducts, getProducts, getProduct } from '../../../redux/features/product/productSlice';
import ConfirmModal from '../../confirmModal/ConfirmModal';
import ProductView from '../productView/ProductView';
import { useNavigate } from 'react-router-dom';



const ProductList = ({ products, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [viewingProductId, setViewingProductId] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(0);
  };

  const showDeleteConfirm = (id) => {
    setDeletingProductId(id);
    setShowConfirmModal(true);
  };

  const dProduct = async (id) => {
    await dispatch(deleteProducts(id));
    await dispatch(getProducts());
    setShowConfirmModal(false);
  };
  

  const viewProduct = async (id) => {
    await dispatch(getProduct(id));
    setViewingProductId(id);
  };
  
  const closeProductView = () => {
    setViewingProductId(null);
  };

 
  
  
  return (
    <div className="product-list">
      <hr />
      <div className="header">
        <h3 style={{color:"#ededed"}}>Inventory Items</h3>
        <div className="search-wrapper">
        <h3 style={{color:"#ededed"}}>Search Products</h3>
          <SearchEngine onSearch={handleSearch} />
        </div>
      </div>
      {isLoading && <Loader />}
      <div className="product-grid">
        {!isLoading && filteredProducts.length === 0 ? (
          <p>-- No product found, please add a product</p>
        ) : (
          filteredProducts
            .slice(
              currentPage * productsPerPage,
              (currentPage + 1) * productsPerPage
            )
            .map((product) => {
              const { _id, name, price, availability } = product;
              return (
                <div key={_id} className="product-card">
                  <div className="product-card__header">
                    <h4 style={{color: "#ededed"}}>{name}</h4>
                  </div>
                  <div className="product-card__content">
                    <p style={{color: "#ededed"}}><strong>Price:</strong> Rs. {price}</p>
                    <p style={{color: "#ededed"}}><strong>Availability:</strong> {String(availability)}</p>
                  </div>
                  <div className="product-card__actions">
                  <span onClick={() => viewProduct(_id)}>
                  <BsEyeFill size={25} color="green" />
                </span>

                    
                     <span onClick={() => navigate(`/editProduct/${_id}`)}>
                      <FcEditImage size={25} color="green" />
                    </span>

                    <span>
                      <FcDeleteDatabase size={25} onClick={() => showDeleteConfirm(_id)} />
                    </span>
                  </div>
                </div>
              );
            })
        )}
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'pagination__button--active'}
        pageClassName={'pagination__button'}
        previousClassName={'pagination__button'}
        nextClassName={'pagination__button'}
        breakClassName={'pagination__break'}
        />
      <ConfirmModal
        isOpen={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={() => dProduct(deletingProductId)}
      />
      {viewingProductId && (
        <ProductView
          onClose={closeProductView}
          productId={viewingProductId}
        />
      )}
    </div>
  );
};

export default ProductList;

