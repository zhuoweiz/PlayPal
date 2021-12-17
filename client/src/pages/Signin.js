import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

import { serverUrl } from '../constants';

const theme = createTheme();
const axios = require('axios');

export default function SignIn() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const forgotEmailHandler = () => {
    // 1. do config
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for
      // this URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:3000/signin',
      // This must be true for email link sign-in.
      handleCodeInApp: false,
      // FDL custom domain.
      // dynamicLinkDomain: 'http://localhost:3000/signin',
    };

    
    sendPasswordResetEmail(auth,
      "zhuoweiz10@gmail.com", actionCodeSettings)
      .then(function() {
        // Password reset email sent.
        enqueueSnackbar("Success")
      })
      .catch(function(error) {
        // Error occurred. Inspect error.code.
        enqueueSnackbar("Fail")
        console.log(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      axios.get(serverUrl+"/users/uid", {
        params: {
          fid: user.uid
        },
      })
      .then(function (response) {
        localStorage.setItem("uid", response.data)
        alert("Signin successful!");
        navigate("/");
      })
      .catch(function (error) {
        alert("Signin error, pls try again or contact us!");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Sign in failed...");
      console.log("Signin error: ", errorMessage);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={forgotEmailHandler} href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}