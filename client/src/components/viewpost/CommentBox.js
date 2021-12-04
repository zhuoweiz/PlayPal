import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Chip, Paper, List, ListSubheader, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const CommentBox = (props) => {
  
  const { onSend = null, commentsData = null } = props;

  const [comment, setComment] = React.useState("");

  const sendHandler = () => {
    if (onSend) {
      onSend(comment);
      setComment("");
    }
  }

  React.useEffect(() => {
    
  });

  return (
    <Paper variant="outlined" style={{
      width: "100%",
    }}>
      <Grid container justifyContent="center" direction="column" textAlign="center">
        <Grid item>
          <Typography style={{marginTop: 8}}>
            Comments
          </Typography>
        </Grid>
        <Grid item style={{
          textAlign: "left",
          }}>

          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              height: 310,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {
              commentsData ? commentsData.map((comment, sectionId) => (
                <li key={`section-${sectionId}`}>
                  <ul style={{
                    marginBottom: 4,
                  }}>
                    {/* <ListSubheader
                      style={{
                        lineHeight: 1
                      }}
                    >
                    </ListSubheader> */}
                    <ListItem key={`item-${sectionId}-item`}>
                      <ListItemText 
                        primary={`Author: ${comment.creatorName} (T: ${(new Date(comment.createdDate)).toLocaleDateString(
                          undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' }
                        )})`}
                        secondary={<Typography>
                          {comment.content}
                        </Typography>} 
                      />
                    </ListItem>
                  </ul>
                </li>
              ))
              : null
            }
          </List>

        </Grid>
        <Grid item container alignItems="center" justifyContent="center" 
          style={{
            marginTop: 10,
          }}
        >
          <TextField
            label="write your comment here"
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: 300,
            }}
          >
          </TextField>
          <Button variant="outlined" style={{
            marginLeft: 8,
            width: 100
          }}
            onClick={sendHandler}
          >Comment</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

CommentBox.propTypes = {
  onSend: PropTypes.func,
  commentsData: PropTypes.array.isRequired,
}

export default CommentBox;