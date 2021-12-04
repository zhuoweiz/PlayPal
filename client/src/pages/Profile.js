import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate, Routes, Route, Outlet, Link, useMatch, useSearchParams, useLocation } from 'react-router-dom';

import { serverUrl } from '../constants';
import ProfileComponent from '../components/profile/ProfileComponent';
import SettingComponent from '../components/profile/SettingComponent';
import NotificationComponent from '../components/profile/NotificationComponent';

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
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  var fecthingUserData = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  React.useEffect(() => {
    if(location.pathname.split('/')[2] === "setting") {
      setValue(1);
    } else if(location.pathname.split('/')[2] === "notification") {
      setValue(2);
    } else {
    }

    if(userData === null && fecthingUserData === false && location.pathname.split('/').length < 3) {
      fecthingUserData = true;
      axios.get(serverUrl + "/users/user/" + parseInt(localStorage.getItem("uid")))
      .then(response => {
        // console.log("response user data: ", response.data);
        setUserData(response.data);
      })
      .catch(error => {
        alert("profile data failed to fetch....");
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
          // onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab onClick={() => {
            setValue(0);
            navigate("");
          }} label="Profile" />
          <Tab onClick={() => {
            setValue(1);
            navigate("setting");
          }} label="Setting" />
          <Tab onClick={() => {
            setValue(2);
            navigate("notification");
          }} label="Notifications" />
        </Tabs>

        <TabPanel>
          {/* <Outlet/> */}
          {
            userData ? (
              <Routes>
                <Route index element={<ProfileComponent userData={userData}></ProfileComponent>} />
                <Route
                  path="setting"
                  element={<SettingComponent></SettingComponent>}
                />
                <Route
                  path="notification"
                  element={<NotificationComponent></NotificationComponent>}
                ></Route>
              </Routes>
            ) : null
          }
          
        </TabPanel>
      </Box>
    </Container>
    
  );
}

export default Profile;