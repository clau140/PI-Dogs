import React from 'react';
import './pagination.css'

export default function Pagination({allDogs, dogsPerPage, pagination}){
    let pages= [];

    for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){ //todos los dogs dividio por la cantidad de pages
         pages.push(i)
    }


    return (
        <div className='container-pagination'>
            <ul className='nums'>
            {
                pages?.map((number) => {
                    return (
                        <li key={number}>
                    <button className='buttonPages'
                    onClick={()=> pagination(number)}
                     >{number}</button>
                        </li>
                        )
                    }
                        )
            }
            </ul>

        </div>
    )
}