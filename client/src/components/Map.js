import React, { useState } from "react";
import { Grid } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { GrMap } from "react-icons/gr";

const postsFromBackend = [
  { text: "basketball", lat: "43.188947", lng: "-76.254480", id: "1" },
  { text: "soccer", lat: "43.088947", lng: "-76.354480", id: "2" },
  { text: "baseball", lat: "43.388947", lng: "-76.154480", id: "3" },
];

const AnyReactComponent = ({ text }) => {
  const [color, setColor] = React.useState("white");
  const styles = {
    color: "white",
    background: color,
    padding: "20px 20px",
    display: "inline-flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "70%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <GrMap
      color="blue"
      size="24px"
      onMouseEnter={() => setColor("green")}
      onMouseLeave={() => setColor("white")}
    />
  );
};
const postItems = postsFromBackend.map((post) => {
  return (
    <AnyReactComponent
      key={post.id}
      lat={post.lat}
      lng={post.lng}
      text={post.text}
    />
  );
});

function Map() {
  const defaultProps = {
    center: {
      lat: 43.088947,
      lng: -76.15448,
    },
    zoom: 8,
  };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      {postItems}
    </GoogleMapReact>
  );
}

export default Map;
