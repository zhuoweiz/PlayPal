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

const axios = require('axios');

function ViewMyPost() {
  const [posts, setPosts] = React.useState(null);
  const baseURL = 'http://localhost:8080/users/user/likedPosts/' + localStorage.getItem("uid");
  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(baseURL)
        .then(response => {
          console.log(response.data);
          setPosts(response.data)
        })
        .catch(error => {
          console.error('There was an error!', error);
        }); 

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  if (!posts) return null;

  return (
    <Container maxWidth="md" style={{}}>
        <Grid
        container
        direction="column"
        style={{ marginTop: "18px", height: "600px" }}
        wrap="nowrap"
        >

        <div>
          <h1>{posts[0].title}</h1>
        </div>
        <Paper item md={5} style={{  marginTop:"24px", }} component={Grid}>
            <CenteredTabsMyPost  
              posts={posts}
            />
        </Paper>
        </Grid>
    </Container>
  );
}

export default ViewMyPost;

