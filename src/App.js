import React from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import './scss/app.scss';

// export const SearchContext = React.createContext();  //убираем useContext

const App = () => {
  // const [searchValue, setSearchValue] = React.useState(''); переделка под redux-toolkit


  return (
    <div className="wrapper">

          {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>    //убираем useContext  */}
        <Header />
        <div className="content">

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>


        </div>
      {/* </SearchContext.Provider>  //убираем useContext */}
    </div>
  );
}

export default App;