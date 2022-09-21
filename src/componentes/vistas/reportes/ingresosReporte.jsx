
import React,{useState,useEffect} from 'react';
import Sidebar from "../sidebar/Sidebar";
import {useSelector} from 'react-redux'
import Usuario from "../cartilla_usuario/usuario";
import MaterialTable from "material-table";
import {Modal,TextField,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

const IngresosReporte = ()=> {

  const [ data , setData] = useState([])
  const estadoGlobal= useSelector((state)=>state)
  const [modalInsertar, setModalInsertar]= useState(false)
  const [modalEditar, setModalEditar]= useState(false)
  const [modalEliminar, setModalEliminar]= useState(false);


  const styles= useStyles();
  const [itemSeleccionado, setItemSeleccionado]=useState({
    id:"",
    concepto: "",
    fecha: "",
    total: "",
    id_usuario:`${estadoGlobal.data.datosUsuario.id}`
  })

  const clearState = () => {
    setItemSeleccionado({
      id:"",
      concepto: "",
      fecha: "",
      total: "",
      id_usuario:`${estadoGlobal.data.datosUsuario.id}`
    })
}


  const peticionGet=(async()=> {
    await fetch('http://localhost/php_rest_myblog/api/ingresos/read_datos.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
       //  "fecha_inicio":`${fechaInicio}`,
       //  "fecha_fin":`${fechaFin}`,
        "id_usuario":`${estadoGlobal.data.datosUsuario.id}`
    })
    })
    .then((response) => response.json())  
    .then(data =>setData(data) )

  })


  const peticionPost=(async()=> {
    await fetch('http://localhost/php_rest_myblog/api/ingresos/create.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(itemSeleccionado)
    })
     await peticionGet()
     abrirCerrarModalInsertar()
     clearState()

  })
  

  const peticionPut=(async()=> {
  
    await fetch('http://localhost/php_rest_myblog/api/ingresos/update.php', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(itemSeleccionado)
    })
     await peticionGet()
     abrirCerrarModalEditar()
     clearState()

  })
  
  const peticionDelete=async()=>{
    await fetch('http://localhost/php_rest_myblog/api/ingresos/delete.php', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(itemSeleccionado)
    })
     await peticionGet()
     abrirCerrarModalEliminar();
     clearState()
   
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setItemSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log(itemSeleccionado)
  }

  useEffect(() => {
    peticionGet() 
 }, []);

  const colunmas=[
    {title: "CONCEPTO",field: "concepto"},
    {title: "FECHA",field: "fecha",type:"date"},
    {title: "TOTAL",field: "total",type:"numeric"},
    {title: "ID",field: "id",type:"numeric",hidden:true},
    {title: "ID",field: "id_usuario",type:"numeric",hidden:true}
  ]

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Item</h3>
      <TextField className={styles.inputMaterial} label="CONCEPTO" name="concepto" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="FECHA" name="fecha" onChange={handleChange}/>          
      <br />
      <TextField className={styles.inputMaterial} label="TOTAL" name="total" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Artista</h3>
      <TextField className={styles.inputMaterial} label="CONCEPTO" name="concepto" onChange={handleChange} value={itemSeleccionado&&itemSeleccionado.concepto}/>
      <br />
      <TextField className={styles.inputMaterial} label="FECHA" name="fecha" onChange={handleChange} value={itemSeleccionado&&itemSeleccionado.fecha}/>          
      <br />
      <TextField className={styles.inputMaterial} label="TOTAL" name="total" onChange={handleChange} value={itemSeleccionado&&itemSeleccionado.total}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el ITEM <b>{itemSeleccionado&&itemSeleccionado.concepto}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  const seleccionarItem=(item, caso)=>{
    setItemSeleccionado(item);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }



    return (
      <div className="App App-Color">
      <Sidebar></Sidebar>
      <div className="dashboar-contenido">
        <Usuario></Usuario>
      
        <div className="dashboar-dataTable-conteiner">
        <div className="dashboar-dataTable">
        <br />
        <Button variant="contained" color="primary" onClick={()=>abrirCerrarModalInsertar()}>INSERTAR</Button>

        <br /><br />

        <MaterialTable
                  columns={colunmas}
                  data={data}
                  title="INGRESOS"
                  actions={[
                    {
                    icon:"edit",
                    tooltip:"editar artista",
                    onClick:(event,rowData)=>seleccionarItem(rowData, "Editar")
                   },{
                    icon:"delete",
                    tooltip:"eliminar artista",
                    onClick:(event,rowData)=>seleccionarItem(rowData, "Eliminar")
                   },
                ]}
                
                options={
                  {
                    actionsColumnIndex:-1
                  }
                }

                localization={{
                    body: {
                      emptyDataSourceMessage: 'No hay datos por mostrar',
                      addTooltip: 'Añadir',
                      deleteTooltip: 'Eliminar',
                      editTooltip: 'Editar',
                      filterRow: {
                        filterTooltip: 'Filtrar',
                      },
                      editRow: {
                        deleteText: '¿Segura(o) que quiere eliminar?',
                        cancelTooltip: 'Cancelar',
                        saveTooltip: 'Guardar',
                      },
                    },
                    grouping: {
                      placeholder: "Arrastre un encabezado aquí para agrupar",
                      groupedBy: 'Agrupado por',
                    },
                    header: {
                      actions: 'ACCIONES',
                    },
                    pagination: {
                      firstAriaLabel: 'Primera página',
                      firstTooltip: 'Primera página',
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsPerPage: 'Filas por página:',
                      labelRowsSelect: 'filas',
                      lastAriaLabel: 'Ultima página',
                      lastTooltip: 'Ultima página',
                      nextAriaLabel: 'Pagina siguiente',
                      nextTooltip: 'Pagina siguiente',
                      previousAriaLabel: 'Pagina anterior',
                      previousTooltip: 'Pagina anterior',
                    },
                    toolbar: {
                      addRemoveColumns: 'Agregar o eliminar columnas',
                      exportAriaLabel: 'Exportar',
                      exportName: 'Exportar a CSV',
                      exportTitle: 'Exportar',
                      nRowsSelected: '{0} filas seleccionadas',
                      searchPlaceholder: 'Buscar',
                      searchTooltip: 'Buscar',
                      showColumnsAriaLabel: 'Mostrar columnas',
                      showColumnsTitle: 'Mostrar columnas',
                    },
                  }}
                />
                <Modal
                  open={modalInsertar}
                  onClose={abrirCerrarModalInsertar}>
                    {bodyInsertar}
                </Modal>

                <Modal
                  open={modalEditar}
                  onClose={abrirCerrarModalEditar}>
                   {bodyEditar}
                </Modal>

                <Modal
                  open={modalEliminar}
                  onClose={abrirCerrarModalEliminar}>
                    {bodyEliminar}
                </Modal>

        </div>
        </div>
                
      
      </div>
    </div>
    );
    
  }
  export default IngresosReporte;
  