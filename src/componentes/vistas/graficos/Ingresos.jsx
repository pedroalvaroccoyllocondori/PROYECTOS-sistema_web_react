import * as React from 'react';

import Sidebar from "../sidebar/Sidebar";
import {useSelector} from 'react-redux'
import Usuario from "../cartilla_usuario/usuario";
import {useState,useEffect} from 'react'


import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';



import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';



import { ThemeProvider, createTheme } from '@mui/material/styles';


import {es} from 'date-fns/locale'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Ingresos = ()=> {

  useEffect(() => {

     fetch('http://localhost/php_rest_myblog/api/ingresos/read.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fecha_inicio":`${fechaInicio}`,
        "fecha_fin":`${fechaFin}`,
        "id_usuario":"1"
    })
    })
    .then((response) => response.json())  
    .then(data =>setChartData(data) )
  }, []);

  const [fechaInicio, setFechaInicio] = useState("2022/01/15");
  const [fechaFin, setFechafin] = useState("2022/12/01");
  const [ chartData , setChartData] = useState([]);


  

  // const [age, setAge] = useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };


  const chartConfigs = {
    type: "column2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "INGRESOS",
        subCaption: "RESUMEN",
        xAxisName: "MESES",
        yAxisName: "INGRESO",
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
          {/* <p>egresos{JSON.stringify(estado.data)}</p> */}

          <div className="conteiner-grafico">
          <div className="conteiner-select">
          <ThemeProvider theme={darkTheme}>

          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              sx={{ width: 200 }}
              
            >
              <MenuItem value=""> <em>None</em></MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}

   


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
              const rawResponse = await fetch('http://localhost/php_rest_myblog/api/ingresos/read.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "fecha_inicio":`${fechaInicio}`,
                "fecha_fin":`${fechaFin}`,
                "id_usuario":"1"
            })
            });
            const content = await rawResponse.json();
            setChartData(content)
      }} >
      <SearchIcon  style={{ color: 'dark' }}/>
    </Button>

    </ThemeProvider>
    </div>

          {/* </div> */}
            <ReactFC {...chartConfigs} />
          </div>
        </div>
        {console.log(fechaFin)}
      </div>
    );
    
  }
  export default Ingresos;
  