import { Container, Grid, Box, Divider, Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import MUIRichTextEditor from "mui-rte";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import * as React from 'react';

const _ = require('lodash');

const handleClick = () => {
  console.info("You clicked the Chip.");
};

const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

function CreatePost() {

  const [tags, setTags] = React.useState(["ball","game"]);
  const [tag, setTag] = React.useState("");

  return (
    // <Container maxWidth="md" style={{ height: "100vh" }}>
    //   <Grid direction="column" container style={{ marginTop: "12px", height:"80%"}} /*sx={{border:2, borderColor:'grey.500', borderRadius:'1%'}}*/>
    //     <Grid item style={{width:"100%", marginTop:"12px"}}>
    //       <TextField fullWidth label="Title"></TextField>
    //     </Grid>
    //     <Grid item>Description</Grid>
    //     <Grid item>
    //         <MUIRichTextEditor controls={["title","bold","strikethrough", "undo", "redo", "link", "numberList", "bulletList", "quote", ]} />
    //     </Grid>

    //     <Grid item></Grid>
    //   </Grid>
    // </Container>
    <Container maxWidth="md" style={{ height: "100vh" }}>
      <Box style={{ marginTop: "36px", height: "80%" }}>
        <Box style={{ width: "100%", marginTop: "12px" }}>
          <TextField fullWidth label="Title"></TextField>
        </Box>
        <Box
          style={{
            fontSize: "18px",
            marginTop: "24px",
            height: "60%",
            padding: "12px",
          }}
          sx={{ border: 2, borderColor: "grey.500", borderRadius: "12px" }}
        >
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
        </Box>

        <Box
          style={{ marginTop: "24px", padding: "12px" }}
          sx={{ border: 2, borderColor: "grey.500", borderRadius: "12px" }}
        >
          Add tags for you posts!
          <Box>
            <TextField
              fullWidth
              id="standard-basic"
              label="Standard"
              variant="standard"
              value={tag}
              onChange={(event) => {
                setTag(event.target.value);
              }}
            />
          </Box>
          <Box style={{ marginTop: "12px" }}>
            <Button onClick={() => {
              // add tag
              const currTags = _.cloneDeep(tags);
              currTags.push(tag);
              setTags(currTags);
            }}>Add</Button>
            {
              tags.map((element, index) => {
                return (
                  <Chip
                  label={element}
                  variant="outlined"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                )
              })
            }
          
          </Box>
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "24px" }}
          
        >
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default CreatePost;
