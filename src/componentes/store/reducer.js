const initialState ={
    datosUsuario:'',
}
// const initialState =''

export default function nombreReducer(state = initialState,action){

    switch (action.type) {
        case 'GUARDAR_NOMBRE':
            return{
                ...state,
                datosUsuario: action.payload,
            }
        default:
            return state

    }
}