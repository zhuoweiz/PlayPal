import { useEffect, useState } from 'react';
import React from "react"
import { autocompleteClasses, Paper, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../Home.css';
import { SpeedDial,SpeedDialAction, SpeedDialIcon} from '@mui/material';

const useStyles = makeStyles((theme) => ({
    recommendation:{
        width: 960,
        height: 260,
       
    },
    posts:{

    }
    
  }));
  


const Home = ()=>{
    const classes = useStyles();
    const [title, setTitle] = useState("");
   return(
    <div className= "home-box">
        <div className= "home-recommendation">
            <Paper className={classes.recommendation} square elevation="3" >
                Daily Recommendation
                <ol>
                    <li>Basketball at Barnes Center</li>
                    <li>E-sports Match</li>
                    <li>Looking for Japanese teacher</li>
                    <li>Boardgame</li>
                    <li>Basketball at Barnes Center</li>
                    <li>E-sports Match</li>
                    <li>Looking for Japanese teacher</li>
                    <li>Boardgame</li>
                </ol>
            </Paper>
        </div>
        <div className="home-popular-map">
            <div className = "home-popular-map-item">
                Recent Popular
                <ol>
                    <li>Basketball at Barnes Center</li>
                    <li>E-sports Match</li>
                    <li>Looking for Japanese teacher</li>
                    <li>Boardgame</li>
                    <li>Basketball at Barnes Center</li>
                    <li>E-sports Match</li>
                    <li>Looking for Japanese teacher</li>
                    <li>Boardgame</li>
                </ol>
            </div>
            <div className = "home-popular-map-item">
                <img src="./map.jpg"></img>
            </div>
        </div>
        <div className="home-tag-posts">
            <div className="home-tag-posts-item1">
                Tag List
            </div>
            <div className="home-tag-posts-item2">
                <Card className={classes.posts}>
                    Posts(created dynamically)
                </Card>
            </div>
        </div>
        
    </div>
   )
}

export default Home