import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IconContext } from "react-icons";


const MapIcon = ({ text }) => {
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

  export default MapIcon;