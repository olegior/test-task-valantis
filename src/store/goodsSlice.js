import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../helpers/api";
import { getUnique } from "../helpers/getUnique";

export const getGoods = createAsyncThunk('goods',
    async ({ params }, { dispatch }) => {
        try {
            return getUnique(await getData('get_ids', params)
                .then(ids => getData('get_items', { ids: getUnique(ids) })))
        }
        catch {
            dispatch(getGoods({ params }))
            dispatch(setLoading())
        }
    }
)

export const getInitial = createAsyncThunk('initial',
    async (_, { dispatch }) => {
        try {
            return (await getData('get_ids', {})
                .then(ids => ({
                    totalLength: getUnique(ids).length
                }))
                .then(async (result) => {
                    result.brands = getUnique(await getData('get_fields', { field: 'brand' }))
                    return result
                }))
        }
        catch {
            dispatch(getInitial())
            dispatch(setLoading())

        }
    }
)

export const searchGoods = createAsyncThunk('search',
    async (field, { dispatch, getState }) => {
        try {
            const { page } = getState().goods;
            const offset = 50 * (+page - 1);

            return await getData('filter', { ...field })
                .then(async (allIds) => {
                    const result = {};
                    result.totalLength = getUnique(allIds).length;
                    result.data = getUnique(await getData('get_items', {
                        ids: allIds.slice(offset, offset + 50)
                    }))
                    return result;
                })

        } catch {
            dispatch(searchGoods(field))
            dispatch(setLoading())
        }
    }
)

const initialState = {
    isLoading: false,
    data: [],
    filtered: false,
    filters: {},
    brands: [],
    defaultLength: 0,
    totalLength: 0,
    page: null,
    showFilter: false,
}

const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters = action.payload;
            state.showFilter = false;
            state.filtered = true;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLoading: (state) => {
            state.isLoading = true;
            console.log('loading ');
        },
        changeShowFilter: (state) => {
            state.showFilter = !state.showFilter;
        },
        resetGoodsSearch: (state) => {
            state.filtered = false;
            state.filters = {};
        },
    },
    extraReducers: (builder) => builder
        .addCase(getInitial.fulfilled, (state, action) => {
            state.brands = action.payload?.brands;
            state.totalLength = state.defaultLength = action.payload?.totalLength;
        })
        .addCase(getGoods.fulfilled, (state, action) => {
            state.isLoading = false;
            state.totalLength = state.defaultLength;
            state.data = action.payload;
        })
        .addCase(searchGoods.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload?.data;
            state.totalLength = action.payload?.totalLength;
            state.filtered = true;
        })
        .addMatcher(({ type }) => type.includes('pending'), (state) => {
            state.isLoading = true;
        })
})


export const { setPage, resetGoodsSearch, setFilter, changeShowFilter, setLoading } = goodsSlice.actions;
export const goodsReducer = goodsSlice.reducer;