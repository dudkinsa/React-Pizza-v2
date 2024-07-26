import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSortType } from '../../redux/slices/filterSlice';

type SortListMenu = {
  name: string;
  sortProperty: string;
}

export const listMenu: SortListMenu[]  = [
    { name: 'популярности (DESC)', sortProperty: 'rating' },
    { name: 'популярности (ASC)', sortProperty: '+rating' },
    { name: 'цене (DESC)', sortProperty: 'price' },
    { name: 'цене (ASC)', sortProperty: '+price' },
    { name: 'алфавиту (DESC)', sortProperty: 'title' },
    { name: 'алфавиту (ASC)', sortProperty: '+title' },
  ];

const Sort = () => {
  const dispatch = useDispatch();
  // const sort = useSelector(state => state.filter.sort);
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortListMenu) => {
    dispatch(setSortType(obj))
    setOpen(false);
  }

  React.useEffect(() => {
    // console.log('Sort mount');
    const handClickOutside = (event: any) => {

      // event.path.includes(sortRef.current  в новых версиях не досупен. Вместо нее пишем composedPath()
      /* if (event.path.includes(sortRef.current)) {
        console.log('был клик на  sort');
      */
      //если клик был запредела попап(меню), то мы скрываем попап
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
        // console.log('click outside');
      }
    }

    document.body.addEventListener('click', handClickOutside);

    //это код убирает лишних или ложные обработчиков, когда например переходим на другую страницу.
    return () => {
      // console.log('Sort unmount');
      document.body.removeEventListener('', handClickOutside);
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {
        //открытие и закрытие меню popup
        // первый вариант
        open && (
          <div className="sort__popup">
            <ul>

              {listMenu.map((obj, index) => (
                <li
                  key={index}
                  onClick={() => onClickListItem(obj)}
                  className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                >
                  {obj.name}
                </li>
                // другой вариант открытие и закрытие меню popup
                // open ? (<div className="sort__popup">
                //   <ul>
                //     <li className="active">популярности</li>
                //     <li>цене</li>
                //     <li>алфавиту</li>
                //   </ul>
                // </div>
                // ) : ('Popup скрыт')

              ))}
            </ul>
          </div>
        )}

    </div>
  )
}

export default Sort