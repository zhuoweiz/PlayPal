import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';

import NavBar from './components/AppBar';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  input: {
    margin: 10,
  },
  paper: {
    height: 400,
    width: 300,
    paddingTop: 20,
  },
  
}));

function App() {
  const [title, setTitle] = useState("");
  const classes = useStyles();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    // axios.get('http://localhost:8080/hello?myName=JAVA')
    //     .then(response => setTitle(response.data))
    //     .catch(error => {
    //       setTitle("SERVER ERROR");
    //       console.error('There was an error!', error);
    //     }); 

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  );
}

export default App;
