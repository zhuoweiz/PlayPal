import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

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

function ProfileComponent() {
  return (
    <Typography>
      Profiles
      <Link to="/profile/setting">setting</Link>
    </Typography>
  )
}
function SettingComponent() {
  return (
    <Typography>
      Settings
    </Typography>
  )
}
function NotificationCenterComponent() {
  return (
    <Typography>
      Notification Center
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Routes>
      // <Route path="/" element={
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Link to="setting"><Tab label="Profile" /></Link>
            
            <Tab label="Settings" />
            <Tab label="Notifications" />
          </Tabs>
    
          <TabPanel>
            <Outlet />
          </TabPanel>
        </Box>
      // } >
        
    // </Routes>
    
  );
}

export default Profile;