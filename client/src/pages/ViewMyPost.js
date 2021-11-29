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
            <Paper item md={5} style={{  marginTop:"24px", }} component={Grid}>
                <CenteredTabsMyPost  />
            </Paper>
        </Grid>
    </Container>
  );
}

export default ViewMyPost;

