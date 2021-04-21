import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from './StyleFactory';

export default function MessageBoard() {
  const messageClasses = useStylesMessage();
  const buttonClasses = useStylesButton();
  const textClasses = useStylesText();

  return (
    <div>

      <List className={messageClasses.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="PROPS: GOOGLE NAME" src="PROPS: GOOGLE IMAGE" />
          </ListItemAvatar>
          <ListItemText
            primary="PROPS: USER INPUT TEXT"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <form className={textClasses.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Got Anything to Say?" variant="outlined" />
        <div className={buttonClasses.root}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </form>

    </div>

  );
}
