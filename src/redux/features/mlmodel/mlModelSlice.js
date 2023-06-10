import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mlModelService from '../../../services/mlModelService';

const initialState = {
    bestSelling: [],
    forecastParaw: [],
    forecastTuna: [],
    isLoading: false,
    error: null,
};

const mlModelSlice = createSlice({
    name: 'mlmodel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBestSelling.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBestSelling.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bestSelling = action.payload;
            })
            .addCase(fetchBestSelling.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchBestSellingProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bestSelling = action.payload;
            })
            .addCase(fetchBestSellingProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchForecastDemandParaw.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchForecastDemandParaw.fulfilled, (state, action) => {
                state.isLoading = false;
                state.forecastParaw = action.payload;
            })
            .addCase(fetchForecastDemandParaw.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchForecastDemandTuna.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchForecastDemandTuna.fulfilled, (state, action) => {
                state.isLoading = false;
                state.forecastTuna = action.payload;
            })
            .addCase(fetchForecastDemandTuna.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const fetchBestSelling = createAsyncThunk(
    'mlmodel/fetchBestSelling',
    async (_, thunkAPI) => {
        try {
            return await mlModelService.getBestSelling();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const fetchBestSellingProducts = createAsyncThunk(
    'mlmodel/fetchBestSellingProducts',
    async (_, thunkAPI) => {
        try {
            return await mlModelService.getBestSellingProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const fetchForecastDemandParaw = createAsyncThunk(
    'mlmodel/fetchForecastDemandParaw',
    async (_, thunkAPI) => {
        try {
            return await mlModelService.forecastDemandParaw();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const fetchForecastDemandTuna = createAsyncThunk(
    'mlmodel/fetchForecastDemandTuna',
    async (_, thunkAPI) => {
        try {
            return await mlModelService.ForecastDemandTuna();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const selectBestSelling = (state) => state.mlmodel.bestSelling;
export const selectForecastParaw = (state) => state.mlmodel.forecastParaw;
export const selectForecastTuna = (state) => state.mlmodel.forecastTuna;
export const selectIsLoading = (state) => state.mlmodel.isLoading;
export const selectError = (state) => state.mlmodel.error;

export default mlModelSlice.reducer;
