import { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';

import NavBar from './components/AppBar';

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
  const classes = useStyles();

  useEffect(() => {

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
