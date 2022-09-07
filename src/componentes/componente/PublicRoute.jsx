import {Navigate,Outlet} from 'react-router-dom'
import {useAuthContex} from '../contextos/authContext'

const PrivateRoute = ()=> {

    const {isAuthenticated}=useAuthContex()

    if(isAuthenticated){
        return <Navigate to="/privado"></Navigate>

    }

    return (
      <div>
        <Outlet></Outlet>
      </div>
    );
    
  }
  export default PrivateRoute;
  