import React, { useEffect } from 'react';
import { Typography, Button, TextField, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  tag: {
    marginRight: theme.spacing(1),
  },
  tagBox: {
    width: "100%", 
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const interests = [
  {
    label: "Game"
  },
  {
    label: "Sport"
  },
  {
    label: "Read"
  },
  {
    label: "Coding"
  },
  {
    label: "Movie"
  },
]

export default function ProfileComponent() {

  const [bio, setBio] = React.useState("Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.");
  const [prevBio, setPrevBio] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [prevTags, setPrevTags] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);

  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  useEffect(() => {
    
  })

  const editStartHandler = () => {
    setPrevBio(bio);
    setPrevTags(tags);
    setIsEditing(true);
  }

  const editFinishHandler = () => {
    setIsEditing(false);


  }

  const cancelEditHandler = () => {
    setBio(prevBio);
    setTags(prevTags);
    setIsEditing(false);
  }

  return (
    <div style={{
      width: 520
    }}>
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
        onSelect={() => {
          if (isEditing) {
            enqueueSnackbar("Read only at the moment");
          }
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
        onSelect={() => {
          if (isEditing) {
            enqueueSnackbar("Read only at the moment");
          }
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
        variant= {isEditing ? "standard" : "outlined"}
        onChange={(e) => { setBio(e.target.value) }}
        inputProps={{
          readOnly: isEditing !== true,
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
                className={classes.tag} label={element.label} variant="outlined" />
            )
          })
        }
      </div>

      {
        isEditing ?
        <>
          <Button
            variant="outlined"
            onClick={editFinishHandler}
            style={{
              marginRight: 10
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            onClick={cancelEditHandler}
          >
            Cancel
          </Button>
        </>
        :
        <Button 
          variant="outlined"
          onClick={editStartHandler}
        >Edit</Button>
      }
    </div>
  )
}