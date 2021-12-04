import React, { useEffect } from 'react';
import { Typography, Button, TextField, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { serverUrl } from '../../constants';
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

export default function ProfileComponent(props) {

  const { userData, ...otherProps } = props;

  const [bio, setBio] = React.useState(userData.bio);
  const [prevBio, setPrevBio] = React.useState("");
  const [tags, setTags] = React.useState(userData.tags);
  const [prevTags, setPrevTags] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
  })

  const editStartHandler = () => {
    setPrevBio(bio);
    setPrevTags(tags);
    setIsEditing(true);
  }

  const editFinishHandler = () => {
    setIsEditing(false);

    axios.post(serverUrl + "/users/user/update", {
      id: localStorage.getItem("uid"),
      bio: bio
    }).then(response => {
      console.log("update user data response: ", response);
    }).catch(error => {

    });
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
        value={userData.name}
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
        value={userData.email}
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
          tags.map((element, index) => {
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