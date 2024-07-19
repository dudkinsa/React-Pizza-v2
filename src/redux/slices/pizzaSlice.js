import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(`https://-66865ecb83c983911b01f11a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

    return data;
});

const initialState = {
    items: [],
    stutus: 'loading',  //loading | success | error                  //автор изменил вместо isLoading
}


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {

        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.stutus = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.stutus = 'success';
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.stutus = 'error';
                state.items = [];
            })

    },

});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;