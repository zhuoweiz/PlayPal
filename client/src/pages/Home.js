import React from "react";
import { Container, Grid, Paper, Divider, IconButton, Skeleton} from "@mui/material";
// import Map from "../components/Map";
import PostsList from "../components/PostsList";
import PostCard from "../components/PostCard";
import { Typography, Box, Tooltip } from "@mui/material";
import FloatingActionButton from "../components/FloatingActionButton";
import { serverUrl } from "../constants";
import GoogleMapReact from "google-map-react";
import { IconContext } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSnackbar } from 'notistack';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const axios = require('axios');

function Home() {
  const {enqueueSnackbar} = useSnackbar();

  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [recommendationList, setRecommendationList] = React.useState(null);
  const [mapProps, setMapProps] = React.useState(null);
  const [tagRecommendation, setTagRecommendation] = React.useState([]);
  const tagRecommendationURL = serverUrl + '/posts/searchPostByUserInterest/' + localStorage.getItem("uid");
  React.useEffect(() => {
    // run when render/rerender
    // GET request using axios inside useEffect React hook
    axios.get(tagRecommendationURL)
      .then(response => {
        console.log(response.data);
        setTagRecommendation(response.data)
      })
      .catch(error => {
        console.error('There was an error!', error);
      }); 


    if ("geolocation" in navigator) {
      if (lat === null) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log("current position: ", position.coords.latitude, " - ", position.coords.longitude);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setMapProps({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    } else {
      enqueueSnackbar("Geolocation IS NOT available", {
        variant: "error"
      })
    }
  },[]);

  const AnyReactComponent = ({ text }) => {
    const [color, setColor] = React.useState("blue");
    const [size, setSize] = React.useState("1.5rem");
    return (
      <IconContext.Provider value={{ color: color, size: size }}>
        <div>
          <FaMapMarkerAlt
            onMouseEnter={() => {
              setColor("red");
              setSize("2rem");
            }}
            onMouseLeave={() => {
              setColor("blue");
              setSize("1.5rem");
            }}
          />
        </div>
      </IconContext.Provider>
    );
  };

  React.useEffect(() => {
    if (lat !== null && lng !== null && recommendationList === null) {
      console.log("Called when lat and lng set");
      axios
        .get(serverUrl + "/posts/searchPostByLatLng", {
          params: {
            lat: lat,
            lng: lng,
          },
        })
        .then((response) => {
          console.log("response:");
          console.log(response);
          setRecommendationList(response.data);
        })
        .catch((error) => {
          console.log(error);
          //  alert("failed to get recommendation list")
        });
    }
  }, [lat, lng]);

  return (
    <Container maxWidth="lg" style={{ height: "100vh" }}>
      <Grid container direction="row" style={{ marginTop: "12px" }}>
        <Grid item xs={11} xm={11} md={11} lg={11} xl={11}>
          <Box>
            <Typography variant="h5" gutterBottom component="div">
              Activities Near You
            </Typography>
          </Box>
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
              style={{ 
                height: 300,
                border: "solid 1px #ffe5b4",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={7}
                xl={7}
                style={{ height: "100%", maxHeight: "360px",
                  maxWidth: "60%",
                borderRadius: "12px", overflow: "hidden" }}
              >
                {mapProps && lat && lng && recommendationList ? (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc",
                    }}
                    center={mapProps.center}
                    zoom={12}
                  >
                    {recommendationList.map((post, index) => {
                      return (
                        <AnyReactComponent
                          key={post.id}
                          lat={post.lat}
                          lng={post.lng}
                        />
                      );
                    })}
                  </GoogleMapReact>
                ) : <Skeleton variant="text"
                  width={510} height={308}  
                />}
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={5}
                xl={5}
                style={{ height: "100%", maxHeight: "360px", overflow: "auto",
                borderRadius: "12px",
              }}
              >
                <Paper>
                  {recommendationList ? 
                    <PostsList
                    recommendationList={
                      recommendationList ? recommendationList : []
                    }
                  />
                  :
                  <Skeleton variant="text"
                    animation="wave" 
                    width="100%" height={308} 
                  />
                  }
                  
                </Paper>
              </Grid>
            </Grid>
            <Box style={{ marginTop: "30px" }}>
              <Typography variant="h5" gutterBottom component="div">
                Recommended Activities

                <Tooltip
                  title="These recommendations are generated based on your interest tags. Set your interest tags here 🙂"
                >
                  <IconButton size="small" aria-label="show 4 new mails" color="inherit"
                    href="/profile/0"
                  >
                    <HelpCenterIcon
                      color="primary"
                      
                    />
                  </IconButton>
                  
                </Tooltip>
                
              </Typography>

              
            </Box>
            <Grid
              item
              container
              spacing={{ xs: 2, md: 3 }}
              // columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {
                tagRecommendation.map((element, index) => {
                  return <Grid item xs={12} sm={6} md={4} key={index}>
                    <PostCard postData={element}/>
                  </Grid>
                })
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} xm={1} md={1} lg={1} xl={1}>
          <FloatingActionButton />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
