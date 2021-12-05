import { Container, Grid, Paper, Divider } from "@mui/material";
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
  console.log("postData", postData);
  const handleViewPost = () => {

  }

  return (
    <React.Fragment>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                sx={{ fontSize: 16 }}
                color="text.first"
                gutterBottom
              >
                {postData ? postData.title : null}
              </Typography>
            </Grid>
            <Grid item>
            {
              postData && postData.tags ? 
              postData.tags.map((tag, index) => {
                <Chip label={tag} variant="outlined" size="small" /> 
              }) 
              : 
              null
            }
              {/* postData.map((element, index) => {
                return <Grid item xs={6} md={4} key={index}>
                  <Chip label={element} variant="outlined" size="small" />
                </Grid>
              })
              :
              null
            }  */}
            </Grid>
          </Grid>
          <Typography variant="subtitle1" >
            Detail: {postData ? postData.content : null}
          </Typography>
          <Typography variant="body2" >
            Host: {postData ? postData.creator.name : null}
          </Typography>
          <Typography variant="body2" >
            Date:
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" 
            href={postData ? `/post/${postData.id}` : "#"}
            onClick={handleViewPost}
          >Learn More</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default PostCard;
