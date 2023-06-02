import React from 'react';

import style from './NotFoundBlock.module.scss';
console.log(style);


const NotFoundBlock = () => {
  return <div className={style.root}>
 <h1 >
    <span>😕</span>
    <br/>
    Ничего не найдено 
</h1>
<p className={style.description}>Упс. Что то пошло не так</p>
  </div>
}

export default NotFoundBlock;
