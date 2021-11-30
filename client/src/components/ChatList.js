import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { ListItemAvatar } from '@mui/material';

import People from '@mui/icons-material/People';

function renderRow(props) {
  const { index, style, data } = props;
  const currentUserId = 1;

  console.log("data: ", data);

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      { data[index].senderId === currentUserId ? null : 
        <ListItemAvatar>
          <Avatar sx={{ width: 36, height: 36 }} src="../../public/profile_avatar.png" />
        </ListItemAvatar>
      }
      
      <ListItemText 
        align={data[index].senderId === currentUserId ? "right" : "left"} 
        primary={(data[index].senderId === currentUserId ? "" : `User ${data[index].senderId}: `) + `${data[index].content}`} 
        secondary={`${data[index].sendTime}`}
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

export default function ChatList(props) {
  const { data } = props;

  return (
    <Box
      sx={{ width: '100%', height: 330, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={330}
        itemSize={46}
        itemCount={data.length}
        itemData={data}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}