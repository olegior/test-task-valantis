import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, getUnique } from "../api";

export const getProducts = createAsyncThunk('products/get',
    async ({ action, params }) => {
        const ids = await getData(action, params)
        const products = await getData('get_items', { ids });
        return getUnique(products);
    }
)

export const getInitial = createAsyncThunk('initial/get',
    async () => {
        const data = getUnique(await getData('get_ids'));
        const brands = getUnique(await getData('get_fields', { field: 'brand' }));
        return {
            brands,
            totalLength: data.length,
        }
    }
)

export const searchProducts = createAsyncThunk('products/search',
    async (field) => {
        const ids = await getData('filter', { ...field });
        const products = await getData('get_items', { ids });
        return getUnique(products);
    }
)


const initialState = {
    isLoading: false,
    data: [],
    error: {},
    filtered: false,
    filters: {},
    brands: [],
    totalLength: 0,
    page: 1,
    showFilter: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters = action.payload;
            state.showFilter = false;
            // state.filtered = true;
            state.page = 1;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        changeShowFilter: (state) => {
            state.showFilter = !state.showFilter;
        },
        resetProductsSearch: (state) => {
            state.page = 1;
            state.filtered = false;
            state.isLoading = true;
            state.data = []
        },
    },
    extraReducers: (builder) => builder
        .addCase(getInitial.pending, (state) => {
            state.error = {};
        })
        .addCase(getInitial.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.totalLength = action.payload.totalLength;
        })
        .addCase(getInitial.rejected, (state, action) => {
            state.error = action.error;
        })
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
            state.error = {};
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            if (!state.filtered)
                state.data = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.error = action.error;
        })
        .addCase(searchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = {};
        })
        .addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.filtered = true;
        })
        .addCase(searchProducts.rejected, (state, action) => {
            state.error = action.error;
        })

})


export const { setPage, resetProductsSearch, setFilter, changeShowFilter } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;