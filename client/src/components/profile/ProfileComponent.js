import React from 'react';
import { Typography, Grid, TextField, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

export default function ProfileComponent() {

  const [bio, setBio] = React.useState("Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.");
  
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4">
        Profile
      </Typography>
      <TextField 
        label="Name"
        value="Alfred"
        fullWidth
        margin="normal"
        inputProps={{
          readOnly: true,
        }}
      />
      <TextField 
        label="Email"
        value="xxx@playpal.com"
        fullWidth
        margin="normal"
        inputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="Bio"
        multiline
        fullWidth
        margin="normal"
        minRows={2}
        value={bio}
        inputProps={{
          readOnly: true,
        }}
      />
      <Typography>
        Interests
      </Typography>
      <div className={classes.tagBox}>
        {
          interests.map((element, index) => {
            return (
              <Chip 
                key={index}
                className={classes.tag} label={element.value} variant="outlined" />
            )
          })
        }
      </div>
    </div>
  )
}