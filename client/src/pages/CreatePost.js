import { Container, Grid, Box, Divider, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import MUIRichTextEditor from "mui-rte";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import * as React from "react";
import Map from "../components/Map";
import { default as GoogleMapsAutoComplete, usePlacesWidget } from "react-google-autocomplete";
import tagList from "../constants/tagList";
import Autocomplete from '@mui/material/Autocomplete';

const _ = require("lodash");


const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc";

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

function CreatePost() {
  const [tags, setTags] = React.useState([]);
  const [tag, setTag] = React.useState("");
  // const [options, setOptions] = React.useState(tagList);

  const { ref: materialRef } = usePlacesWidget({
    apiKey: "AIzaSyB4K5drECUTwnS6LN4UFjutNxnoYtChJYc",
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ["establishment", "geocode"],
      componentRestrictions: { country: "us" },
    },
    defaultValue: "syracuse"
  });

  return (
    <Container maxWidth="md" style={{ height: "100vh" }}>
      <Box style={{ marginTop: "36px", height: "80%" }}>
        <Box style={{ width: "100%", marginTop: "12px" }}>
          <TextField fullWidth label="Title"></TextField>
        </Box>

        <Grid style={{ height: "10%" }}>
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
        <Grid
          container
          direction="column"
          style={{
            fontSize: "18px",
            marginTop: "24px",
            height: "60%",
            padding: "4px",
          }}
          sx={{ border: 2, borderColor: "grey.500", borderRadius: "12px" }}
        >
          
          <Grid container direction="row" style={{ height: "90%" }}>
            {/* <Grid item sx={6} xm={6} md={6} lg={6} xl={6}>
              <Map />
            </Grid> */}
            <Grid item sx={6} xm={6} md={6} lg={6} xl={6}>
              <Grid>
                Description
                {/* <Divider /> */}
                <MUIRichTextEditor
                  maxLength={400}
                  controls={[
                    "title",
                    "bold",
                    "strikethrough",
                    "undo",
                    "redo",
                    "link",
                    "numberList",
                    "bulletList",
                    "quote",
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box
          style={{ marginTop: "24px", padding: "12px" }}
          sx={{ border: 2, borderColor: "grey.500", borderRadius: "12px" }}
        >
          {/* Add tags for you posts! */}
          <Box>
            {/* <TextField
              fullWidth
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
            /> */}
            <Autocomplete
              disablePortal
              id="add-tag"
              options={tagList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Activity" />}
              value ={tag}
              onChange={(event,newValue)=>{
                setTag(newValue);
                if(newValue) {
                  setTag(newValue.label);
                }
                // console.log(tag);
              }}
            />
          </Box>
          <Box style={{ marginTop: "12px" }}>
            <Button
              onClick={() => {
                // add tag
                const currTags = _.cloneDeep(tags);
                currTags.push(tag);
                setTags(currTags);
                // let newOptions = _.remove(options,function(n){
                //   return n === tag;
                // })
                // setOptions(newOptions);
              }}
            >
              Add
            </Button>
            {tags.map((element, index) => {
              return (
                <Chip
                  label={element}
                  variant="outlined"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
              );
            })}
          </Box>
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "24px" }}
        >
          <Button variant="contained" endIcon={<SendIcon />} href="/post">
            Send
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default CreatePost;
