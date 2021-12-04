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
import { useSnackbar } from 'notistack';

import { getAuth } from "firebase/auth";

import ChatList from '../components/ChatList';
import MemberBox from '../components/MemberBox';
import CommentBox from '../components/viewpost/CommentBox';

import { serverUrl } from '../constants';
import axios from 'axios';
const _ = require("lodash");

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
  const { enqueueSnackbar } = useSnackbar();

  const postId = params.postId;
  const [postInfo, setPostInfo] = React.useState({});
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
  })
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
          <Button variant="outlined" style={{
            marginRight: 10
          }} >Like</Button>
          <Button variant="outlined" style={{
            marginRight: 10
          }}>Join/Leave</Button>
          </Grid>
          <Grid item>
            Activity Time: {convert(postInfo.dateTime)}
          </Grid>
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
              <CommentBox
                onSend = {sendCommentHandler}
                commentsData = {postComments}
              />
            </Grid>
          </Grid>

          
          <Grid container item xs={12} sm={6}>
            <Grid item style={{marginBottom: 12}} xs={12}>
              <Paper variant="outlined" style={{
                width: "100%",
                height: 200
              }}>
                Member List

                <Grid container spacing={2} direction="row" justifyContent="flex-start">
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