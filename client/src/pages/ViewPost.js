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


export default function ViewPost() {

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
        
        <Grid item container direction="row" xs={12}>
          <Grid item container xs={8}>
            <Grid container item style={{marginBottom: 12}}>
              <Paper variant="outlined" style={{
                width: "90%",
                height: 300
              }}>
                Map
              </Paper>
            </Grid>

            <Grid container item style={{marginBottom: 12}}>
              <Paper variant="outlined" style={{
                width: "90%",
                height: 300,
              }}>
                <Grid container justifyContent="center" direction="column" textAlign="center">
                  <Grid item>
                    <Typography style={{marginTop: 8}}>
                      Comments
                    </Typography>
                  </Grid>
                  <Grid item style={{
                    textAlign: "left",
                    }}>
                    <Typography
                      style={{
                        margin: 20,
                      }}
                    >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </Typography>

                    <Typography
                      style={{
                        margin: 20,
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </Typography>

                  </Grid>
                  <Grid item container alignItems="center" justifyContent="center"  >
                    <TextField
                      label="write your comment here"
                      size="small"
                      style={{
                        width: 320
                      }}
                    >

                    </TextField>
                    <Button variant="outlined" style={{
                      marginLeft: 8,
                      width: 100
                    }}>Comment</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>

          
          <Grid container item xs={4}>
            <Grid item style={{marginBottom: 12}} xs={12}>
              <Paper variant="outlined" style={{
                width: "100%",
                height: 200
              }}>
                Member List
              </Paper>
            </Grid>

            <Grid item style={{marginBottom: 12}} xs={12}>
              <Paper variant="outlined" style={{
                width: "100%",
                height: 400
              }}>
                Chat
              </Paper>
            </Grid>
            
          </Grid>
        </Grid>

      </Box>
    </Container>
  );
}