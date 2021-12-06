import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar, ListItemText, List, ListItem } from '@mui/material';

export default function ChatList(props) {
  const { data, joinedUsersIdMap } = props;
  const scrollRef = React.useRef(null);

  function renderRow(index) {
    const { style } = props;
    const currentUserId = parseInt(localStorage.getItem("uid"));
  
    return (
      <ListItem style={{
        paddingRight: 6,
        paddingLeft: 6,
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

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data]);

  return (
    <Box
      sx={{ width: '100%', height: 423, bgcolor: 'background.paper' }}
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

        <ListItem ref={
          scrollRef
        }></ListItem>
      </List>
    </Box>
  );
}