import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Divider, FormControl, Link, List, ListItemButton, ListItemText, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Button } from '@mui/material';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

import {useNavigate} from 'react-router-dom';

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [alignment, setAlignment] = React.useState('left');
  const [searchType, setSearchType] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
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
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            Post Activity
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            User
          </ToggleButton>
        </ToggleButtonGroup>

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
              data.map((element) => {
                return (
                  <ListItemButton
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

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [uid, setUid] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUid(uid);
      setEmail(user.email);
    } else {
      // User is signed out
      // ...
      setUid("");
      setEmail("");
    }
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/profile">
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {
        navigate("/")
        handleMobileMenuClose();
      }}>
        <Button >Home</Button>
      </MenuItem>
      <MenuItem onClick={() => {
          navigate("/profile/notification");
          handleMobileMenuClose();
        }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem 
        // onClick={handleProfileMenuOpen}
        onClick={() => {
          navigate("/profile");
          handleMobileMenuClose();
        }}
        >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <a href="/" style={{
              color:"white",
              textDecoration: "none"
            }} >PlayPal</a>
          </Typography>
          
          
          <Search onClick={() => {
            handleClickOpen();
          }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search', 'disabled': 'true' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton href="/profile/notification" size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
              href="/profile"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {
            uid === "" ?  
            <>
              <Button href="/register" variant="default" color="error">
                Sign-up
              </Button>
              <Button href="/signin" variant="default" color="success">
                Sign-in
              </Button>
            </>
            :
            <Button
              ariant="default"
              onClick={() => {
                signOut(auth);
              }}
              style={{color:"white"}}
            >
              Sign-Out
            </Button>
          }
          {
            email==="" ? null : 
            <Button style={{color:"white"}}>
              {email}
            </Button>
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
