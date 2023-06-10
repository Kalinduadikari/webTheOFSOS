import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify';


const initialState = {
        product: null,
        products: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
    };

    //CREATE NEW PRODUCT
   export const createProduct = createAsyncThunk(
        "products/create",
        async (formData, thunkAPI) => {
            try{
                return await productService.createProduct(formData);
            }catch(error){
                const message = 
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(message);
                return thunkAPI.rejectWithValue(message)
            }
        }
    );

        //GET ALL PRODUCTS
   export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        try{
            return await productService.getProducts();
        }catch(error){
            const message = 
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
);
        
        //DELETE PRODUCT
        export const deleteProducts = createAsyncThunk(
            "products/delete",
            async (id, thunkAPI) => {
                try{
                    return await productService.deleteProducts(id);
                }catch(error){
                    const message = 
                    (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    console.log(message);
                    return thunkAPI.rejectWithValue(message)
                }
            }
        );


               
            // GET SINGLE PRODUCT
        export const getProduct = createAsyncThunk(
            "products/get",
            async (id, thunkAPI) => {
            try {
                return await productService.getProduct(id);
            } catch (error) {
                const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(message);
                return thunkAPI.rejectWithValue(message);
            }
            }
        );

                // EDIT PRODUCT
        export const editProduct = createAsyncThunk(
            "products/edit",
            async ({ id, formData }, thunkAPI) => {
            try {
                return await productService.editProduct(id, formData);
            } catch (error) {
                const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(message);
                return thunkAPI.rejectWithValue(message);
            }
            }
        );
        
  


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.products.push(action.payload);
            toast.success("Product added successfully");
            
        })

        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error = action.payload;
            
        })

        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.products = (action.payload);
        })
        

        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error = action.payload;
            
        })

        .addCase(deleteProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Product has been deleted")
        })
        

        .addCase(deleteProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error = action.payload;
            
        })

        .addCase(getProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.product = action.payload;
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })

          .addCase(editProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Product updated successfully");
            const index = state.products.findIndex(
              (product) => product._id === action.payload._id
            );
            state.products[index] = action.payload;
          })
          .addCase(editProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          });
          
          
          
  }
});

export const selectProduct = (state) => state.product.product;

export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;