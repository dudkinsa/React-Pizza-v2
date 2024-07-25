import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    // reducers Это action, которые будут отвечать за сохранение соротровки, 
    // фильртции и др действий
    reducers: {
        // Теперь мы должны сделать метод, который будет отвечать тип 
        // ID нашей category  setCategoryId (название могут быть любые)
        setCategoryId: (state, action) => {
            // console.log(action);
            state.categoryId = action.payload;
        },

        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },

        setSortType: (state, action) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilter: (state, action) => {
            state.currentPage = Number(action.payload.currentPage);
           
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        }
    }
});

export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSortType, setCurrentPage, setFilter, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;