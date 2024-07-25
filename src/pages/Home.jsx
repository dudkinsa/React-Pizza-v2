import React from 'react';
import qs from 'qs';
//useSelector - исползуется как useContent
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories/Categories';
import Sort, { listMenu } from '../components/Sort/Sort';
import Pizzablock from '../components/PizzaBlock/Pizzablock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

import { setCategoryId, setCurrentPage, setFilter } from '../redux/slices/filterSlice';
import axios from 'axios';
import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

// import dataBasePizzas from '../assets/pizza.json';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { items, stutus } = useSelector((state) => state.pizza);
    const categoryId = useSelector((state) => state.filter.categoryId);  // С помощью хука useSelector вытаскиваем все наше хранилище из store.js
    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const currentPage = useSelector((state) => state.filter.currentPage);
    const searchValue = useSelector((state) => state.filter.searchValue);


    //можно сократить код filter
    // const { categoryId, sort } = useSelector((state) => state.filter);
    // const sortType = sort.sortProperty;

    // const { searchValue } = React.useContext(SearchContext); //Убираем Context

    // const [dataBasePizzas, setDataBasePizzas] = React.useState([]); // В 17 уроке - удалил
    // const [isLoading, setIsLoading] = React.useState(true); // в 17 уроке перенесли в redux pizzaSlice
    // const [currentPage, setCurrentPage] = React.useState(1);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        // setIsLoading(true); // в 17 уроке перенесли в redux pizzaSlice

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
        // await axios.get(
        //     `https://66865ecb83c983911b01f11a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        // )
        //     .then(res => {
        //         setDataBasePizzas(res.data);
        //         setIsLoading(false);
        //     });

        //сокращаем async/await
        //в 17 уроке этот код перенес в pizzaSlice.js
        // const { data } = await axios.get(`https://66865ecb83c983911b01f11a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
        // setDataBasePizzas(res.data); // В 17 уроке - удалил
        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            }),
        );

    }

    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage,
            });
            // console.log(queryString);

            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sortType, searchValue, currentPage]);


    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            // console.log(params);

            const sort = listMenu.find(obj => obj.sortProperty == params.sortProperty);

            dispatch(
                setFilter({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, [])


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



    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, searchValue, currentPage]);


    const pizzas = items
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
            {
                stutus == 'error'
                    ? (<div className='content__error-info'>
                        <h2>Произошла ошибка 😕</h2>
                        <p>Не удалось получить пиццу</p>
                    </div>)
                    :
                    (<div className="content__items"> {stutus == 'loading' ? skeletons : pizzas}</div>)

            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>

    )
}

export default Home