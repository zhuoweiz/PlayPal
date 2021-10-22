import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const axios = require('axios');


// const useStyles = makeStyles((theme) => ({
//   textInput: {
//     marginTop: 10,
//   }

// }))


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

  function LoginDemo() {

    return (
      <p>TEST</p>
    );
  }
  

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get('http://localhost:8080/hello?myName=JAVA')
        .then(response => setTitle(response.data))
        .catch(error => {
          setTitle("SERVER ERROR");
          console.error('There was an error!', error);
        }); 

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <Paper className={classes.paper}> 
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
              <Typography variant="h6">
                Login
              </Typography>
            </Grid>

            <Grid className={classes.input} item xs={12}>
              <TextField id="outlined-basic" label="UserName" variant="outlined" />
            </Grid>
            
            <Grid className={classes.input} item xs={12}>
              <TextField id="outlined-basic2" label="Password" variant="outlined" />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button>Log In</Button>
          </Grid>
          


        </Paper>
        <p>
          {/* Edit <code>src/App.js</code> and save to reload.  */}
          {/* {title} */}
          <LoginDemo>
            
          </LoginDemo>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
