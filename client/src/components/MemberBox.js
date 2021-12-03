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
    <a href={`/user/${data ? data.id : ""}`}>
      <Paper className={classes.memberBox}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Avatar 
              sx={{ width: 40, height: 40 }}
              src="../../public/profile_avatar.png"
            ></Avatar>
          </Grid>
          <Grid item>
            {
              data ? data.name : "test name"
            }
          </Grid>
        </Grid>
      </Paper>
    </a>
    
  )
}