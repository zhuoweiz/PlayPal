import {
  Container,
  Grid,
  Avatar,
  Typography,
  Button,
  Stack,
  Chip
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import CenteredTabs  from "../components/CenteredTabs";
import PostCardMatrix from "../components/PostCardMatrix";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tag: {
    marginRight: theme.spacing(1),
  },
  tagBox: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
}));


const interests = [
  {
    value: "Game"
  },
  {
    value: "Sport"
  },
  {
    value: "Read"
  },
  {
    value: "Coding"
  },
  {
    value: "Movie"
  },
]

function ViewUser() {

  const classes = useStyles();

  return (
    <Container maxWidth="md" style={{}}>
      <Grid
        container
        direction="column"
        style={{ marginTop: "18px", height: "600px" }}
        wrap="nowrap"
      >
        <Paper
          component={Grid}
          item
          container
          justifyContent="space-between"
          alignItems="center"
          md={2}
          style={{ padding: "12px", backgroundColor: "white" }}
        >
          <Grid item style={{}}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
              }
              title="Remy Sharp"
            />
          </Grid>
          <Grid item style={{}}>
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: "12px" }}
            >
              follow
            </Button>
            <Button variant="outlined" size="small">
              unfollow
            </Button>
          </Grid>
        </Paper>
        <Paper container item md={3} style={{marginTop:"24px" , padding:"12px"}} direction="column" component={Grid}>
          <Grid item md={8} style={{}}>
            bio
          </Grid>
          <Grid item md={4} style={{}}>
            interest tags
            <div className={classes.tagBox}>
              {
                interests.map((element, index) => {
                  return (
                    <Chip 
                      key={index}
                      className={classes.tag} label={element.value} variant="outlined" />
                  )
                })
              }
            </div>
          </Grid>
        </Paper>

        
        <Paper item md={5} style={{  marginTop:"24px", }} component={Grid}>
            <CenteredTabs  />
        </Paper>
      </Grid>
    </Container>
  );
}
// style={{wight:"100%", height:"100%"}}
export default ViewUser;
