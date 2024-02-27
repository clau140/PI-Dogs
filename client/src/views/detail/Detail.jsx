import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {getDetail} from '../../redux/actions/index'
import Loader from "../loader/Loader";
import './detail.css';

/*
Imagen 
nombre
temperamento
altura
peso
años de vida

*/

export default function Detail(){

    const dispatch = useDispatch();
    const {id} = useParams();
    const detail = useSelector((state)=> state.detail)

    const [carga, setCarga] = useState(true);
    

    useEffect(()=>{
        dispatch(getDetail(id))
        .then(()=> setCarga(false))
        .catch(()=>{
            alert('Game not found')
            window.location.replace('http://localhost:3000/home')
        })
    }, [id, dispatch]);

    if(carga){
        return(
            <Loader/>
        )
    }

    return (
        <div className="detail">

           <div className='containerButton'>
             <Link className='detailButton' to={"/home"}>
              Go back Home
             </Link>
           </div>

           <div className="containerMain">

            <div className="containerImage">
                {
                    <img src={detail.image} alt={detail.name} />
                }
            </div>

            <div className="containerDescription">
                <div className="name">
                    <h1>{detail.name}</h1>
                </div>

                <div className="data">
                    <p>{detail.temperament}</p>
                    <p>{detail.height}</p>
                    <p>{detail.weight}</p>
                    <p>{detail.life_span}</p>
                 

                </div>

            </div>

           </div>
        

            
        </div>
    )
}