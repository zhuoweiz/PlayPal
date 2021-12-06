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
import { doc, addDoc, setDoc, updateDoc, query, where, arrayUnion, collection, Timestamp, getFirestore, onSnapshot } from "firebase/firestore";

import ChatList from "../components/ChatList";
import MemberBox from "../components/MemberBox";

import GoogleMapReact from "google-map-react";
import MapIcon from "../components/MapIcon";
import CommentBox from '../components/viewpost/CommentBox';

import { serverUrl } from '../constants';
import axios from 'axios';
import { set } from "lodash";
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
  const db = getFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const postId = params.postId;
  const [postInfo, setPostInfo] = React.useState(null);
  const [checkLike , setCheckLike] = React.useState(null);
  const [checkJoin, setCheckJoin] = React.useState(null);
  const [joinedUsers, setJoinedUsers] = React.useState([]);
  const [joinedUsersIdMap, setJoinedUsersIdMap] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [chatData, setChatData] = React.useState([]);

  const [latitude, setLatitude] = React.useState(43.088947)
  const [longitude, setLongitude] = React.useState(-76.15448)
  const [mapProps, setMapProps] = React.useState(null);
  
  
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
        <Button 
          style={{
            marginRight: 10,
          }}
          variant="outlined"
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
          style={{
            marginRight: 10,
          }}
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
        <Button variant="outlined"
          style={{
            marginRight: 10,
          }}
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
          style={{
            marginRight: 10,
          }}
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
      //console.log(response.data);
      setCheckLike(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  const unlikeHandler = ()=> {
    axios.get(unlikeURL)
    .then(response => {
      //console.log(response.data);
      setCheckLike(false)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  const joinHandler = ()=> {
    axios.get(joinURL)
    .then(response => {
      //console.log(response.data);
      setCheckJoin(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  const unjoinHandler = ()=> {
    axios.get(unjoinURL)
    .then(response => {
      //console.log(response.data);
      setCheckJoin(false)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  async function uploadMessageToFirestore(docData) {
    const docRef = await addDoc(collection(db, "messages"), docData);
    console.log("addes message id: ", docRef.id);
    
    const washingtonRef = doc(db, "postMessages", postId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
        messages: arrayUnion(docRef)
    });
  }

  const sendMessageHandler = () => {
    const docData = {
      content: message,
      senderId: parseInt(localStorage.getItem("uid")),
      postId: postInfo.id,
      createdDate: Timestamp.fromDate(new Date()),
    };
    uploadMessageToFirestore(docData);
    setMessage("");
  }

  const [postComments, setPostComments] = React.useState([]);

  function sortComments(unsortedCommentsData) {
    unsortedCommentsData.sort((firstEl, secondEl) => { 
      if (firstEl.createdDate === null || secondEl.createdDate === null) {
        return 0;
      }
      const timeA = Date.parse(firstEl.createdDate);
      const timeB = Date.parse(secondEl.createdDate);

      if (timeA < timeB) {
        return 1;
      } else if(timeA > timeB) {
        return -1;
      } else {
        return 0;
      }
    });
    return unsortedCommentsData;
  }

  function sortChats(unsortedChatData) {
    unsortedChatData.sort((firstEl, secondEl) => { 
      if (firstEl.createdDate === null || secondEl.createdDate === null) {
        return 0;
      }
      const timeA = (firstEl.createdDate.seconds);
      const timeB = (secondEl.createdDate.seconds);

      if (timeA < timeB) {
        return -1;
      } else if(timeA > timeB) {
        return 1;
      } else {
        return 0;
      }
    });
    return unsortedChatData;
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

    const q = query(collection(db, "messages"), where("postId", "==", postId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // triggered many times for some reason
      const responseData = [];
      querySnapshot.forEach((doc) => {
        responseData.push(doc.data());
      });
      console.log(responseData);
      setChatData(sortChats(responseData));
    });
    
    if(postInfo === null){
      // fetch post info
      axios.get(serverUrl+"/posts/fullPost/"+postId)
      .then(response => {
        console.log("fetch postDat: ", response.data);
        setPostInfo(response.data);

        setLatitude(response.data.lat)
        setLongitude(response.data.lng)

        // const defaultProps = {
        //   center: {
        //     lat: latitude,
        //     lng: longitude,
        //   },
        //   zoom: 8,
        // };
        setMapProps({
          center: {
            lat: response.data.lat,
            lng: response.data.lng
          }
        })

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
      //console.log(response.data);
      setCheckLike(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 

    axios.get(checkJoinURL)
    .then(response => {
      //console.log(response.data);
      setCheckJoin(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
    
    axios.get(joinedUsersURL)
      .then(response => {
        setJoinedUsers(response.data);
        var tmpMap = {};
        response.data.forEach(element => {
          tmpMap[element.id] = element.name;
        })
        setJoinedUsersIdMap(tmpMap);
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 

    
    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe()
  },[])
  console.log("postInfo", postInfo)
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
          {postInfo ? postInfo.title : null }
        </Typography>
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 12 }}
        >
          <Grid item>
            {
              renderLikeButton()
            }
            {
              renderJoinButton()
            }
          </Grid>
          <Grid item>Activity Time: { postInfo ? convert(postInfo.dateTime) : null}</Grid>
        </Grid>
        <Grid container item style={{marginBottom: 12}}>
          {postInfo && postInfo.tags ?postInfo.tags.map((element,index) =>{
            return (
              <Chip key={`post-tag-${index}`} label={element.label} style={{
                marginRight: 10
              }} size="small" variant="outlined" />
            )
          }):null}
        </Grid>

        <Grid container item xs={12} sm={8}>
          <Typography style={{ marginBottom: 12 }}>
             Host : {postInfo ? postInfo.creator.name : null}   
          </Typography>
        </Grid>

        <Grid container item xs={12} sm={8}>
          <Typography style={{ marginBottom: 12 }}>
            {postInfo ? postInfo.content : null}
          </Typography>
        </Grid>

        <Grid item>
          <Typography style={{ marginBottom: 12 }}>
            {postInfo ? postInfo.location: null}
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
                {
                  mapProps ?
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc",
                      }}
                      center={mapProps.center}
                      zoom={12}
                    >
                      <MapIcon 
                      lat= {latitude}
                      lng={longitude}
                      />
                    </GoogleMapReact>
                  : null
                }
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
                <Grid item>
                  <Typography style={{marginLeft: 8, marginTop: 8, marginBottom: 8}}>
                  Member List
                  </Typography>
                </Grid>

                <Grid container spacing={1} direction="row" justifyContent="flex-start">
                    {
                      joinedUsers.map((element, index) => {
                        return <Grid item xs={6} key={index}
                          style={{
                          }}
                        >
                          <MemberBox data={element}></MemberBox>
                      </Grid>
                      })
                    }
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
                <Grid item>
                  <Typography style={{marginLeft: 8, marginTop: 8}}>
                    Chat
                  </Typography>
                </Grid>

                { checkJoin ? 
                  <>
                  <ChatList
                    joinedUsersIdMap={joinedUsersIdMap}
                    data={chatData}
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></TextField>
                    <Button
                      variant="outlined"
                      style={{
                        marginLeft: 8,
                        width: 100,
                      }}
                      onClick={sendMessageHandler}
                    >
                      Send
                    </Button>
                  </Grid>
                  </>
                : <>
                  <Typography style={{margin: 8}}>
                      Join Post To Chat
                  </Typography>
                </>
                }
                
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
