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
  const [searchResultType, setSearchResultType] = React.useState(null);

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
    if(searchValue === "") {
      enqueueSnackbar("No Keyword Specified", {
        variant: 'error'
      });
      return;
    } else if(searchValue.length < 3) {
      enqueueSnackbar("Keyword Too Short (3 char minimum)", {
        variant: 'warning'
      });
      return;
    }
    enqueueSnackbar("Search Submitted");

    // Link Processing
    var searchRequestLink = serverUrl ;
    if(searchType == 1) {
      searchRequestLink += "/posts";
      searchRequestLink += `${searchRule === 2 ? "/searchPostByTag" : "/post"}`
    } else {
      searchRequestLink += "/users";
      searchRequestLink += "/searchUser";
    }

    // http://localhost:8080/users/searchUser?keyword=BBY
    // send axios search request
    setSearchResultType(searchType);
    axios.get(searchRequestLink, {
      params: {
        keyword: searchValue
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("tmpToken")}`
      }
    })
    .then(function (response) {
      enqueueSnackbar("Search Finished", {
        variant: 'info'
      });
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
    if (searchResultType === 1) {
      navigate("/post/" + id);
    } else {
      navigate("/user/" + id);
    }
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
                      primary={element.title ? element.title : element.name} 
                      secondary={element.content}
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