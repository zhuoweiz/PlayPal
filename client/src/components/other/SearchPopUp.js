import * as React from 'react';
import { 
  Stack, List, 
  ListItemButton, ListItemText, 
  TextField, 
  ToggleButton, ToggleButtonGroup 
} from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { useSnackbar } from 'notistack';


export default function SearchPopUp(props) {
  const { onClose, selectedValue, open } = props;

  const [alignment, setAlignment] = React.useState(1);
  const [alignment2, setAlignment2] = React.useState(1);
  const [searchType, setSearchType] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleAlignment = (event, newAlignment) => {
    if(alignment2 === 2 && newAlignment === 2) {
      enqueueSnackbar("Not supported yet")
    } else {
      setAlignment(newAlignment);
    }
    
  };
  const handleAlignment2 = (event, newAlignment) => {
    if(alignment === 2 && newAlignment === 2) {
      enqueueSnackbar("Not supported yet")
    } else {
      setAlignment2(newAlignment);
    }
  };

  const handleClose = () => {
    onClose(1);
  };

  const data = [
    "yes",
    "no",
  ]

  const handleListItemClick = (value) => {
    // onClose(value);
    // go to a post page or person page (target blank)
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
            value={alignment}
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
            value={alignment2}
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
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitted...")
          }}
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
              data.map((element,index) => {
                return (
                  <ListItemButton
                    key={index}
                    onClick={(event) => handleListItemClick(event, 0)}
                  >
                    <ListItemText primary={element} />
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