import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { postDog, getTemperament } from "../../redux/actions";
import Loader from '../loader/Loader';
import './create.css';

/*
-  Nombre.
-  Altura **(diferenciar entre altura mínima y máxima de la raza)**.
-  Peso **(diferenciar entre peso mínimo y máximo de la raza)**.
-  Años de vida.
-  Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
-  Botón para crear la nueva raza.
*/

function validation(input){
    let errors = {};

    if(!input.name) {
        errors.name = 'Write a name, please';
      } else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
        errors.name = 'Solo se aceptan letras, numeros, guiones medios y parentesis';
      }
      else if(input.name.length > 50){
        errors.name = "El nombre es demasiado largo";
      };

      if(!input.image.length || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)
      ){
        errors.image='invalid URL, debe ser una imagen(png, jpg, gif)';
      };

      if(!input.temperament) {
        errors.temperament = 'Select one or more temperaments, please';
      }


//height
      if(input.heightMin < 0 || input.heightMin > 100){
        errors.heightMin = 'Require field, please write a valid number between 1 and 100'
      }

      if(input.heightMax < 1 || input.heightMax > 100){
        errors.heightMax = 'Require field, please write a valid number between 1 and 100'
      }
      if(input.heightMin > input.heightMax ){
        errors.heightMin = 'The minimum value cannot be greater than the maximum value'
      }
      if(input.heightMax < input.heightMin){
        errors.heightMax = 'The maximum value cannot be less than the minimum value'
      }

      //weight

      if(input.weightMin < 0 || input.weightMin >100){
        errors.weightMin= 'Require field, please write a valid number between 1 and 100'
      }
      if(input.weightMax < 1 || input.weightMax > 100){
        errors.weightMax = 'Require field, please write a valid number between 1 and 100'
      }
      if(input.weightMin > input.weightMax ){
        errors.weightMin = 'The minimum value cannot be greater than the maximum value'
      }
      if(input.weightMax < input.weightMin){
        errors.weightMax = 'The maximum value cannot be less than the minimum value'
      }


//life
      if(input.lifeMin < 0 || input.lifeMin > 10){
        errors.lifeMin = 'Require field, please write a valid number between 1 and 10'
      }
      if(input.lifeMax < 0 || input.lifeMax > 20){
        errors.lifeMax = 'Require field, please write a valid number between 1 and 20'
      }
      if(input.lifeMin > input.lifeMax){
        errors.lifeMin = 'The minimum value cannot be greater than the maximum value'
      }
      if( input.lifeMax < input.lifeMin ){
        errors.lifeMax = 'The maximum value cannot be less than the minimum value'
      }
      

      return errors;


}

