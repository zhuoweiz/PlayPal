import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  Chip,
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { getAuth } from "firebase/auth";
import ChatList from "../components/ChatList";
import MemberBox from "../components/MemberBox";

import GoogleMapReact from "google-map-react";
import MapIcon from "../components/MapIcon";
import CommentBox from '../components/viewpost/CommentBox';

import { serverUrl } from '../constants';
import axios from 'axios';
const _ = require("lodash");

function Comment(props) {
  const { author, content, time, ...otherProps } = props;

  return (
    <div
      style={{
        margin: 20,
      }}
    >
      <Typography>
        {author}: {content} ({time})
      </Typography>
    </div>
  )
}
function convert(dateTime) {
  let date = new Date(dateTime);
  return date.toLocaleString();
}

export default function ViewPost() {
  


  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const postId = params.postId;
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

  const [latitude, setLatitude] = React.useState(43.088947)
  const [longitude, setLongitude] = React.useState(-76.15448)
  
  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 8,
  };
  const [postComments, setPostComments] = React.useState([]);

  function sortComments(unsortedCommentsData) {
    unsortedCommentsData.sort((firstEl, secondEl) => { 
      if (firstEl.createdDate === null || secondEl.createdDate === null) {
        return 0;
      }
      const timeA = Date.parse(firstEl.createdDate);
      const timeB = Date.parse(secondEl.createdDate);

      if (timeA < timeB) {
        return 11;
      } else if(timeA > timeB) {
        return -1;
      } else {
        return 0;
      }
    });
    return unsortedCommentsData;
  }

  const sendCommentHandler = (comment) => {
    // create comment axios request
    axios.post(serverUrl + "/comments/comment", {
      postId: postId,
      creatorId: localStorage.getItem("uid"),
      content: comment
    }).then(function(response) {
      console.log("send comment response: ", response);
      enqueueSnackbar("Comment Sent :)", {
        variant: 'success'
      });
      // setPostComments([
      //   ...postComments,
      //   response.data
      // ]);

      // sort comments based on time
      var unsortedCommentsData = _.cloneDeep(postComments);
      unsortedCommentsData.push(response.data);
      const sortedCommentsData = sortComments(unsortedCommentsData);
      setPostComments(sortedCommentsData);
      
    }).catch(function(error) {
      enqueueSnackbar("Comment Error", {
        variant: 'error',
      });
    });
  }

  React.useEffect(()=>{
    if(Object.keys(postInfo).length === 0){
      // fetch post info
      axios.get(serverUrl+"/posts/fullPost/"+postId)
      .then(response => {
        console.log("fetch postDat: ", response.data);
        setPostInfo(response.data);

        setLatitude(response.data.lat)
        setLongitude(response.data.lng)
        defaultProps.center.lat = latitude;
        defaultProps.center.lng = longitude

        const sortedCommentsData = sortComments(response.data.comments);
        setPostComments(sortedCommentsData);
        console.log(typeof(response.data.dateTime));
      })
      .catch(error=>{
        enqueueSnackbar("Error", {
          variant: 'error',
        })
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
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography component="h1" variant="h5" style={{ marginBottom: 12 }}>
          {postInfo.title}
        </Typography>
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 12 }}
        >
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

            <Button
              variant="outlined"
              style={{
                marginRight: 10,
              }}
            >
              Like
            </Button>
            <Button
              variant="outlined"
              style={{
                marginRight: 10,
              }}
            >
              Join/Leave
            </Button>
          </Grid>
          <Grid item>Activity Time: {convert(postInfo.dateTime)}</Grid>
        </Grid>
        <Grid container item style={{marginBottom: 12}}>
          {postInfo.tags?postInfo.tags.map((element,index) =>{
            return (
              <Chip key={`post-tag-${index}`} label={element.label} style={{
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
          <Typography style={{ marginBottom: 12 }}>
            {postInfo.content}
          </Typography>
        </Grid>

        <Grid item>
          <Typography style={{ marginBottom: 12 }}>
            {postInfo.location}
          </Typography>
        </Grid>

        <Grid item container direction="row" xs={12} spacing={2}>
          <Grid item container xs={12} sm={6}>
            <Grid container item xs={12} style={{ marginBottom: 12 }}>
              <Paper
                variant="outlined"
                style={{
                  width: "100%",
                  height: 300,
                }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc",
                  }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  <MapIcon 
                  lat= {latitude}
                  lng={longitude}
                  />
                </GoogleMapReact>
              </Paper>
            </Grid>
            
            <Grid container item xs={12} style={{marginBottom: 12}}>
              <CommentBox
                onSend = {sendCommentHandler}
                commentsData = {postComments}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} sm={6}>
            <Grid item style={{ marginBottom: 12 }} xs={12}>
              <Paper
                variant="outlined"
                style={{
                  width: "100%",
                  height: 200,
                }}
              >
                Member List

                <Grid container spacing={2} direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    {
                      joinedUsers.map((element, index) => {
                        return <Grid item xs={6} md={4} key={index}>
                          <MemberBox data={element}></MemberBox>
                      </Grid>
                      })

                    }
                    
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item style={{ marginBottom: 12 }} xs={12}>
              <Paper
                variant="outlined"
                style={{
                  width: "100%",
                  height: 500,
                }}
              >
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
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <TextField
                    label="write your message here"
                    size="small"
                    style={{
                      width: 300,
                    }}
                  ></TextField>
                  <Button
                    variant="outlined"
                    style={{
                      marginLeft: 8,
                      width: 100,
                    }}
                  >
                    Send
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
