import React from 'react';
import qs from 'qs'; //
//useSelector - исползуется как useContent
import { useSelector, useDispatch } from 'react-redux';//
import { useNavigate } from 'react-router-dom';//

import Categories from '../components/Categories/Categories';//
import Sort from '../components/Sort/Sort';//
import Pizzablock from '../components/PizzaBlock/Pizzablock';//
import Skeleton from '../components/PizzaBlock/Skeleton';//
import Pagination from '../components/Pagination/Pagination';//


import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';//
import { SearchContext } from '../App';//

// import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'; //15 урок не работает (пропустил)


// import dataBasePizzas from '../assets/pizza.json';



const Home = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const categoryId = useSelector((state) => state.filter.categoryId);  // С помощью хука useSelector вытаскиваем все наше хранилище из store.js
    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const currentPage = useSelector((state) => state.filter.currentPage);
    //можно сократить код filter
    // const { categoryId, sort } = useSelector((state) => state.filter);
    // const sortType = sort.sortProperty;

    const { searchValue } = React.useContext(SearchContext);

    const [dataBasePizzas, setDataBasePizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    // const [currentPage, setCurrentPage] = React.useState(1);


    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }






    /* 15 урок не работает (пропустил)
    
        React.useEffect(() => {
            if (window.location.search) {
                const params = qs.parse(window.location.search.substring(1));
                console.log(...params);
                const sort = listMenu.find(obj => obj.sortProperty === params.sortProperty);
                console.log(listMenu);
    
                dispatch(
                    setFilters({
                        ...params,
                        sort,
                    })
                )
            }
        }, []);
    
    */



    // Способ просмтора данные из сервера  базы данных  с помощью Fetch.  Fetch это типа console log
    // fetch('https://66865ecb83c983911b01f11a.mockapi.io/items').then(res => {
    //   return res.json();
    // }).then(json => {
    //   console.log(json);
    // });


    // Этот код рабочий, но у него есть проблема. Этот код бесконечно запрасывает дпнные из базы из сервера. 
    // Чтобы сделать единсственный запрос для этого  изспользуется  хук  useEffect

    // fetch('https://66865ecb83c983911b01f11a.mockapi.io/items')
    //   .then(res => res.json())
    //   .then(json => {
    //     setDataBasePizzas(json);
    //   });
    // });


    React.useEffect(() => {
        setIsLoading(true);

        const sortBy = sortType.replace('+', '');
        const order = sortType.includes('+') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // метод fetch   уберем, будем использовать axios

        // fetch(`https://66865ecb83c983911b01f11a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then(res => res.json())
        //     .then(json => {
        //         setDataBasePizzas(json);
        //         setIsLoading(false);
        //     });


        // используем axios
        axios.get(
            `https://66865ecb83c983911b01f11a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then(res => {
                setDataBasePizzas(res.data);
                setIsLoading(false);
            })

        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sortType,
            categoryId,
            currentPage,
        });

        // console.log(queryString);
    }, [categoryId, sortType, searchValue, currentPage]);






    /* 15 урок не работает (пропустил)
        React.useEffect(() => {
            const QueryString = qs.stringify({
                sortProperty: sortType,
                // sortType,
                categoryId,
                currentPage,
            });
            navigate(`?${QueryString}`);
        }, [categoryId, sortType, currentPage]);
    */

    const pizzas = dataBasePizzas
        .map((pizza) => <Pizzablock
            key={pizza.id}
            {...pizza} //сократил с помощью spread оператора вместо нижнего кода
        // title={pizza.title}
        // price={pizza.price}
        // imageUrl={pizza.imageUrl}
        // sizes={pizza.sizes}
        // types={pizza.types}
        />);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);



    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items"> {isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>

    )
}

export default Home