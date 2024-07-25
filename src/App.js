import React from 'react';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

export const SearchContext = React.createContext();

const App = () => {
  const [searchValue, setSearchValue] = React.useState('');


  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='pizza/:id' element={<FullPizza />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;