
/*import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase_setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Register from "../Register";
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import logo from '../../logo.jpg';
import { Typography } from "@mui/material";

import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Sign In
    </Button>
  );
}



function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

export default function SlotsSignIn() {
  const BRANDING = {
    logo: (
      <img
        src={logo}
        alt="MUI logo"
        style={{ height: 24 }}
      />
    ),
    title:'DRANGTSANG'
    
  };
  const providers = [
    { id: 'credentials', name: 'Email and Password' },
    { id: 'google', name: 'Google' },
    { id: 'facebook', name: 'Facebook' },
  ];
  const theme = useTheme();
  const signIn = async (provider, formData, setError) => {
    try {
      if (provider.id === 'credentials') {
        await logInWithEmailAndPassword(formData.get('email'), formData.get('password'));
      } else if (provider.id === 'google') {
        await signInWithGoogle();
      } else {
        console.log("signing with facebook");
      }
      
      setError(null);
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please check your email and password.';
      }
      setError(errorMessage);
    }
  };
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <AppProvider theme={theme} >
      <SignInPage
        signIn={signIn}
        slots={{
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        providers={providers} 
      />
    </AppProvider>
  );
}


// preview-start

/*const BRANDING = {
  logo: (
    <img
      src={logo}
      alt="MUI logo"
      style={{ height: 24 }}
    />
  ),
  title:'DRANGTSANG'
  
};


function Login() {
  /*const CustomTitle = () => {
    return(<Typography variant="h4" component="h1">
      Custom Sign In Title
    </Typography>);
};
  const CustomSubTitle = () => {
    return(<Typography >
      
    </Typography>);
  };*/
/*
  const providers = [
    { id: 'credentials', name: 'Email and Password' },
    { id: 'google', name: 'Google' },
    { id: 'facebook', name: 'Facebook' },
  ];
  // preview-end
  const theme = useTheme();
  const signIn = async (provider, formData) => {
    try {
      if (provider.id === 'credentials') {
        await logInWithEmailAndPassword(formData.get('email'), formData.get('password'));
      } else if (provider.id === 'google') {
        await signInWithGoogle();
      } else {
        console.log("signing with facebook");
      }
      navigate('/');
      return {
        type: 'CredentialsSignin',
        error: null,
      };
    } catch (error) {
      return {
        type: 'CredentialsSignin',
        error: 'Invalid credentials.',
      };
    }
  };
  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <AppProvider branding={BRANDING} theme={theme} >
      <Register/>
      <SignInPage signIn={signIn} providers={providers} slots={{
    //title:CustomTitle,
    //subtitle:CustomSubTitle,
  }}/>
    </AppProvider>
    
  );
}
export default Login;
*/
