import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/app.scss'

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './vistas/Home'
import Login from './vistas/Login';
import Logout from './vistas/logout';
// import Privado from './vistas/Privado'
import { AuthContextProvider } from './contextos/authContext';

import PublicRoute from './componente/PublicRoute';
import PrivateRoute from './componente/PrivateRoute';
// import Sidebar from './vistas/sidebar/Sidebar';
import Egresos from './vistas/graficos/Egresos';
import Ingresos from './vistas/graficos/Ingresos';
import IngresosReporte from './vistas/reportes/ingresosReporte';
import EgresosReporte from './vistas/reportes/egresoreporte';
import Perfil from './vistas/perfil/perfil';

const App = ()=> {

  return (

    <AuthContextProvider>
      <Router>
        <Routes>

          <Route path="/" element={<PublicRoute></PublicRoute>}>
            <Route index element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Route>
          
          <Route path="/portal" element ={<PrivateRoute></PrivateRoute>} >
            <Route index element={<Egresos></Egresos>}></Route>
            <Route path="/portal/grafico_engresos" element={<Egresos></Egresos>}></Route>
            <Route path="/portal/grafico_ingresos" element={<Ingresos></Ingresos>}></Route>
            <Route path="/portal/reporte_ingresos" element={<IngresosReporte></IngresosReporte>}></Route>
            <Route path="/portal/reporte_egresos" element={<EgresosReporte></EgresosReporte>}></Route>
            <Route path="/portal/perfil" element={<Perfil></Perfil>}></Route>
            <Route path="/portal/logout" element={<Logout></Logout>}></Route>
          </Route>
          <Route path="*"  element={<div>elemento no encontrado</div>}/>
        </Routes>
      </Router> 
    </AuthContextProvider>
      

  );

}

export default App;
