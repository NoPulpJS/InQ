import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import {
  HomeOutlined, Publish, FormatListBulleted,
} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Fab from '@material-ui/core/Fab';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SubmitQuestion from './SubmitQuestion';
import MessageBoard from './MessageBoard';
import CatagoryCheckboxList from './CategoryList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  submitQuestionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100vh',

  },
  container: {
    paddingTop: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

}));

export default function PermanentDrawerLeft() {
  const [user, setUser] = useState({});
  const classes = useStyles();

  useEffect(() => {
    fetch('/getUserInfo')
      .then((info) => info.json())
      .then((info) => {
        setUser(info);
      });
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {`Welcome back ${user.name}`}
              <Avatar alt={user.name} src={user.photo} className={classes.large} />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem button key="Home">
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {/* <ListItem button key="MessageBoard" component={Link} to="/MessageBoard">
              <ListItemIcon>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary="Message Board" />
            </ListItem> */}

            {/* <ListItem button key="Favorites">
              <ListItemIcon>
                <Badge color="secondary" badgeContent={0} showZero>
                  <MailIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem> */}

            <ListItem button key="SubmitQuestion" component={Link} to="/submit">
              <ListItemIcon>
                <Publish />
              </ListItemIcon>
              <ListItemText primary="Submit Question" />
            </ListItem>

            <ListItem button key="SearchQuestions" component={Link} to="/checklist">
              <ListItemIcon>
                <Fab size="large" color="primary" aria-label="search">
                  <SearchRoundedIcon />
                </Fab>
              </ListItemIcon>
              <ListItemText primary="Search Questions" />
            </ListItem>

          </List>
        </Drawer>
        <Container className={classes.container}>
          <Switch>
            <Route exact path="/submit">
              <SubmitQuestion user={user} />
            </Route>

            {/* <Route exact path="/MessageBoard">
              <MessageBoard />
            </Route> */}

            <Route exact path="/checklist">
              <CatagoryCheckboxList />
            </Route>
          </Switch>
        </Container>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph />
          <Typography paragraph />
        </main>
      </div>
    </Router>
  );
}
