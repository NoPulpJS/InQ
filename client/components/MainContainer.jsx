import React from 'react';
import {
  Container, createStyles, makeStyles, Backdrop, Theme, Typography, Divider,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import PersistentDrawer from './PersistentDrawer';
import SubmitQuestion from './SubmitQuestion';

const useStyles = makeStyles((theme) => createStyles({
  submitQuestionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

export default function MainContainer() {
  const classes = useStyles();
  return (
    <>
      <PersistentDrawer />
    </>
  );
}

{ /* <Container className={classes.submitQuestionWrapper}>
<SubmitQuestion />
</Container> */ }
