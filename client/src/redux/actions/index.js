import axios from 'axios';



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

export function postDog(payload){
    return async function(dispatch){
        const response= await axios.post('http://localhost:3001/dogs', payload);
        return response;
    }

}

export const deleteDog = (id) => async (dispatch) =>{

    try {
    return await axios.delete(`http://localhost:3001/dogs/${id}`)
    .then( (dog) => dispatch ({
    type: 'DELETE_DOG',
    payload: dog.data
  }))
    } catch (error) {
      return error;
    }

  
   
};