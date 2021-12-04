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
import { useParams } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import ChatList from '../components/ChatList';
import MemberBox from '../components/MemberBox';

import { serverUrl } from '../constants';
import axios from 'axios';

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
function convert(dateTime){
  let date = new Date(dateTime)
  return date.toLocaleString()
}

export default function ViewPost() {

  const params = useParams();

  const postId = params.postId;
  console.log("Post Id is: ", postId);
  const [postInfo, setPostInfo] = React.useState({});
  const [checkLike , setCheckLike] = React.useState(null);
  const [checkJoin, setCheckJoin] = React.useState(null);
  const [joinedUsers, setJoinedUsers] = React.useState([]);
  const checkLikeURL = serverUrl + '/users/user/like/' + localStorage.getItem("uid") + '/' + postId;
  const checkJoinURL = serverUrl + '/users/user/join/' + localStorage.getItem("uid") + "/" + postId;
  const likeURL = serverUrl + '/users/like?' + 'postId=' + postId + '&' + 'userId=' + localStorage.getItem("uid");
  const unlikeURL = serverUrl + '/users/unlike?' + 'postId=' + postId + '&' + 'userId=' + localStorage.getItem("uid");
  const joinURL = serverUrl + '/users/join?' + 'postId=' + postId + '&' + 'userId=' + localStorage.getItem("uid");
  const unjoinURL = serverUrl + '/users/unjoin?' + 'postId=' + postId + '&' + 'userId=' + localStorage.getItem("uid");
  const joinedUsersURL = serverUrl + '/posts/joined/' + postId;

  const renderLikeButton = ()=> {
    if (checkLike === null) {
      return null
    }
    else if (checkLike === true) {
      return (
        <Button variant="outlined" size="small"
          onClick = {
            unlikeHandler
          }
        >
          unlike
        </Button>  
      )
    }
    else {
      return (
        <Button
          variant="contained"
          size="small"
          onClick = {
            likeHandler
          }
        >
          like
        </Button>
      )
    }
  } 

  const renderJoinButton = ()=> {
    if (checkJoin === null) {
      return null
    }
    else if (checkJoin === true) {
      return (
        <Button variant="outlined" size="small"
          onClick = {
            unjoinHandler
          }
        >
          leave
        </Button>  
      )
    }
    else {
      return (
        <Button
          variant="contained"
          size="small"
          onClick = {
            joinHandler
          }
        >
          join
        </Button>
      )
    }
  } 

  const likeHandler = ()=> {
    axios.get(likeURL)
    .then(response => {
      console.log(response.data);
      setCheckLike(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  const unlikeHandler = ()=> {
    axios.get(unlikeURL)
    .then(response => {
      console.log(response.data);
      setCheckLike(false)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  const joinHandler = ()=> {
    axios.get(joinURL)
    .then(response => {
      console.log(response.data);
      setCheckJoin(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  const unjoinHandler = ()=> {
    axios.get(unjoinURL)
    .then(response => {
      console.log(response.data);
      setCheckJoin(false)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  React.useEffect(()=>{
    if(Object.keys(postInfo).length === 0){
      axios.get(serverUrl+"/posts/post/"+postId)
    .then(response => {
      console.log(response.data);
      setPostInfo(response.data)
      console.log(typeof(response.data.dateTime));
    })
    .catch(error=>{
      console.log(error);
    })
    }

    axios.get(checkLikeURL)
    .then(response => {
      console.log(response.data);
      setCheckLike(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 

    axios.get(checkJoinURL)
    .then(response => {
      console.log(response.data);
      setCheckJoin(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
    
    axios.get(joinedUsersURL)
      .then(response => {
        console.log(response.data);
        setJoinedUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
  },[])

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
          {postInfo.title}
        </Typography>
        <Grid container item justifyContent="space-between" alignItems="center" style={{marginBottom: 12}}>
          <Grid item>
          {/* <Button variant="outlined" style={{
            marginRight: 10
          }} >Like</Button> */}
          {/* <Button variant="outlined" style={{
            marginRight: 10
          }}>Join/Leave</Button> */}
            {
              renderLikeButton()
            }
            {
              renderJoinButton()
            }
          </Grid>
          <Grid item>
            Activity Time: {convert(postInfo.dateTime)}
          </Grid>
        </Grid>
        <Grid container item style={{marginBottom: 12}}>
          {postInfo.tags?postInfo.tags.map((element,index) =>{
            return (
              <Chip label={element.label} style={{
                marginRight: 10
              }} size="small" variant="outlined" />
            )
          }):null}
          {/* <Chip label={post} style={{
            marginRight: 10
          }} size="small" variant="outlined" />
          <Chip label="Tag x" style={{
            marginRight: 10
          }} size="small" variant="outlined" />
          <Chip label="Tag r" style={{
            marginRight: 10
          }} size="small" variant="outlined" /> */}
        </Grid>

        <Grid container item xs={12} sm={8}>

          <Typography style={{marginBottom: 12}}>
           {postInfo.content}
          </Typography>

        </Grid>

        <Grid item>
          <Typography style={{marginBottom: 12}}>
            {postInfo.location}
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
                    {
                      joinedUsers.map((element, index) => {
                        return <Grid item xs={6} md={4} key={index}>
                          <MemberBox data={element}></MemberBox>
                      </Grid>
                      })

                    }
                    
                  </Grid>


                  {/* <Grid item xs={6}>
                    <MemberBox></MemberBox>
                  </Grid> */}

                  
                  
                  
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