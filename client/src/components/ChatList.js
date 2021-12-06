import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, VariableSizeList } from 'react-window';
import { ListItemAvatar, ListItemText, List, ListItem } from '@mui/material';

import People from '@mui/icons-material/People';

export default function ChatList(props) {
  const { data, joinedUsersIdMap } = props;

  function renderRow(index) {
    const { style } = props;
    const currentUserId = parseInt(localStorage.getItem("uid"));
  
    return (
      <ListItem style={{

      }} key={index} component="div" disablePadding>
        { data[index].senderId === currentUserId ? null : 
          <ListItemAvatar>
            <Avatar sx={{ width: 36, height: 36 }} src="../../public/profile_avatar.png" />
          </ListItemAvatar>
        }
        
        <ListItemText 
          align={data[index].senderId === currentUserId ? "right" : "left"} 
          primary={(data[index].senderId === currentUserId ? "" : `${joinedUsersIdMap[data[index].senderId]}: `) + `${data[index].content}`} 
          secondary={`${(new Date(data[index].createdDate.seconds)).toLocaleDateString(
            undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }
          )}`}
        />
  
        { data[index].senderId !== currentUserId ? null : 
          <ListItemAvatar
            align={"right"} 
          >
            <Avatar sx={{ width: 36, height: 36 }} src="../../public/profile_avatar.png" />
          </ListItemAvatar>
        }
      </ListItem>
    );
  }

  function getItemSize(index) {
    return (10+ (data[index].content.length - 100)/50);
  }

  return (
    <Box
      sx={{ width: '100%', height: 430, bgcolor: 'background.paper' }}
    >
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          height: 420,
          '& ul': { padding: 0 },
        }}
      >
        {
          data.map((element, index) => {
            return renderRow(index);
          })
        }
      </List>
    </Box>
  );
}