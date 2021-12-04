
import PropTypes from 'prop-types';
import tagList from "../../constants/tagList";
import React, { useEffect } from 'react';
import { Typography, Button, TextField, Chip, Box } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

const _ = require("lodash");

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

const AddTagComponent = (props) => {
  const { isEditing = false, tags, setTags, } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [newTag, setNewTag] = React.useState(null);

  const handleChipDelete = (tagLabel) => {
    const currTags = _.cloneDeep(tags);
    var tagsAfterDeletion = [];
    currTags.forEach(element => {
      if(element.label !== tagLabel) {
        tagsAfterDeletion.push(element);
      }
    });
    setTags(tagsAfterDeletion);
  }

  const handleChipAdd = () => {
    // add tag
    if (newTag === null) {
      return;
    }
    // remove disregard duplicate
    var tagDoesNotExist = true;
    const currTags = _.cloneDeep(tags);
    currTags.forEach(element => {
      if(element.label === newTag) {
        tagDoesNotExist = false;
        return;
      }
    })

    if(tagDoesNotExist) {
      currTags.push({
        label:newTag
      });
      setTags(currTags);
      setNewTag(null);
    } else {
      enqueueSnackbar("Tag already added.");
    }
  }
  
  return (
    <>
    <div className={classes.tagBox}>
      {
        tags.map((element, index) => {
          return (
            <Chip 
              key={index}
              className={classes.tag} 
              label={element.label} 
              variant="outlined"
              onDelete={
                isEditing ? () => {handleChipDelete(element.label)} : null
              }
            />
          )
        })
      }
    </div>

    {
      isEditing ?
      <Box marginBottom={2}>
        <Autocomplete
          disablePortal
          id="add-tag"
          options={tagList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Tags" />
          )}
          value={newTag}
          isOptionEqualToValue={(option, value) => {
            if(value === option.label) {
              return true;
            } else {
              return false;
            }
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              setNewTag(newValue.label);
            }
          }}
        />

        <Button
          onClick={handleChipAdd}
        >
          Add
        </Button>
      </Box>
      : null
    }
    </>
  )
}

AddTagComponent.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

export default AddTagComponent;