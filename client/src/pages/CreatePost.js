import { Container, Grid, Box, Divider, Chip, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import MUIRichTextEditor from "mui-rte";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import * as React from "react";
import Map from "../components/Map";
import {
  default as GoogleMapsAutoComplete,
  usePlacesWidget,
} from "react-google-autocomplete";
import tagList from "../constants/tagList";
import Autocomplete from "@mui/material/Autocomplete";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { serverUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, setDoc, collection, Timestamp, getFirestore } from "firebase/firestore"; 

import AddTagComponent from "../components/other/AddTagComponent";

const axios = require("axios");
const _ = require("lodash");

//require('dotenv').config({path: '.ENV'});
const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc";
const MAILGUN_API="e41d5411106f424f6bc6d354e7034cf1-7b8c9ba8-14ed39fe";
const DOMAIN="sandbox0a4e20a9344743fd8711b2649f370e7f.mailgun.org";


function CreatePost() {
  const [email, setEmail] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [tag, setTag] = React.useState("");
  // const [options, setOptions] = React.useState(tagList);

  const [date, setDate] = React.useState(new Date("2021-12-02T21:11:54"));
  // 1. convert dateString to ms method Date.parse(dateString) 
  // 2. convertr ms to Date first var date = new Date(time) then date.toString()
  
 const [title, setTitle] = React.useState("");
 const [location,setLocation] = React.useState("");
 const [lat, setLat] = React.useState()
 const [lng, setLng] = React.useState()
 const [isVirtual, setIsVirtual] = React.useState(false);
 const [content, setContent] = React.useState("");

 const navigate = useNavigate();
 const {enqueueSnackbar, closeSnackbar} = useSnackbar();
 const db = getFirestore();

 const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: email,
	subject: 'Hello',
	text: 'You just created a post!'
};

 const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    setEmail(user.email);
  } else {
    // User is signed out
    // ...
    setEmail("");
  }
});

  const { ref: materialRef } = usePlacesWidget({
    apiKey: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc",
    onPlaceSelected: (place) => {
      console.log(place);
      // console.log(place.formatted_address);
      setLocation(place.formatted_address)
      setLat(place.geometry.location.lat())
      setLng(place.geometry.location.lng())
      // console.log(place.geometry.location.lat());
      // console.log(place.geometry.location.lng());
    },
    options: {
      types: ["establishment", "geocode"],
      componentRestrictions: { country: "us" },
    },
    defaultValue: "syracuse",
  });

  async function createPostOnFirestore(docData) {
    await setDoc(doc(collection(db, "messages")), docData);
  }

  function handleCreatePostAction() {
    
    axios.post(serverUrl + "/posts/post",{
        creatorId: localStorage.getItem("uid"),
        title: title,
        content: content,
        location: location,
        isVirtual: isVirtual,
        dateTime: date,
        tags: tags,
        lat: lat,
        lng: lng
    }).then(function(response) {
        // console.log(response);
        let getData = response.data;
        console.log(getData);
        console.log(location);
        enqueueSnackbar("Create Post Sucess!")
        navigate("/post/" + response.data.id)
    }).catch(function(error){
      enqueueSnackbar("Create Post Error")
      console.log(error.code);
      console.log(error.message);
      alert("failed")
    })

    console.log(MAILGUN_API, DOMAIN);
    const mg = require("mailgun-js")({apiKey: MAILGUN_API, domain: DOMAIN});
    mg.messages().send(data, function (error, body) {
      if (error) {
          console.log(error);
      }
    console.log(body);
    });
    
  }


  return (
    <Container maxWidth="md" style={{ height: "100vh" }}>
      <Box style={{ marginTop: "24px", height: "80%" }}>
        <Box style={{ width: "100%", marginTop: "12px" }}>
          <TextField fullWidth label="Title" onChange={(e)=>setTitle(e.target.value)}></TextField>
        </Box>

        <Grid style={{ height: "10%", marginTop:"16px"}}>
          {/* <GoogleMapsAutoComplete
              apiKey={"AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc"}
              style={{ width: "90%" }}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
              options={{
                types: ["establishment", "geocode"],
                componentRestrictions: { country: "us" },
              }}
              defaultValue="syracuse"
            /> */}
          <TextField
            fullWidth
            color="secondary"
            variant="outlined"
            inputRef={materialRef}
            
          />
        </Grid>
        <div style={{ height: "24px" }}></div>
        <Grid style={{ width: "100%", marginTop: "16px" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={date}
                  onChange={(newValue)=> {
                    setDate(newValue)
                    console.log(newValue);
                  }}
                  
                
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid>
              <FormControlLabel
                control={<Checkbox defaultChecked={false} onChange={()=>setIsVirtual(!isVirtual)} />}
                label="is a Virtual Activity?"
              />
            </Grid>
          </Stack>
        </Grid>
        <Grid
          container
          direction="column"
          style={{
            fontSize: "18px",
            marginTop: "20px",
            // height: "60%",
            padding: "4px",
          }}
          // sx={{ border: 1, borderColor: "grey.500", borderRadius: "8px" }}
        >
          <Grid container direction="row" style={{ height: "90%" }}>
            {/* <Grid item sx={6} xm={6} md={6} lg={6} xl={6}>
              <Map />
            </Grid> */}
            <Grid item sx={6} xm={6} md={6} lg={6} xl={6}>
              <Grid>
                Description
                {/* <Divider /> */}
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  onChange={(e)=>setContent(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box
          style={{ marginTop: "24px", padding: "12px" }}
          sx={{ border: 1, borderColor: "grey.500", borderRadius: "8px" }}
        >
          <AddTagComponent
            tags={tags}
            setTags={setTags}
            isEditing={true}
          ></AddTagComponent>
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "20px", marginBottom:"20px"}}
        >
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleCreatePostAction}>
            Send
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default CreatePost;
