import React from 'react';
import './ProductAbstract.scss';
import { BsFillCartXFill, BsExclamationDiamondFill } from 'react-icons/bs';
import { FcSalesPerformance, FcCurrencyExchange, FcInfo, FcMoneyTransfer } from "react-icons/fc";
import { FaStore } from "react-icons/fa";


const ProductAbstract = ({ products, orders }) => {
  const totalProducts = products.length;

  const outOfStockProducts = products.filter(
    (product) => product.availability === false
  ).length;

  const totalSales = products.reduce(
    (total, product) => total + product.sales, 0
  );

  const totalRevenue = products.reduce(
    (total, product) => total + (product.sales * product.price), 0
  );

  const totalValueOfStock = products.reduce(
    (total, product) => total + (product.stock * product.price), 0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock < 10
  ).length;

  const totalOrders = orders.length;

  return (
    <div className="product-abstract">
      <div className="summary-item">
        <h3>Total Products</h3>
        <div className="summary-item-content">
          <FaStore size={30} />
          <p>{totalProducts}</p>
        </div>
      </div>
      <div className="summary-item">
        <h3>Out of Stock</h3>
        <div className="summary-item-content">
          <BsFillCartXFill color='#EB0A1E' size={30} />
          <p>{outOfStockProducts}</p>
        </div>
      </div>
      <div className="summary-item">
        <h3>Total Sales</h3>
        <div className="summary-item-content">
          <FcSalesPerformance size={30} />
          <p>{totalSales}g</p>
        </div>
      </div>
      <div className="summary-item">
        <h3>Total Revenue</h3>
        <div className="summary-item-content">
          <FcMoneyTransfer size={30} />
          <p>Rs.{totalRevenue}</p>
        </div>
      </div>
      <div className="summary-item">
        <h3>Total Value of Stock</h3>
        <div className="summary-item-content">
          <FcCurrencyExchange size={30} />
          
          <p>{totalValueOfStock}</p>
        </div>
      </div>
      <div className="summary-item">
        <h3>Low Stock Products</h3>
        <div className="summary-item-content">
          <BsExclamationDiamondFill size={30} />
          <p>{lowStockProducts}</p>
        </div>
      </div>
      <div className="summary-item">
        <h3>Total Orders</h3>
        <div className="summary-item-content">
          <FcInfo size={30} />
          <p>{totalOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductAbstract;
