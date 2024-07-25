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
            {/*
                1) Что будем менять(изменить)?  Ответ: categoryId 
                2) Что передавать?  action.payload  В payload будет храниться какое то значение
                */}
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
// После создание методов, нужно экспортировать
//Если мы хотим вытащить какие то экшены, то делем это.
export const { setCategoryId, setSortType, setCurrentPage, setFilter} = filterSlice.actions;

// По умолчани. мы будем экспортировать reducer
export default filterSlice.reducer;