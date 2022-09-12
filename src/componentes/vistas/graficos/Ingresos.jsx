import * as React from 'react';

import Sidebar from "../sidebar/Sidebar";
import {useSelector} from 'react-redux'
import Usuario from "../cartilla_usuario/usuario";
import {useState} from 'react'


import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';



import { ThemeProvider, createTheme } from '@mui/material/styles';

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



  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechafin] = useState(null);

  // const [age, setAge] = useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };



  const chartData = [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    },
    {
      label: "UAE",
      value: "100"
    },
    {
      label: "US",
      value: "30"
    },
    {
      label: "China",
      value: "30"
    }
  ];

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
        numberSuffix: "S./",
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

   


      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="FECHA INICIO"
        value={fechaInicio}
        onChange={(newValue) => {

          var convertedStartDate = new Date(newValue)
          var month = convertedStartDate.getMonth() + 1
          var day = convertedStartDate.getDay();
          var year = convertedStartDate.getFullYear();
          var shortStartDate = String( month ).padStart(2, '0')+ "/" + String(day).padStart(2, '0') + "/" + year;
          setFechaInicio(shortStartDate );
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="FECHA FIN"
        value={fechaFin}
        onChange={(newValue) => {
          var convertedStartDate = new Date(newValue)
          var month = convertedStartDate.getMonth() + 1
          var day = convertedStartDate.getDay();
          var year = convertedStartDate.getFullYear();
          var shortStartDate = String( month ).padStart(2, '0')+ "/" + String(day).padStart(2, '0') + "/" + year;
          setFechafin(shortStartDate );
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>


    <Button variant="contained" color="primary"  >
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
  