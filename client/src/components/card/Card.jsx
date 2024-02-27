import React  from 'react';
import {Link} from 'react-router-dom'
import './card.css'

function Card({image, name, temperament, weight, id}){
    

    //const {name, image, id, temperament, weight} = dog
    return(

        <div className='card-container'>
            <Link to={'/dog/' + id}>
                <img className='card_image' src={image} alt= 'img not found' />
            </Link>
            <h2>{name}</h2>
            <h3>{temperament}</h3>
            <h3>{weight}</h3>

            
        </div>
    )
}

export default Card;