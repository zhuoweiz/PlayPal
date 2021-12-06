import { Container, Grid, Paper, Divider, Stack } from "@mui/material";
import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PostCard(props) {
  const { postData, ...otherProps } = props;
  const handleViewPost = () => {

  }

  return (
    <React.Fragment>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item xs={12}
              
            >
              <Typography
                sx={{ fontSize: 16,
                  marginBottom: 0,
                }}
                color="text.first"
                gutterBottom
              >
                {postData ? postData.title : null}
              </Typography>
            </Grid>
            <Grid item 
              container
              xs={12}
              style={{
                // marginTop: 4,
                // marginBottom: 4,
              }}
            >
                {
                  postData && postData.tags ? 
                  postData.tags.map((tag, index) => {
                  return(
                    <Chip 
                      key={index}
                      color="primary"
                      label={tag.label} variant="outlined" size="small" 
                      style={{
                        marginTop: 4,
                        marginBottom: 4,
                      }}
                      /> 
                  )
                  }) 
                  : 
                  null
                }
            
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" >
                Detail: {postData ? postData.content : null}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" >
                Host: {postData ? postData.creator.name : null}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" >
                Date: {
                  postData ? 
                  (new Date(postData.dateTime)).toLocaleString(
                    undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }
                  )
                  : null
                }
              </Typography>
            </Grid>
          </Grid>
          
        </CardContent>
        <CardActions>
          <Button
            href={postData ? `/post/${postData.id}` : "#"}
            onClick={handleViewPost}
            style={{
              width: "100%",
              display: "flex",
              // justifyContent: "flex-end"
            }}
          >Learn More
          
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default PostCard;
