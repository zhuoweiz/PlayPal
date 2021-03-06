import { Container, Grid, Button} from "@mui/material";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { serverUrl } from "../constants";
import { makeStyles } from "@mui/styles";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { useSnackbar } from 'notistack';

const axios = require('axios');
const _ = require("lodash");

function Admin() {
    const [posts, setPosts] = React.useState([])
    const [comments, setComments] = React.useState([])
    const [value,setValue] = React.useState(0);
    const { enqueueSnackbar } = useSnackbar();
   
    const handleChange = (event, newvalue)=>{
        setValue(newvalue);
    }
    const useStyles = makeStyles((theme) => ({
        gridContainer: { 
          marginTop: "30px", 
          paddingRight: 6,
          paddingLeft: 2,
        },
      }));
      const classes = useStyles();
      React.useEffect(()=>{
        if(posts.length === 0){
          axios.get(serverUrl + '/posts/getAllPosts/'+localStorage.getItem("uid"), {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("tmpToken")}`
            }
          })
          .then(response=>{
              setPosts(response.data)
          })
          .catch(error=>{
              console.log(error);
          })
          axios.get(serverUrl+ '/comments/getAllComments/'+localStorage.getItem("uid"), {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("tmpToken")}`
            }
          })
          .then(response=>{
              setComments(response.data)
          })
          .catch(error=>{
              console.log(error);
          })
        }
      },[posts.length]);
  return (
    <Container maxWidth="md" style={{}}>
    <Grid sx={{ width: "100%", bgcolor: "background.paper" }}>
    <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Posts" />
        <Tab label="Comments" />
       
      </Tabs>
      <TabPanel value={value} index={0}>
        Posts
        <Grid
            item
            container
            spacing={{ xs: 2 }}
            className={classes.gridContainer}
          >
            {
              posts.map((element, index) => {
                return <Grid container item justifyContent="space-between" alignItems="center" xs={12} md={12} key={index}>
                  <Grid item>{element.title}</Grid>
                  <Grid item>{element.content} </Grid>
                  <Grid item><Button variant="text" onClick={()=>{
                    axios.get(serverUrl + '/posts/archive?'+ 'postId='+element.id,{
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem("tmpToken")}`
                      }
                    })
                    .then(response=>{
                      enqueueSnackbar("Archive Success", {
                        variant: "success"
                      })
                      const currPosts = _.cloneDeep(posts);
                      var newPosts = [];
                      currPosts.forEach(item => {
                        if (item.id !== element.id) {
                          newPosts.push(item);
                        }
                      })
                      setPosts(newPosts);
                    })
                    .catch(error=>{
                      enqueueSnackbar("Archive Failed", {
                        variant: "error"
                      })
                        console.log(error);
                    })
                  }}>ARCHIVE</Button></Grid>
                </Grid>
              })
              }
          </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Comments
        <Grid
              item
              container
              spacing={{ xs: 2}}
              className={classes.gridContainer}
            >
              {
                comments.map((element, index) => {
                    return <Grid container item justifyContent="space-between" alignItems="center" xs={12} md={12} key={index}>
                    <Grid item>{element.creatorName}</Grid>
                    <Grid item>{element.content} </Grid>
                    <Grid item><Button variant="text" onClick={()=>{
                        axios.delete(serverUrl + '/comments/comment/'+ element.id, {
                          headers: {
                            'Authorization': `Bearer ${localStorage.getItem("tmpToken")}`
                          }
                        })
                        .then(response=>{
                          enqueueSnackbar("Delete Success", {
                            variant: "success"
                          });
                          const currComments = _.cloneDeep(comments);
                          var newComments = [];
                          currComments.forEach(item => {
                            if (item.id !== element.id) {
                              newComments.push(item);
                            }
                          });
                          setComments(newComments);
                        })
                        .catch(error=>{
                          enqueueSnackbar("Delete Failed", {
                            variant: "error"
                          })
                            console.log(error);
                        })
                    }}>DELETE</Button></Grid>
                  </Grid>
                })
              }
            </Grid>
      </TabPanel>
     
    </Grid>
  </Container>
  )
}

function TabPanel(props) {
    const {children,value,index} = props;
    return(
      <div>
        {
          value === index &&(
            <p>{children}</p>
          )
        }
      </div>
    )
  }

export default Admin;
