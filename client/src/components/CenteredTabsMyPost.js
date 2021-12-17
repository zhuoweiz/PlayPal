import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import PostCardMatrix from './PostCardMatrix';
import { Grid } from "@mui/material";
// import { TabPanel } from '@mui/lab';
import PostCard from "./PostCard";
import MemberBox from "./MemberBox"
import { makeStyles } from '@mui/styles';

const axios = require('axios');
const useStyles = makeStyles((theme) => ({
  gridContainer: { 
    marginTop: "30px", 
    paddingRight: 6,
    paddingLeft: 2,
  },
}));

export default function CenteredTabsMyPost(props) {
  const [value, setValue] = React.useState(0);
  const { createdPosts, likedPosts, joinedPosts, archivedPosts, usersFollowing, ...otherProps } = props;
  const classes = useStyles();
  //console.log("test", likedposts);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Created" />
        <Tab label="Joined" />
        <Tab label="Liked" />
        <Tab label="Archived" />
        <Tab label="Following" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Post Activities I Created
        <Grid
            item
            container
            spacing={{ xs: 2 }}
            className={classes.gridContainer}
          >
            {
                createdPosts.map((element, index) => {
                  return <Grid item xs={6} md={4} key={index}>
                    <PostCard postData={element}/>
                  </Grid>
                })
              }
          </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Post Activities I Joined
        <Grid
              item
              container
              spacing={{ xs: 2}}
              className={classes.gridContainer}
            >
              {
                joinedPosts.map((element, index) => {
                  return <Grid item xs={6} md={4} key={index}>
                    <PostCard postData={element}/>
                  </Grid>
                })
              }
            </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Liked Posts List
        <Grid
          item
          container
          spacing={{ xs: 2}}
          className={classes.gridContainer}
        >
          {
            likedPosts.map((element, index) => {
              return <Grid item xs={6} md={4} key={index}>
                <PostCard postData={element}/>
              </Grid>
            })
          }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Archived Posts List
        <Grid
          item
          container
          spacing={{ xs: 2}}
          className={classes.gridContainer}
        >
          {
            archivedPosts.map((element, index) => {
              return <Grid item xs={6} md={4} key={index}>
                <PostCard postData={element}/>
              </Grid>
            })
          }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Users I Follow
        <Grid
          item
          container
          spacing={{ xs: 2}}
          className={classes.gridContainer}
        >
          {
            usersFollowing.map((element, index) => {
              return <Grid item xs={6} md={4} key={index}>
                <MemberBox data={element}></MemberBox>
              </Grid>
            })
          }
        </Grid>
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const {children,value,index} = props;
  return(
    <div>
      {
        value === index &&(
          <h1>{children}</h1>
        )
      }
    </div>
  )
}