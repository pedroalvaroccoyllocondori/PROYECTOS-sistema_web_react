import Sidebar from "../sidebar/Sidebar";
import {useSelector} from 'react-redux'
import Usuario from "../cartilla_usuario/usuario";




const EgresosReporte = ()=> {

    return (
      <div className="App">
        <Sidebar></Sidebar>
        <div className="dashboar-contenido">
          <Usuario></Usuario>
          {/* <p>egresos{JSON.stringify(estado.data)}</p> */}
        </div>
      </div>
    );
    
  }
  export default EgresosReporte;
  