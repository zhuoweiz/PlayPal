
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Button,
  Stack,
  Chip
} from "@mui/material";
import React from "react";
import CardHeader from "@mui/material/CardHeader";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import CenteredTabs  from "../components/CenteredTabs";
import PostCardMatrix from "../components/PostCardMatrix";
import { typography } from "@mui/system";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import { serverUrl } from '../constants';

import AddTagComponent from "../components/other/AddTagComponent";

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  tag: {
    marginRight: theme.spacing(1),
  },
  tagBox: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
}));


const interests = [
  {
    value: "Game"
  },
  {
    value: "Sport"
  },
  {
    value: "Read"
  },
  {
    value: "Coding"
  },
  {
    value: "Movie"
  },
]

function ViewUser() {

  const classes = useStyles();
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = React.useState([]);
  const [createdPosts, setCreatedPosts] = React.useState([]);
  const [joinedPosts, setJoinedPosts] = React.useState([]);
  const [checkFollow, setCheckFollow] = React.useState(null);
  const userURL = serverUrl + '/users/user/' + userId;
  const createdPostsURL = serverUrl + '/users/user/createdPosts/' + userId;
  const joinedPostsURL = serverUrl + '/users/user/joinedPosts/' + userId;
  const checkFollowURL = serverUrl + '/users/user/' + localStorage.getItem("uid") + '/' + userId; 
  const followURL = serverUrl + '/users/follow/' + localStorage.getItem("uid") + "/" + userId;
  const unfollowURL = serverUrl + '/users/unfollow/' + localStorage.getItem("uid") + "/" + userId;

  const renderFollowButton = ()=> {
    if (checkFollow === null) {
      return null
    }
    else if (checkFollow === true) {
      return (
        <Button variant="outlined" size="small"
                onClick = {
                  unfollowHandler
                }
              >
                unfollow
              </Button>  
      )
    }
    else {
      return (
        <Button
              variant="contained"
              size="small"
              onClick = {
                followHandler
              }
            >
              follow
              
            </Button>
      )
    }
  } 

  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(userURL)
      .then(response => {
        console.log(response.data);
        setUser(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 

    axios.get(createdPostsURL)
      .then(response => {
        console.log(response.data);
        setCreatedPosts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
    
    axios.get(joinedPostsURL)
      .then(response => {
        console.log(response.data);
        setJoinedPosts(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 

    axios.get(checkFollowURL)
      .then(response => {
        console.log(response.data);
        setCheckFollow(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 
  },[]);
  
  const followHandler = ()=> {
    axios.post(followURL)
    .then(response => {
      console.log(response.data);
      setCheckFollow(true)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }
  const unfollowHandler = ()=> {
    axios.post(unfollowURL)
    .then(response => {
      console.log(response.data);
      setCheckFollow(false)
    })
    .catch(error => {
      console.error('There was an error!', error);
    }); 
  }

  return (
    <Container maxWidth="md" style={{}}>
      <Grid
        container
        direction="column"
        style={{ marginTop: "18px"}}
        wrap="nowrap"
      >
        <Paper
          component={Grid}
          item
          container
          justifyContent="space-between"
          alignItems="center"
          md={2}
          style={{ padding: "12px", backgroundColor: "white" }}
        >
          <Grid item style={{}}>

            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
              }
              titleTypographyProps={{variant:'h3' }}
              title={user.name}
            />
          </Grid>
          <Grid item style={{}}>

            {
              renderFollowButton()
            }
          </Grid>
        </Paper>
        <Paper container item md={3} style={{marginTop:"24px" , padding:"12px"}} component={Grid}>
          <Grid item md={12} style={{}}>
            <Typography variant = "h6">
              Bio
            </Typography>
            <Typography>
              {user.bio ? user.bio : "bio is empty"}
            </Typography>
          </Grid>
          <Grid item md={12} style={{}}>
            <Typography variant = "h6">
              Interest Tags
            </Typography>
            <div className={classes.tagBox}>
              <AddTagComponent
                tags={user.tags ? user.tags : []}
              ></AddTagComponent>
            </div>
          </Grid>
        </Paper>

        
        <Paper item md={5} style={{  marginTop:"24px", }} component={Grid}>
            <CenteredTabs  
              createdPosts = {createdPosts}
              joinedPosts = {joinedPosts}
            />
        </Paper>
      </Grid>
    </Container>
  );
}
// style={{wight:"100%", height:"100%"}}
export default ViewUser;
