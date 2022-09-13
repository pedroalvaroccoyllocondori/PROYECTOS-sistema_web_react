import * as React from 'react';

import Sidebar from "../sidebar/Sidebar";
import Usuario from "../cartilla_usuario/usuario";
import {useState,useEffect} from 'react'

//LIBRERIAS FUSIONCHART
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Spline from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

//LIBRERIAS DATAPIKER MUI
import { ThemeProvider} from '@mui/material/styles';
import { DarkTheme } from '../../constantes/constantes';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {es} from 'date-fns/locale'

//LIBRERIAS BOTON
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

//ESTADO GLOBAL
import {useSelector} from 'react-redux'

ReactFC.fcRoot(FusionCharts, Spline, FusionTheme);


const Egresos = ()=> {

  const estadoGlobal= useSelector((state)=>state)
  const [fechaInicio, setFechaInicio] = useState("2022/01/15");
  const [fechaFin, setFechafin] = useState("2022/12/01");
  const [ chartData , setChartData] = useState([{}]);

  useEffect(() => {
     fetch('http://localhost/php_rest_myblog/api/egresos/read.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fecha_inicio":`${fechaInicio}`,
        "fecha_fin":`${fechaFin}`,
        "id_usuario":`${estadoGlobal.data.datosUsuario.id}`
    })
    })
    .then((response) => response.json())  
    .then(data =>setChartData(data) )
  }, []);

  
  const chartConfigs = {
    type: "spline", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "EGRESOS",
        subCaption: "RESUMEN",
        xAxisName: "MESES",
        yAxisName: "EGRESOS",
        numberprefix: "S./",
        theme: "fusion"
      },
      data: chartData
    }
  };
  
    return (
      <div className="App App-Color">
        <Sidebar></Sidebar>
        <div className="dashboar-contenido">
          <Usuario></Usuario>
          <div className="conteiner-grafico">
              <div className="conteiner-select">
                <ThemeProvider theme={DarkTheme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                    <DatePicker
                      views={[ 'month','year']}
                      label="FECHA INICIO"
                      minDate="2022/01/01"
                      maxDate="2023/12/31"
                      value={fechaInicio}

                      onChange={(newValue) => {

                        var convertedStartDate = new Date(newValue)
                        var month = convertedStartDate.getMonth() + 1
                        var day = '01';
                        var year = convertedStartDate.getFullYear();
                        var shortStartDate =  year + "/" + String( month ).padStart(2, '0')+ "/" + String(day).padStart(2, '0') ;
                        setFechaInicio(shortStartDate );
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                    <DatePicker
                      views={[ 'month','year']}
                      label="FECHA FIN"
                      value={fechaFin}
                      minDate="2022/01/01"
                      maxDate="2023/12/31"
                      onChange={(newValue) => {
                        var convertedStartDate = new Date(newValue)
                        var month = convertedStartDate.getMonth() + 1
                        var day = '01';
                        var year = convertedStartDate.getFullYear();
                        var shortStartDate =   year + "/" + String( month ).padStart(2, '0')+ "/" + String(day).padStart(2, '0');
                        setFechafin(shortStartDate );
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <Button variant="contained" color="primary"  onClick={ async() => {
                            const rawResponse = await fetch('http://localhost/php_rest_myblog/api/egresos/read.php', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              "fecha_inicio":`${fechaInicio}`,
                              "fecha_fin":`${fechaFin}`,
                              "id_usuario":`${estadoGlobal.data.datosUsuario.id}`
                          })
                          });
                          const content = await rawResponse.json();
                          setChartData(content)
                    }} >
                    <SearchIcon  style={{ color: 'dark' }}/>
                  </Button>

              </ThemeProvider>
            </div>

            <ReactFC {...chartConfigs} />

          </div>
        </div>
      </div>
    );
    
  }
  export default Egresos;
  