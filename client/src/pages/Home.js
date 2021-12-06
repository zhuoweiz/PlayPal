import React from "react";
import { Container, Grid, Paper, Divider } from "@mui/material";
import { grid } from "@mui/system";
import Map from "../components/Map";
import PostsList from "../components/PostsList";
import PostCard from "../components/PostCard";
import { Typography, Box } from "@mui/material";
import FloatingActionButton from "../components/FloatingActionButton";
import { serverUrl } from "../constants";
import GoogleMapReact from "google-map-react";
import { IconContext } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";

const axios = require('axios');

function Home() {
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();
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
  },[]);  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("current position");
      console.log(position.coords.latitude);
      setLat(position.coords.latitude);
      console.log(position.coords.longitude);
      setLng(position.coords.longitude);
      setMapProps({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  } else {
    console.log("geolocation IS NOT available");
  }

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
  // const getRecommendation = ()=>{
  //  if(lat !== null && lng !== null){

  //  }
  // }
  React.useEffect(() => {
    console.log("123");
    if (lat !== null && lng !== null && recommendationList === null) {
      console.log(lat);
      console.log(lng);

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
  });

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
              style={{ height: "50%", maxHeight: "360px" }}
            >
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={7}
                xl={7}
                style={{ height: "100%", maxHeight: "360px" }}
              >
                {/* <Map 
                  recommendationList = {recommendationList}
                /> */}
                {mapProps && lat && lng && recommendationList ? (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc",
                    }}
                    center={mapProps.center}
                    zoom={9}
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
                ) : null}
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={5}
                xl={5}
                style={{ height: "100%", maxHeight: "360px", overflow: "auto" }}
              >
                <Paper>
                  <PostsList
                    recommendationList={
                      recommendationList ? recommendationList : []
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
            <Box style={{ marginTop: "30px" }}>
              <Typography variant="h5" gutterBottom component="div">
                Recommended Activites
              </Typography>
            </Box>
            <Grid
              item
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {
                tagRecommendation.map((element, index) => {
                  return <Grid item xs={6} md={4} key={index}>
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
