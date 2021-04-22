/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import {
  useStylesMessage,
  useStylesButton,
  useStylesText,
}
  from './StyleFactory';

export default function MessageBoard() {
  const messageClasses = useStylesMessage();
  const buttonClasses = useStylesButton();
  const textClasses = useStylesText();

  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('/getUserInfo')
      .then((info) => info.json())
      .then((info) => {
        setUser(info);
      });
  }, []);
  // send input

  // need user messages populated and taken from dB, needs name, photo, text
  // on click fetch, but as a post request /messageboard
  // send text field's value, user.photo, user.name
  //
  return (
    <div>

      <List className={messageClasses.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.photo} />
          </ListItemAvatar>
          <ListItemText
            primary="Dummy Data for later entry"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <form id="message" className={textClasses.root} noValidate autoComplete="off">
        <TextField
          id="mBoardImput"
          label="We'd love to hear from you?"
          variant="outlined"
        />

        <div className={buttonClasses.root}>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={() => {
              const val = document.getElementById('mBoardImput').value;
              console.log(val);
              fetch('/Messages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: [
                  val,
                  user.photo, user.name],
              });
            }}
            />
          </Fab>
        </div>
      </form>
      <div>
        <Switch>
          <Route exact path="/submitMessage" />
        </Switch>
      </div>

    </div>

  );
}
