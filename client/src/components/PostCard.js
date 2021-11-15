import { Container, Grid, Paper, Divider } from "@mui/material";
import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PostCard() {
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
                titleTest
              </Typography>
            </Grid>
            <Grid item>
              <Chip label="tag1" variant="outlined" size="small" />
              <Chip label="tag2" variant="outlined" size="small" />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" >
            Description:
          </Typography>
          <Typography variant="body2" >
            Host:
          </Typography>
          <Typography variant="body2" >
            Date:
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default PostCard;