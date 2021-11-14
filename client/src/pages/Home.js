import { Container, Grid, Paper, Divider } from "@mui/material";
import { grid } from "@mui/system";
import Maps from "../components/Map";
import PostsList from "../components/PostsList";
import PostCard from "../components/PostCard";

function Home() {
  return (
    <Container maxWidth="md" style={{ height: "100vh" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        style={{ height: "100%" }}
        wrap="nowrap"
      >
        <Grid
          item
          container
          direction="row"
          spacing={0}
          style={{ height: "50%" }}
        >
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={7}
            xl={7}
            style={{ height: "100%" }}
          >
            <Maps />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={5}
            xl={5}
            style={{ height: "100%" }}
          >
            <Paper>
              <PostsList />
            </Paper>
          </Grid>
        </Grid>

        <Grid
          item
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ marginTop: "30px" }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <PostCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
