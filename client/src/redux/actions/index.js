import axios from 'axios';
//las actions son funciones que iban a retornar algo de forma asincrona 
//export const GET_DOGS= "GET_DOGS"

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
} 

export function getDogName(name){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs?name=' + name);
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            })
        
        } catch (error) {
            alert('Dog not found');
        }
    }

}
 

export function getDetail(id){
    
    return async function (dispatch){
        try {
            if(id){
                const response = await axios.get(`http://localhost:3001/dogs/${id}`);
                dispatch ({
                    type: 'GET_DETAIL',
                    payload: response.data
                })
            } else {
                dispatch({
                    type: 'GET_DETAIL',
                    payload: []
                    
    
                })
            }

        } catch(error){
            console.log(error)   

        }  
    }            

}

export function getTemperament(){
    return async function(dispatch){
        let response= await axios.get('http://localhost:3001/temperaments')
        return dispatch({
            type: 'GET_TEMPERAMENT',
            payload: response.data
        })
    }
}

export function filterByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function postDog(dog){
    return async function(){
        const response= await axios.post('http://localhost:3001/dogs', dog);
        return response;
    }

}