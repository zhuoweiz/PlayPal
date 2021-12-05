import * as React from "react";
import { makeStyles } from '@mui/styles';
import { Paper, Grid, Avatar } from '@mui/material';

const useStyles = makeStyles((theme) => ({

  memberBox: {
    transition: "all .5s",
    boxShadow: "none",
    border: "solid 2px white",
    '&:hover': {
      border: "solid 2px DodgerBlue",
      boxShadow: "3px 3px 3px teal",
    }
  },
}));

export default function MemberBox(props) {
  const { data, ...otherProps } = props;
  const classes = useStyles();

  return (
    <a style={{
      textDecoration: "none"
    }} href={`/user/${data ? data.id : ""}`}>
      <Paper className={classes.memberBox}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
          <Avatar 
            sx={{ width: 30, height: 30 }}
            src="../../public/profile_avatar.png"
          ></Avatar>
          </Grid>
          <Grid item
            style={{
              marginLeft: 4,
            }}
          >
            {
              data ? data.name : null
            }
          </Grid>
          </Grid>
      </Paper>
    </a>
    
  )
}