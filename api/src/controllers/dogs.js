const axios = require('axios');
const {Dog, Temperament} = require('../db')
const {API_KEY} = process.env

const getApi = async () => {

    const api =  await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await api.data.map(e => {
        return{
            id: e.id,
            name: e.name,
            image: e.image.url,
            life_span: e.life_span,
            temperament: e.temperament,
            height: e.height.metric.concat(' cm'),
            weight: e.weight.metric.concat(' kgs'),
        }
    })
    return apiInfo;
}

const getDb = async ()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}


const getAllDogs = async () => {

    const apiInfoo = await getApi();
    const dbInfo = await getDb();
    const infototal = apiInfoo.concat(dbInfo);
    return infototal;

}

const getDogId = async (id)=>{

    try {
        const data = await getAllDogs()
        const dogId = data.find((dog) => dog.id.toString() === id.toString())
        return dogId
        
    } catch (error) {
        return error
    }

}


const createDog = async ({
    name, 
    image, 
    heightMin, 
    heightMax, 
    weightMin, 
    weightMax, 
    life_span,
    createdInDb,
    temperament  
})=> {
    try {

        const newDog= await Dog.create({
            name, 
            image, 
            heightMin, 
            heightMax,
            weightMin, 
            weightMax,
            life_span,
            createdInDb

        })

        // add temperaments to newDog
		temperament.length
        ? temperament.map(async (name) => {
                const temp = await Temperament.findOne({
                    attributes: ["id"],
                    where: { name: name },
                })
                await newDog.addTemperament(temp.id)
          })
        : []
        return newDog


        /*let temperamentDb= await Temperament.findAll({
            where: {name: temperament}
        })

        let created= dogCreated.addTemperament(temperamentDb)
         return created */
        
    } 
    catch (error) {
        return error
    }
}

const deleteDog = async (id)=>{
    try {
        const response = await Dog.destroy({
            where:{
                id,
            },
            force: true,
        })
        return response
    } catch (error) {
        return error
    }

}

module.exports= { getApi, getDb, getAllDogs, getDogId, createDog, deleteDog}