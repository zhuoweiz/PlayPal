import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";


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

function AlignItemsList(props) {
  const { recommendationList, hoverId } = props;
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      md={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      lg={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      xl={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
    >
      {recommendationList.map((post, index) => {
        return (
          <React.Fragment key={index}>
            <Link href={"/post/"+ post.id} underline="hover">
              <ListItem alignItems="flex-start" style={{border : post.id === hoverId? '3px solid orange' : "" }}>
                <ListItemAvatar>
                  <Avatar src={"/post/" + post.id} />
                </ListItemAvatar>
                <ListItemText
                  primary={post.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {post.content}
                      </Typography>
                      {post.location}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
export default AlignItemsList;
