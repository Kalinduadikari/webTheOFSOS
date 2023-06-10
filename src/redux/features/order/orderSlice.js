import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from './orderService';
import { toast } from 'react-toastify';

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//GET ALL ORDERS
export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI) => {
    try{
      return await orderService.getOrders();
    }catch(error){
      const message = 
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

export const selectOrders = (state) => state.order.orders;
export const selectIsLoading = (state) => state.order.isLoading;

export default orderSlice.reducer;
