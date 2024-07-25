import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice'; //Вытаскиваем файл фильтрации
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
    // работник
    reducer: {
        filter,  // типа оаботник отвечающий за фильтрацию
        cart,
        pizza,
    },
})

