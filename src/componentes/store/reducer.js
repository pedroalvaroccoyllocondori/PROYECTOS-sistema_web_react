const initialState ={
    nombre:'',
}

export default (state = initialState,action) => {
    if(action.type === 'GUARDAR_NOMBRE'){
        return{
            ...state,
            nombre: action.payload,
        }
    }

    return state
}