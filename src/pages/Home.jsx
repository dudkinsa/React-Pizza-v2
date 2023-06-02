import React from 'react';

import Categories from '../componets/Categories';
import Sort from '../componets/Sort';
import PizzaBlock from '../componets/Pizzablock/PizzaBlock';
import Skeleton from '../componets/Pizzablock/Skeleton';

// import pizzas from './assets/pizza.json';

const Home = () => {
  // [pizzas, setPizzas] Этот useState нужен для храенеие данных пришедшие из сервера
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    //Эта функция выполнится один раз
    fetch('https://628da3f0a339dfef879dbb52.mockapi.io/items')
      .then((response) => {
        return response.json();
      })
      .then((arrJson) => {
        setPizzas(arrJson);
        setIsLoading(false);
      });
      window.scroll(0,0)
  }, []);

  return (
    <div className="container.">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* {pizzas.map((obj) => isLoading ? <Skeleton /> :(  
              // <PizzaBlock
              //   title={obj.title}
              //   price={obj.price}
              //   imageUrl={obj.imageUrl}
              //   sizes={obj.sizes}
              //   types={obj.types}
              // />
              // можно сократить. использкя spred. 
              // Вместо  выше кода, используем <PizzaBlock {...obj} />
              <PizzaBlock key={obj.id} {...obj} />  // key должен быть 
              // <Skeleton key={obj.id} {...obj} />  // key должен быть 
              //уникльным. Можно использовать  id          
            ))} */}

        {isLoading
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
