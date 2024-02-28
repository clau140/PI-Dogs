import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {getDetail, deleteDog} from '../../redux/actions/index'
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
            alert('Dog not found')
            window.location.replace('http://localhost:3000/home')
        })
    }, [id, dispatch]);

    const handleDelete = (e) =>{
        e.preventDefault();
        dispatch(deleteDog(id));
        alert('Dog deleted');
        window.location.replace('http://localhost:3000/home')
    }

    if(carga){
        return(
            <Loader/>
        )
    }

    return (
        <div className="detail">

           <div className='containerButton'>
             
             <button><Link  className='detailButton' to={"/home"}>
               Home
             </Link>
             </button>
             {
            detail.createdInDb? <div className="containerDelete">
                <button className="detailButton" onClick={(e)=> handleDelete(e)}>Delete Dog</button>

            </div> : <div></div>
        }
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
                    <h3>Temperaments: { detail.temperament?.map((e)=> e.name).join(', ')
                    
                    }</h3>

                    <h3>Height: {!detail.createdInDb? detail.height :
                    detail.heightMin + ' - ' + detail.heightMax}
                    </h3>

                    <h3>Weight: {!detail.createdInDb? detail.weight :
                    detail.weightMin + ' - ' + detail.weightMax}</h3>

                    <h3>Life span: {detail.life_span}</h3>
                 

                </div>

            </div>

           </div>
        

            
        </div>
    )
}