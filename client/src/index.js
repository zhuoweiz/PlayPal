import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './pages/Profile';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/AppBar';
import Register from './pages/Register';
import Signin from './pages/Signin'
import Home from './pages/Home'
import ViewPost from './pages/ViewPost';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import CreatePost from './pages/CreatePost'
import NotificationComponent from './components/profile/NotificationComponent';
import ProfileComponent from './components/profile/ProfileComponent';
import SettingComponent from './components/profile/SettingComponent';


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi2tp4Ed-rLk1T-iz527b0CXtzoZGvZ7U",
  authDomain: "playpal-85bf8.firebaseapp.com",
  projectId: "playpal-85bf8",
  storageBucket: "playpal-85bf8.appspot.com",
  messagingSenderId: "1047945280349",
  appId: "1:1047945280349:web:0b90f227cc8190d70086b4",
  measurementId: "G-9EKD8D4D1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const theme = createTheme({
  app: {
    color: 'white',
    fontFamily: 'Arial'
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> 
      <BrowserRouter>
        <NavBar />
        <Routes>
          
          <Route path="/signin" element={
            <Signin />
          }/>

          <Route path="/register" element={
            <Register />
          }/>
          <Route path="/profile" element={
            <Profile />
          }>
            <Route index element={
              <ProfileComponent></ProfileComponent>
            } />
            <Route path="setting" element={
              <SettingComponent></SettingComponent>
            } />
            <Route path="notification" element={
              <NotificationComponent></NotificationComponent>
            }>
            </Route>
          </Route>
          <Route path="/home" element={
            <Home />
          }/>

          <Route path="/post" element={
            <ViewPost />
          }/>
          <Route path="/createpost" element={
            <CreatePost />
          }/>
          <Route path="/" element={
            <Home />
          }/>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
