import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogName } from '../../redux/actions/index'
import './searchBar.css'

function SearchBar(){

    const dispatch= useDispatch();
    const [name, setName]= useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)

    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name.length){
            alert('Please enter a breed')
        }else{
            dispatch(getDogName(name))
            setName('')
        }

    }


    return(

        <div className="container-searchBar">
            <form onSubmit={(e)=> handleSubmit(e)}>

                <input className='input' type="text"
                value={name} 
                placeholder="Write a breed"
                onChange={(e)=> handleInputChange(e)} />
                
                <button className='button-searchBar' type='submit'>Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar;