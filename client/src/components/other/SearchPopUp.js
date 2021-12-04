import * as React from 'react';
import { 
  Stack, List, 
  ListItemButton, ListItemText, 
  TextField, 
  ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { useSnackbar } from 'notistack';
import { serverUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';

const axios = require("axios");


export default function SearchPopUp(props) {
  const { onClose, selectedValue, open } = props;

  const [searchType, setSearchType] = React.useState(1);
  const [searchRule, setSearchRule] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleAlignment = (event, newAlignment) => {
    if(searchRule === 2 && newAlignment === 2) {
      enqueueSnackbar("Not supported yet")
    } else {
      setSearchType(newAlignment);
    }
    
  };
  const handleAlignment2 = (event, newAlignment) => {
    if(searchType === 2 && newAlignment === 2) {
      enqueueSnackbar("Not supported yet")
    } else {
      setSearchRule(newAlignment);
    }
  };

  const handleClose = () => {
    onClose(1);
  };

  const handleSearchSubmit = (e) => {
    // Post search only atm
    e.preventDefault();
    enqueueSnackbar("Search Submitted");
    const searchRequestLink = serverUrl + `${searchRule === 2 ? "/posts/searchPostByTag" : "/posts/post"}`;

    // send axios search request
    axios.get(searchRequestLink, {
      params: {
        keyword: searchValue
      }
    })
    .then(function (response) {
      enqueueSnackbar("Search Finished");
      console.log("response.data: ", response.data);
      setSearchResult(response.data);
    })
    .catch(function (error) {
      enqueueSnackbar("Search Failed");
      console.log(error);
    })
  }

  const handleListItemClick = (event, id) => {
    onClose(0);
    navigate("/post/" + id);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <ToggleButtonGroup
            value={searchType}
            color="primary"
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value={1} aria-label="left aligned">
              Post
            </ToggleButton>
            <ToggleButton value={2} aria-label="centered">
              User
            </ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            size="small"
            value={searchRule}
            exclusive
            onChange={handleAlignment2}
            aria-label="text alignment"
          >
            <ToggleButton value={1} aria-label="left aligned">
              By Word
            </ToggleButton>
            <ToggleButton value={2} aria-label="right aligned">
              By Tag
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <form
          onSubmit={handleSearchSubmit}
        >
          <TextField
            label="Search here"
            sx={{
              marginTop: 2,
              width: 400
            }}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          ></TextField>
          {/* <Button variant="outlined">Search</Button> */}
        </form>

        <div>
          <List component="nav" aria-label="main mailbox folders">
            {
              searchResult.map((element,index) => {
                return (
                  <ListItemButton
                    key={index}
                    onClick={(event) => handleListItemClick(event, element.id)}
                  >
                    <ListItemText 
                      primary={element.title} 
                      secondary={element.description}
                    />
                  </ListItemButton>
                )
              })
            }
          </List>
        </div>
      </DialogContent>
      
    </Dialog>
  );
}