import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const postsFromBackend = [
  {
    name: "remy",
    src: "/static/images/avatar/1.jpg",
    primary: "Brunch this weekend?",
    secondary: "Ali Connors",
    text: " — I'll be in your neighborhood doing errands this…",
  },
  {
    name: "remy",
    src: "/static/images/avatar/1.jpg",
    primary: "Brunch this weekend?",
    secondary: "Ali Connors",
    text: " — I'll be in your neighborhood doing errands this…",
  },
  {
    name: "remy",
    src: "/static/images/avatar/1.jpg",
    primary: "Brunch this weekend?",
    secondary: "Ali Connors",
    text: " — I'll be in your neighborhood doing errands this…",
  },
];

function AlignItemsList() {
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      md={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      lg={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      xl={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
    >
      {postsFromBackend.map((post) => {
        return (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={post.name} src={post.src} />
              </ListItemAvatar>
              <ListItemText
                primary={post.primary}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {post.secondary}
                    </Typography>
                    {post.text}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
export default AlignItemsList;
