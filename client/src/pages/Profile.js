import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate, Routes, Route, Outlet, Link, useMatch, useSearchParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { serverUrl } from '../constants';
import ProfileComponent from '../components/profile/ProfileComponent';
import SettingComponent from '../components/profile/SettingComponent';
import NotificationComponent from '../components/profile/NotificationComponent';
import { Grow } from '@mui/material';

import { useParams } from "react-router-dom";
import { getAuth } from 'firebase/auth';

const axios = require('axios');
function TabPanel(props) {
  const { children, value, index, ...other } = props;
   
  return (
    <div
      role="tabpanel"
      {...other}
    >
    
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Profile = () => {
  const params = useParams();
  const auth = getAuth();

  const [value, setValue] = React.useState(parseInt(params.profilePath));
  const [userData, setUserData] = React.useState(null);
  const [currentPath, setCurrentPath] = React.useState(parseInt(params.profilePath));

  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  const location = useLocation();
  var fecthingUserData = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function renderChildComponents(userData, currentPath) {
    if (userData === null) {
      return null;
    }

    if (currentPath === 0) {
      return (
        <ProfileComponent userData={userData}></ProfileComponent>
      )
    } else if (currentPath === 1) {
      return (
        <SettingComponent></SettingComponent>
      )
    } else if (currentPath === 2) {
      return (
        <NotificationComponent></NotificationComponent>
      )
    } else {
      return (<></>)
    }
  }

  React.useEffect(() => {
    if(userData === null && fecthingUserData === false) {
      fecthingUserData = true;
      axios.get(serverUrl + "/users/user/" + parseInt(localStorage.getItem("uid")),{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("tmpToken")}`
        }
      })
      .then(response => {
        console.log("response user data: ", response.data);
        setUserData(response.data);
      })
      .catch(error => {
        enqueueSnackbar("Not logged in, pls do so after sign-in", {
          variant: 'warning',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          TransitionComponent: Grow,
        });
      })
    }
  });

  return (
    <Container maxWidth="md">
      <Box
        sx={{ 
          flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
          marginTop: 4,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab onClick={() => {
            setValue(0);
            setCurrentPath(0)
            // navigate("profile");
          }} label="Profile" />
          <Tab onClick={() => {
            setValue(1);
            setCurrentPath(1)
            // navigate("setting");
          }} label="Setting" />
          <Tab onClick={() => {
            setValue(2);
            // navigate("notification");
            setCurrentPath(2)
          }} label="Notifications" />
        </Tabs>

        <TabPanel>
          { renderChildComponents(userData, currentPath) }
        </TabPanel>
      </Box>
    </Container>
    
  );
}

export default Profile;