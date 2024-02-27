const initialState = {
    dogsCopy:[],
    allDogs: [],
    temperament: [],
    detail: []
}

const reducer = (state = initialState, action) =>{
    switch(action.type){

        case 'GET_DOGS':
            return{
                ...state,
                dogsCopy: action.payload,
                allDogs: action.payload
            }
        case 'GET_DOG_NAME':
            return {
                ...state,
                allDogs: action.payload //es el arreglo q estoy renderizando
            }

        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }

        case 'GET_TEMPERAMENT':
            return{
                ...state,
                temperament: action.payload
            }

        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.dogsCopy
            const temperamentFiltered = action.payload === 'All'? state.dogsCopy
            : allDogs.filter(dog =>{
                return dog.temperament? dog.temperament.includes(action.payload)
                : dog.temperament?.map(dog => dog.name).includes(action.payload)
            })
            


            return{
                ...state,
                allDogs: temperamentFiltered

            }
//ordenar por orden ascendente y descendente las razas de perro por Orden Alfabetico
        case 'ORDER_BY_NAME':
            let sortByName= action.payload === 'Ascendente'?
            state.dogsCopy.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1;
                }
                return 0; // 0 = si estan iguales los deja como esta
            })
            : state.dogsCopy.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })

            return{
                ...state,
                allDogs: sortByName
            }

//ordenar de ascendente y descendente por peso
        case 'ORDER_BY_WEIGHT':
            let sortyByWeight = action.payload === 'AscWeight' ?
            state.dogsCopy.sort(function(a, b){
                if (a.weight > b.weight) {
                    return 1;
                }
                if(b.weight > a.weight) {
                    return -1;
                }
                return 0;
            }) :

            state.dogsCopy.sort(function(a, b){
                if (a.weight > b.weight) {
                    return -1;
                }
                if ( b.weight > a.weight) {
                    return 1;
                }
                return 0;
            })

            return{
                ...state,
                allDogs: sortyByWeight
            }

//filtrar por raza existente (API o BD)
        case 'FILTER_CREATED':
            const filterCreated = action.payload === 'Created' ?
            state.dogsCopy.filter(elem => elem.createdInDb)
            : state.dogsCopy.filter(elem=> !elem.createdInDb)
            return{
                ...state,
                allDogs: action.payload === 'All' ? state.dogsCopy
                : filterCreated
            }

        default:
            return state;
    }

}

export default reducer