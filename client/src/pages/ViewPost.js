import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Chip, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function ViewPost() {
  const auth = getAuth();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Signin successful! " + user.email);
      history.push("/");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Sign in failed...");
      console.log("Signin error: ", errorMessage);
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography component="h1" variant="h5" style={{marginBottom: 12}}>
          Project Title
        </Typography>
        <Grid container item style={{marginBottom: 12}}>
          <Button variant="outlined" style={{
            marginRight: 10
          }} >Like</Button>
          <Button variant="outlined" style={{
            marginRight: 10
          }}>Comment</Button>
          <Button variant="outlined" style={{
            marginRight: 10
          }}>Join/Leave</Button>
        </Grid>
        <Grid container item style={{marginBottom: 12}}>
          <Chip label="Tag 1" style={{
            marginRight: 10
          }} size="small" variant="outlined" />
          <Chip label="Tag x" style={{
            marginRight: 10
          }} size="small" variant="outlined" />
          <Chip label="Tag r" style={{
            marginRight: 10
          }} size="small" variant="outlined" />
        </Grid>

        <Grid container item style={{width: 800}}>

          <Typography style={{marginBottom: 12}}>
            Description: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Typography>

        </Grid>

        <Grid item>
          <Typography style={{marginBottom: 12}}>
            Location: Lorem ipsum/
          </Typography>
        </Grid>
        
        <Grid item container direction="row">
          <Grid item container>

            <Grid container item style={{marginBottom: 12}}>
              <Paper variant="outlined" style={{
                width: 500,
                height: 240
              }}>
                Map
              </Paper>
            </Grid>

            <Grid container item style={{marginBottom: 12}}>
              <Paper variant="outlined" style={{
                width: 240,
                height: 300
              }}>
                Member List
              </Paper>
              <div style={{width:20}}>
                </div>
              <Paper variant="outlined" style={{
                width: 240,
                height: 300
              }}>
                Comments
              </Paper>
            </Grid>
          </Grid>
          <Grid container item>
            <Paper variant="outlined" style={{
              width: 600,
              height: 300
            }}>
              Chat
            </Paper>
          </Grid>
        </Grid>
        
        

        

      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}