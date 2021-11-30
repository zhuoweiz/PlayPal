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
import { Chip, Paper, List, ListSubheader, ListItem, ListItemText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import ChatList from '../components/ChatList';

const useStyles = makeStyles((theme) => ({

  memberBox: {
    transition: "all .5s",
    boxShadow: "none",
    border: "solid 2px white",
    '&:hover': {
      border: "solid 2px DodgerBlue",
      boxShadow: "3px 3px 3px teal",
    }
  },
}));

function Comment(props) {
  const { author, content, time, ...otherProps } = props;

  return (
    <div style={{
      margin: 20,
    }}>
      <Typography>
      {author}: {content} ({time})
      </Typography>
    </div>
    
  )
}

function MemberBox(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.memberBox}>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Avatar 
            sx={{ width: 40, height: 40 }}
            src="../../public/profile_avatar.png"
          ></Avatar>
        </Grid>
        <Grid item>
          sdha ljkohaf
        </Grid>
      </Grid>
    </Paper>
  )
}


export default function ViewPost() {

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
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

        <Grid container item xs={12} sm={8}>

          <Typography style={{marginBottom: 12}}>
            Description: Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Typography>

        </Grid>

        <Grid item>
          <Typography style={{marginBottom: 12}}>
            Location: Lorem ipsum/
          </Typography>
        </Grid>
        
        <Grid item container direction="row" xs={12} spacing={2
        }>
          <Grid item container xs={12} sm={6}>
            <Grid container item xs={12} style={{marginBottom: 12}}>
              <Paper variant="outlined" style={{
                width: "100%",
                height: 300
              }}>
                Map
              </Paper>
            </Grid>

            <Grid container item xs={12} style={{marginBottom: 12}}>
              <Paper variant="outlined" style={{
                width: "100%",
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

                    <List
                      sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 320,
                        '& ul': { padding: 0 },
                      }}
                      subheader={<li />}
                    >
                      {[0, 1, 2, 3, 4].map((sectionId) => (
                        <li key={`section-${sectionId}`}>
                          <ul>
                            <ListSubheader>{`Author: `}</ListSubheader>
                            <ListItem key={`item-${sectionId}-item`}>
                              <ListItemText 
                                primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te" 
                              />
                            </ListItem>
                          </ul>
                        </li>
                      ))}
                    </List>
                    
                    {/* <Comment
                      author="Alex"
                      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te"
                      time=""
                    /> */}

                  </Grid>
                  <Grid item container alignItems="center" justifyContent="center"  >
                    <TextField
                      label="write your comment here"
                      size="small"
                      style={{
                        width: 300
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

          
          <Grid container item xs={12} sm={6}>
            <Grid item style={{marginBottom: 12}} xs={12}>
              <Paper variant="outlined" style={{
                width: "100%",
                height: 200
              }}>
                Member List

                <Grid container spacing={2} xs={12} direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    <MemberBox></MemberBox>
                  </Grid>


                  <Grid item xs={6}>
                    <MemberBox></MemberBox>
                  </Grid>

                  
                  
                  
                </Grid>
              </Paper>
            </Grid>

            <Grid item style={{marginBottom: 12}} xs={12}>
              <Paper variant="outlined" style={{
                width: "100%",
                height: 500
              }}>
                Chat
                
                <ChatList 
                  data={[
                    {
                      senderId: 2,
                      content: "Champ",
                      sendTime: "11.22.2021-21:00",
                    },
                    {
                      senderId: 5,
                      content: "Pog",
                      sendTime: "11.22.2021-22:00",
                    },
                    {
                      senderId: 1,
                      content: "Hello my fellow men of culture.",
                      sendTime: "11.22.2021-22:50",
                    },
                    {
                      senderId: 2,
                      content: "Champ",
                      sendTime: "11.22.2021-21:00",
                    },
                    {
                      senderId: 5,
                      content: "Pog",
                      sendTime: "11.22.2021-22:00",
                    },
                    {
                      senderId: 1,
                      content: "Hello my fellow men of culture.",
                      sendTime: "11.22.2021-22:50",
                    },
                    {
                      senderId: 2,
                      content: "Champ",
                      sendTime: "11.22.2021-21:00",
                    },
                    {
                      senderId: 5,
                      content: "Pog",
                      sendTime: "11.22.2021-22:00",
                    },
                    {
                      senderId: 1,
                      content: "Hello my fellow men of culture.",
                      sendTime: "11.22.2021-22:50",
                    },
                    {
                      senderId: 2,
                      content: "Champ",
                      sendTime: "11.22.2021-21:00",
                    },
                    {
                      senderId: 5,
                      content: "Pog",
                      sendTime: "11.22.2021-22:00",
                    },
                    {
                      senderId: 1,
                      content: "Hello my fellow men of culture.",
                      sendTime: "11.22.2021-22:50",
                    },
                  ]}
                />

                <Grid item container alignItems="center" justifyContent="center" 
                  
                >
                  <TextField
                    label="write your message here"
                    size="small"
                    style={{
                      width: 300
                    }}
                  >

                  </TextField>
                  <Button variant="outlined" style={{
                    marginLeft: 8,
                    width: 100
                  }}>Send</Button>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
        </Grid>

      </Box>
    </Container>
  );
}