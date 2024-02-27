import React  from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import {getDogs, getTemperament, filterByTemperament, orderByName, orderByWeight, filterCreated} from '../../redux/actions/index';
import { Link } from 'react-router-dom';

import SearchBar from '../../components/searchBar/SearchBar';
import Card from '../../components/card/Card'
import Loader from '../loader/Loader'
import Pagination from '../../components/pagination/Pagination';
import './home.css'

export default function Home (){

    const dispatch = useDispatch();
    const allDogs= useSelector((state)=> state.allDogs) //del reducer
    const allTemperament = useSelector((state)=> state.temperament)

    //Paginado
    const[currentPage, setCurrentPage] = useState(1) //use State xq es un estado local. Es 1 xq siempre voy a arrancar en la 1er pag
    const[dogsPerPage, /*setDogsPerPage*/] = useState(8)
    const [/*order*/, setOrder] = useState('')

    const indexOfLastDog = currentPage * dogsPerPage // 1 * 8 = 8   mas que un index se refiere a cantidad
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 8 - 8 = 0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    // pag 1 -----------0--------------8
    // pag 2 -----------9--------------17

    const pagination = (pageNumber) => { //esto va a ser en renderizado
        setCurrentPage(pageNumber)    // setear la pag en ese numero de pagina
      }
    
    //----------------

    //traemos del estado los dogs cuando el componente se monta

    useEffect(()=>{
        dispatch(getDogs())
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getTemperament())
    }, [dispatch]);



    if(!allDogs.length) {
        return <Loader/>;
     }

    
     function handleClick(e){ //e es evento
        e.preventDefault();
        dispatch(getDogs()); //me lo resetea
    }

    function handleFilteredTemperament(e){
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleSortByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleSortByWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)

    }

    function handleFilteredCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    return(
        <div className='home'>
         <div className='container-create'>
          <button><Link className='create-button' to= '/dog'>Create Dog</Link></button>
         </div>

         <div className='container-reload'>
         <button className='reload' onClick={e=> {handleClick(e)}}>Reload</button>
         </div>
         
         
         <SearchBar/>

         <div className='container-filters'>
            <select onChange={(e)=> handleFilteredTemperament(e)}>
                <option>Temperaments</option>
                <option value="All">All</option>

                {
                    allTemperament.map((elem)=> (
                        <option key={elem.name} value={elem.name}>
                            {elem.name}

                        </option>
                    ))
                }
            </select>
            <select onChange={(e)=> handleSortByName(e)}>
                <option value="Ascendente">A-Z</option>
                <option value="Descendente">Z-A</option>
            </select>

            <select onChange={(e)=> handleSortByWeight(e)}>
                <option>Weight</option>
                <option value="AscWeight">Asc</option>
                <option value="DesWeight">Desc</option>

            </select>

            <select onChange={(e)=> handleFilteredCreated(e)}>
                <option value="All">All</option>
                <option value="Created">Created</option>
                <option value="Existent">Existent</option>

            </select>
         </div>

         <ul className='card_grid'>
            {currentDogs?.map((el) => {
                return (
                
                     <Card
                        id={el.id}
                        name={el.name}
                        image={el.image}
                        temperament={el.temperament}
                        weight={el.weight}

                        key={el.id}
                    />
                    
                    );
                  })}
         </ul>
         <Pagination
         allDogs={allDogs.length}
         dogsPerPage={dogsPerPage}
         pagination={pagination}
         />
         
         
        </div>
    )
}