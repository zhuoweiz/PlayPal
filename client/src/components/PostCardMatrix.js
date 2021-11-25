
import {Grid} from '@mui/material';
import React from 'react';
import PostCard from './PostCard';



function PostCardMatrix(){
    return(
        <React.Fragment>
            <Grid
          item
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{width:'100%',height:"100%"}}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <PostCard />
            </Grid>
          ))}
        </Grid>
        </React.Fragment>
    )
}

export default PostCardMatrix;