import axios from 'axios';
import React from 'react';
import { useParams, useNavigate} from 'react-router-dom';

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const { id } = useParams();
    const navigate = useNavigate();

// в useEffect нельзя делать async/await В react это запрещено. Асинхрон нужно делать внутри useEffect
    React.useEffect(() => {
        // async/await нужно делать вот таким способом 
        //и обязательно нужно сделать отлавливание ошибки try/catch
         const  fetchPizza =  async() => {
            try {
                const {data} = await axios.get('https://66865ecb83c983911b01f11a.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
        
                alert('Ошибка при получении пиццы');
                navigate('/')
            }
         };

         fetchPizza();
    },[]);


//без этого кода try/catch оставнвивает приложение из-за того что не успевает загрузитьтся из бекенда
// в первую очередь выполняется этот код, а потом  
    if(!pizza) {
        return 'Загрузка....'
    }
    // а потом этот
  return (
    <div className='container'>
        <img src={pizza.imageUrl} alt="" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza