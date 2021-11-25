import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import PostCardMatrix from './PostCardMatrix';
import { Grid } from "@mui/material";
// import { TabPanel } from '@mui/lab';
import PostCard from "./PostCard";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Created" />
        <Tab label="Joined" />
      </Tabs>
      <TabPanel value={value} index={0}>Posts List 1</TabPanel>
      <TabPanel value={value} index={1}>Posts List 2</TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const {children,value,index} = props;
  return(
    <div>
      {
        value === index &&(
          <h1>{children}</h1>
        )
      }
    </div>
  )
}
