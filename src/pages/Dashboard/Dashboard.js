import React, { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Sidebar from '../../components/sidebar/Sidebar';
import AuthenticatedUserRedirectHook from '../../bespokeConnector/AuthenticatedUserRedirectHook';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../../components/product/productList/ProductList';
import ProductAbstract from '../../components/product/productAbstract/ProductAbstract';
import { getOrders } from '../../redux/features/order/orderSlice';
import './Dashboard.scss';

const Dashboard = () => {
  AuthenticatedUserRedirectHook("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {products, isLoading, isError, message} = useSelector((state) => state.product)
  const { orders } = useSelector((state) => state.order);


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
      dispatch(getOrders());
    }
  
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);


  return (
    <div className='dash-page'>
      <Sidebar>
        <Layout>
          <ProductAbstract products={products} orders={orders} />
          <ProductList products={products} isLoading={isLoading}/>
        </Layout>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
