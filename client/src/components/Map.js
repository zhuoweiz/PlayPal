import React, { useState } from "react";
import { Grid } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { IconContext } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import PostCard from "./PostCard";

const postsFromBackend = [
  { text: "basketball", lat: "43.188947", lng: "-76.254480", id: "1" },
  { text: "soccer", lat: "43.088947", lng: "-76.354480", id: "2" },
  { text: "baseball", lat: "43.388947", lng: "-76.154480", id: "3" },
];

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
