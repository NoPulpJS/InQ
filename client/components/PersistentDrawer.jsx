import React from 'react';
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
import {
  HomeOutlined, Publish, FormatListBulleted,
} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Fab from '@material-ui/core/Fab';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

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
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Welcome Back
            <Avatar alt="Dw" src="https://i.ibb.co/2KXmCTw/Screenshot-from-2021-04-14-13-27-11.png" className={classes.large} />
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

          <ListItem button key="SubmitQuestion">
            <ListItemIcon>
              <Publish />
            </ListItemIcon>
            <ListItemText primary="Submit Qestion" />
          </ListItem>

          <ListItem button key="MessageBoard">
            <ListItemIcon>
              <FormatListBulleted />
            </ListItemIcon>
            <ListItemText primary="Message Board" />
          </ListItem>

          <ListItem button key="RequestedMaterial">
            <ListItemIcon>
              <Badge color="secondary" badgeContent={0} showZero>
                <MailIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="RequestedMaterial" />
          </ListItem>

          <ListItem button key="SearchQuestions">
            <ListItemIcon>
              <Fab size="large" color="primary" aria-label="search">
                <SearchRoundedIcon />
              </Fab>
            </ListItemIcon>
            <ListItemText primary="Search Questions" />
          </ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph />
        <Typography paragraph />
      </main>
    </div>
  );
}
