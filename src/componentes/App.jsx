import React from 'react';
import '../estilos/app.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './vistas/Home'
import Login from './vistas/Login';
import Logout from './vistas/logout';
import Privado from './vistas/Privado'
import { AuthContextProvider } from './contextos/authContext';

import PublicRoute from './componente/PublicRoute';
import PrivateRoute from './componente/PrivateRoute';

const App = ()=> {

  return (

    <AuthContextProvider>
      <Router>
        <Routes>

          <Route path="/" element={<PublicRoute></PublicRoute>}>
            <Route index element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Route>
          <Route path="/privado" element ={<PrivateRoute></PrivateRoute>} >
            <Route index element={<Privado></Privado>}></Route>
            
            <Route path="/privado/logout" element={<Logout></Logout>}></Route>
          </Route>
          <Route path="*"  element={<div>elemento no encontrado</div>}/>
        </Routes>
      </Router> 
    </AuthContextProvider>
      

  );

}

export default App;
