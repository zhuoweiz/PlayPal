import {
    Container,
    Grid,
    Avatar,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import React from "react";
import CenteredTabsMyPost  from "../components/CenteredTabsMyPost";
import PostCardMatrix from "../components/PostCardMatrix";
import { serverUrl } from '../constants';

const axios = require('axios');

function ViewMyPost() {
  const [createdPosts, setCreatedPosts] = React.useState([]);
  const [likedPosts, setLikedPosts] = React.useState([]);
  const [joinedPosts, setJoinedPosts] = React.useState([]);
  const [archivedPosts, setArchivedPosts] = React.useState([]);
  const [usersFollowing, setUsersFollowing] = React.useState([]);
  
  const likedPostsURL = serverUrl + '/users/user/likedPosts/' + localStorage.getItem("uid");
  const createdPostsURL = serverUrl + '/users/user/createdPosts/' + localStorage.getItem("uid");
  const joinedPostsURL = serverUrl + '/users/user/joinedPosts/' + localStorage.getItem("uid");
  const archivedPostsURL = serverUrl + '/users/user/archivedPosts/' + localStorage.getItem("uid");
  const usersFollowingURL = serverUrl + '/users/user/usersFollowing/' + localStorage.getItem("uid");

  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(createdPostsURL)
      .then(response => {
        //console.log(response.data);
        setCreatedPosts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
    
    axios.get(likedPostsURL)
      .then(response => {
        //console.log(response.data);
        setLikedPosts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
    
    axios.get(joinedPostsURL)
      .then(response => {
        //console.log(response.data);
        setJoinedPosts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
    
    axios.get(archivedPostsURL)
      .then(response => {
        //console.log(response.data);
        setArchivedPosts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
    
    
    axios.get(usersFollowingURL)
      .then(response => {
        //console.log(response.data);
        setUsersFollowing(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
    
  },[]);

  return (
    <Container maxWidth="md" style={{}}>
        <Grid
        container
        direction="column"
        style={{ marginTop: "18px", height: "600px" }}
        wrap="nowrap"
        >

        <div>
          {/* <h1>{likedposts[0].title}</h1> */}
        </div>
        <Paper item md={5} style={{  marginTop:"24px", }} component={Grid}>
            <CenteredTabsMyPost  
              createdPosts = {createdPosts}
              likedPosts={likedPosts}
              joinedPosts ={joinedPosts}
              archivedPosts = {archivedPosts}
              usersFollowing = {usersFollowing}
            />
        </Paper>
        </Grid>
    </Container>
  );
}

export default ViewMyPost;

