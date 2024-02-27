const  axios = require('axios');

const { Temperament } = require('../db');
const { API_KEY } = process.env;



const getAllTemperaments = async () => {
    //busco toda la data de la API
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);
    //almaceno solo los temperaments de cada objeto
    const temperaments = temperamentsApi.data.map(el => el.temperament);

    //uno cadenas y separo por comas    
    let dataTemperament = temperaments.join().split(',')
    //elimino los espacios en blanco de cada lado
    dataTemperament = dataTemperament.map( el => el.trim());

    //aqui agrego los tempaeramentos a la base de datos
    dataTemperament.forEach (el => {
        if(el !== '') {
            Temperament.findOrCreate({
                where: { name: el }    
        })
      }
    });


    /*
    El objeto global Set es una estructura de datos, una colección de valores que permite sólo almacenar valores únicos de cualquier tipo, incluso valores primitivos u referencias a objetos.
    Es posible iterar sobre los elementos en el orden de inserción.
    

    //se crea un nuevo Set basado en el arreglo original dataTemperament utilizando new Set.

    const dataArr = new Set(dataTemperament);

    //se converte el nuevo Set a un arreglo nuevamente utilizando la sintaxis spread.
    dataTemperament = [...dataArr]
    */

    const allTemperaments = await Temperament.findAll();

    return allTemperaments;
}










module.exports = {getAllTemperaments}