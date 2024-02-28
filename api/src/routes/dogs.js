const { Router } = require("express")
const {Dog, Temperament} = require('../db');
const {getAllDogs, getDogId, createDog, deleteDog} = require("../controllers/dogs")

const router = Router();

//GET /dogs
// GET /dogs?name="...."

router.get('/', async (req, res)=>{
    try {
        const {name}= req.query
        const response = await getAllDogs()

        if(name){
            let dogsName= await response.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            dogsName.length ?
            res.status(200).send(dogsName) :
            res.status(404).send('Dog not found')
        } else{

            res.status(200).send(response)
        }

        
    } catch (error) {

       res.status(400).send(error.message);
    }
})

//GET dogs/:id

router.get('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const data = await getDogId(id)

        if(!data || Object.keys(data).length === 0){
            return res.status(400).send('Not found')
        } 

        res.status(200).json(data)

        

    } catch (error) {
        res.status(404).send(error.message)
    }

});

//POST /dogs


router.post('/', async (req, res)=>{
    try {
        const {name, image, heightMin, heightMax, weightMin, weightMax, life_span} = req.body

        if(!name || !image|| !heightMin || !heightMax || !weightMin || !weightMax || !life_span){
            res.status(404).send('Must complete all required fields')
        } else{
            const response = await createDog(req.body)
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})




//DELETE by id database
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params
        await deleteDog(id)

        res.status(200).send('Se elimino con éxito')
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router
