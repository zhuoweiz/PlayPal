import React, { useEffect } from 'react';
import { Typography, Button, TextField, Chip, Box } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

import AddTagComponent from '../other/AddTagComponent';
import { serverUrl} from '../../constants';

const axios = require('axios');
const _ = require("lodash");


export default function ProfileComponent(props) {

  const { userData, ...otherProps } = props;

  const [bio, setBio] = React.useState(userData.bio);
  const [prevBio, setPrevBio] = React.useState("");
  const [tags, setTags] = React.useState(userData.tags);
  const [prevTags, setPrevTags] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
  })

  const editStartHandler = () => {
    setPrevBio(bio);
    setPrevTags(tags);
    setIsEditing(true);
  }

  const cancelEditHandler = () => {
    setBio(prevBio);
    setTags(prevTags);
    setIsEditing(false);
  }

  const editFinishHandler = () => {
    axios.post(serverUrl + "/users/user/update", {
      id: localStorage.getItem("uid"),
      bio: bio,
      tags: tags,
    }).then(response => {
      setIsEditing(false);
      enqueueSnackbar("Successfully Saved!", {
        variant: "success"
      })
      console.log("update user data response: ", response);
    }).catch(error => {
      cancelEditHandler();
      enqueueSnackbar("Save Error!", {
        variant: "error"
      })
    });
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
        variant= {isEditing ? "filled" : "outlined"}
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
        variant= {isEditing ? "filled" : "outlined"}
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
        variant= {isEditing ? "outlined" : "outlined"}
        onChange={(e) => { setBio(e.target.value) }}
        inputProps={{
          readOnly: isEditing !== true,
        }}
      />
      <Typography>
        Interests
      </Typography>
      
      <AddTagComponent 
        tags={tags}
        setTags={setTags}
        isEditing={isEditing}
      />
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