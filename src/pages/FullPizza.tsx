import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => { // FC это функциальный компонент. В TS нужно обзятельно указывать. Что за тип?  const FullPizza: React.FC
    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: string,

    }>();


    
    const { id } = useParams();


    // в useEffect нельзя делать async/await В react это запрещено. Асинхрон нужно делать внутри useEffect
    React.useEffect(() => {
        // async/await нужно делать вот таким способом 
        //и обязательно нужно сделать отлавливание ошибки try/catch
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get('https://66865ecb83c983911b01f11a.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы')
            }
        };

        fetchPizza();
    }, []);


    //без этого кода try/catch оставнвивает приложение из-за того что не успевает загрузитьтся из бекенда
    // в первую очередь выполняется этот код, а потом  
    if (!pizza) {
        return <>'Загрузка....'</>
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