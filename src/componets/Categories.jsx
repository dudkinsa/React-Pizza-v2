import React from "react";


function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(2);

  // const onClickCategories = () =>{
  //   setActiveIndex()
  // }

  const onClickCategories = function(index){
    setActiveIndex(index);
  }
  const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {/* <li onClick={() =>onClickCategories(0)} className={activeIndex == 0 ? 'active' : ''}>Все</li> */}
        {
          categoriesArr.map((value, i) => (
            <li key={i} onClick={() =>onClickCategories(i)} className={activeIndex === i ? 'active' : ''}> {value} </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Categories;


