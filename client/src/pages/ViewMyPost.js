import {
    Container,
    Grid,
    Avatar,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import CenteredTabsMyPost  from "../components/CenteredTabsMyPost";
import PostCardMatrix from "../components/PostCardMatrix";

function ViewMyPost() {
  return (
    <Container maxWidth="md" style={{}}>
        <Grid
        container
        direction="column"
        style={{ marginTop: "18px", height: "600px" }}
        wrap="nowrap"
        >
        {/* <Paper
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
            </Grid>
        </Paper> */}

        
        <Paper item md={5} style={{  marginTop:"24px", }} component={Grid}>
            <CenteredTabsMyPost  />
        </Paper>
        </Grid>
    </Container>
  );
}

export default ViewMyPost;

