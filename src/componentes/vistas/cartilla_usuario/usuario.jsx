import Sidebar from "../sidebar/Sidebar";
import {useSelector} from 'react-redux'




const Usuario = ()=> {
  const estado= useSelector((state)=>state)
    return (
      <div className="infor-user-conteiner">
        <div className="info-user">
            <div className="info-user-datos" >
                <div>{estado.data.datosUsuario.nombre.toUpperCase() }</div>
                <div>{estado.data.datosUsuario.email.toUpperCase() }</div>
            </div>
            <img className="info-user-imagen"
                src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/302133445_5415659251820732_7999769232671499380_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEnzU5Ua6UerCYUtGCzrQDYEFvPc_2brYoQW89z_ZutipoYIZNUAmvfAOZoQYiDgn6JlrZ0eajo5rqxmGq6GYIK&_nc_ohc=I1zwK4DC4iMAX9ttH7N&_nc_ht=scontent-lim1-1.xx&oh=00_AT9Ep0XyxVujEvAkRKadGBCQaStPR2wGz9nWzHmOOwO1Jg&oe=631E8976"
                alt="profile_img"
                />
            </div>
      </div>
    );
    
  }
  export default Usuario;
  