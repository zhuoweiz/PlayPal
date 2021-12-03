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
  const [createdPosts, setCreatedPosts] = React.useState(null);
  const createdPostsURL = serverUrl + '/users/user/createdPosts/' + localStorage.getItem("uid");
  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(createdPostsURL)
        .then(response => {
          console.log(response.data);
          setCreatedPosts(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error);
        }); 
  },[]);

  const [likedPosts, setLikedPosts] = React.useState(null);
  const likedPostsURL = serverUrl + '/users/user/likedPosts/' + localStorage.getItem("uid");
  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(likedPostsURL)
        .then(response => {
          console.log(response.data);
          setLikedPosts(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error);
        }); 
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const [joinedPosts, setJoinedPosts] = React.useState(null);
  const joinedPostsURL = serverUrl + '/users/user/joinedPosts/' + localStorage.getItem("uid");
  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(joinedPostsURL)
        .then(response => {
          console.log(response.data);
          setJoinedPosts(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error);
        }); 
  },[]);

  if (!likedPosts) return null;
  if (!joinedPosts) return null;

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
            />
        </Paper>
        </Grid>
    </Container>
  );
}

export default ViewMyPost;

