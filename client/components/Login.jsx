import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, makeStyles } from '@material-ui/core/';
// import googleBtn from './assets/google.png';

function Login() {
  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      height: '100vh',
      width: '100vw',
    },
  }));
  const oAuthURL = '/login/OAuth/';
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography align="center" variant="h1" gutterBottom>
        InQ
      </Typography>
      <a align="center" href={`${oAuthURL}`}>
        <img alt="Google-Signin" src="/assets/google.png" />
      </a>
    </Container>
  );
}
export default Login;
