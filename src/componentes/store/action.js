const guardarNombre=(nombre)=>{
 return{
    type:"GUARDAR_NOMBRE",
    payload:nombre
 }
}


export {guardarNombre}