const Create = () =>{

    const dispatch= useDispatch();
    const temperament = useSelector((state)=> state.temperament)

    const [errors, setErrors] = useState({});
    const [carga, setCarga] = useState(true);

    const [input, setInput] = useState({
        name: '',
        image: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeMin: '',
        lifeMax: '',
        temperament: []

    });

    function handleChange(e){
      setInput({
        ...input,
        [e.target.name] : e.target.value
      })
      setErrors(validation({
        ...input,
        [e.target.name] : e.target.value
      }))
    }

    function handleTemperament(e){
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
      })
    }

    function handleSubmit(e){
      e.preventDefault();
      
      setErrors(validation({
        ...input,
        [e.target.name]: e.target.value

      })
      )

      if(!Object.keys(errors).length && input.name && input.image && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.lifeMin && input.lifeMax && input.temperament){ 

        input.heightMax += ' cm'
        input.weightMax += ' kgs'
        input.life_span = input.lifeMin + ' - ' + input.lifeMax + ' years'

        dispatch(postDog(input));
        alert('Dog created')

        setInput({
          name: '',
          image: '',
          heightMin: '',
          heightMax: '',
          weightMin: '',
          weightMax: '',
          lifeMin: '',
          lifeMax: '',
          temperament: []
        })


    }else{
      alert('Error: Dog not created')
      return
    }

  }

  function  handleDelete(el){
    setInput({
        ...input, //me traigo el anterior para no pisarlo
        temperament: input.temperament.filter( temp => temp !==el)
    })
}

    

    useEffect(()=>{
        dispatch(getTemperament()).then(()=> setCarga(false));

    }, [dispatch])

    if(carga){
      return (
        <div className=''>
          <Loader/>
        </div>
      )
    }
    

    return (
      <div className="containerPadre">

        <div className="subContainer">

      
        <div className="firstContainerForm">
           <Link to= '/home'>

            <div className="buttonContainer">
            <button className="buttonForm">Home</button>

            </div>
            
           </Link>
           <h1 className="titulo">Create a new Dog 🐶</h1>
           <div className="containerForm">

           
           
           <form className="form" onSubmit={(e)=> handleSubmit(e)}>
            <div>
              <input 
              className="inputCreate"
              type="text"
              placeholder="Name"
              value={input.name}
              name="name"
              onChange={(e)=> handleChange(e)}
               />
               {
                errors.name && (
                  <p className="red">{errors.name}</p>
                )
               }
            </div>

            <div>
              <input 
              className="inputCreate"
              type="img"
              placeholder="Image"
              value={input.image}
              name="image" 
              alt="not found"
              onChange={(e)=> handleChange(e)}
              />
              {
                errors.image && (
                  <p className="red">{errors.image}</p>
                )
              }
            </div>

            <div>
              <input 
              className="inputCreate"
              type="number"
              placeholder="Min height"
              value={input.heightMin}
              name="heightMin"
              onChange={(e)=> handleChange(e)}
              />
              {
                errors.heightMin && (
                  <p className="red">{errors.heightMin}</p>
                )
              }
            </div>

            <div>
              <input 
              className="inputCreate"
              type="number"
              placeholder="Max height"
              value={input.heightMax}
              name="heightMax"
              onChange={(e)=> handleChange(e)}
              />
              {
                errors.heightMax && (
                  <p className="red">{errors.heightMax}</p>
                )
              }
            </div>

            <div>
              <input 
              className="inputCreate"
              type="number"
              placeholder="Min weight"
              value={input.weightMin}
              name="weightMin"
              onChange={(e)=> handleChange(e)}
              />
              {
                errors.weightMin && (
                  <p className="red">{errors.weightMin}</p>
                )
              }
            </div>

            <div>
              <input 
              className="inputCreate"
              type="number"
              placeholder="Max weight" 
              value={input.weightMax}
              name="weightMax"
              onChange={(e)=> handleChange(e)}
              />
              {
                errors.weightMax && (
                  <p className="red">{errors.weightMax}</p>
                )
              }
            </div>

            <div>
              <input 
              className="inputCreate"
              type="number" 
              placeholder="Min life years"
              value={input.lifeMin}
              name="lifeMin"
              onChange={(e)=> handleChange(e)}
              />
              {errors.lifeMin && (
                <p className="red">{errors.lifeMin}</p>
              )}
            </div>

            <div>
              <input 
              className="inputCreate"
              type="number"
              placeholder="Max life years"
              value={input.lifeMax}
              name="lifeMax"
              onChange={(e)=> handleChange(e)}
              />
              {
                errors.lifeMax && (
                  <p className="red">{errors.lifeMax}</p>
                )
              }
            </div>

            <div>
              <label >Temperaments </label>
              <select className="inputCreate" onChange={(e)=> handleTemperament(e)}>
                {
                  errors.temperament && (
                    <p className="red">{errors.temperament}</p>
                  )
                }

                {
                  temperament.map(temperament =>(
                    <option className="optionCreate" value={temperament.name} key={temperament.id}>{temperament.name}</option>
                  ))
                }

              </select>
              <div className="selectedCreate">
              {input.temperament.map(el => 
                <div key={el}>
                  
                    <p>{el}</p>
                    <button 
                    className="x"
                    onClick={() => handleDelete(el)}
                    key={el.id}
                    id={el.id}
                    value={el.name}
                    >
                      <span >X</span>
                      </button>
                </div>    
                    )}

              </div>
            </div>

            <div className="formDiv">
              <button className="buttonForm" type="submit">CREATE 🐾</button>
            </div>

           </form>
           </div>

           

           
        </div>
      </div>
      </div>
    )
}


export default Create;