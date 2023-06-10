import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import productReducer from '../redux/features/product/productSlice';
import mlModelReducer from './features/mlmodel/mlModelSlice';
import orderReducer from './features/order/orderSlice';
import chatReducer from './features/chat/chatSlice';  // Import the chat reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    mlmodel: mlModelReducer,
    order: orderReducer,
    chat: chatReducer,
  },
  // Enable Redux DevTools extension
  devTools: process.env.NODE_ENV !== 'production',
});
