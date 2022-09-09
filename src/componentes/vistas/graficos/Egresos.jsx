import Sidebar from "../sidebar/Sidebar";
import {useSelector} from 'react-redux'




const Egresos = ()=> {
  const estado= useSelector((state)=>state)
    return (
      <div className="App">
        <Sidebar></Sidebar>
        <p>egresos{JSON.stringify(estado.data)}</p>
      </div>
    );
    
  }
  export default Egresos;
  