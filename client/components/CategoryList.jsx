import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useStylesCatagories, useStylesGetQuestions } from './StyleFactory';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';



const chalk = require('chalk');

export default function CatagoryCheckboxList() {
  const catagoryClasses = useStylesCatagories();
  const questionsClasses = useStylesGetQuestions();

  const [checked, setChecked] = React.useState([0]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/getCategories')
      .then((categoriesQuery) => categoriesQuery.json())
      // Returns a promise which resolves with a JavaScript object
      .then((categoriesObj) => {
        // console.log(chalk.red('Categories OBJECT POST JSON ')
        console.log(categoriesObj);
        // categoriesObj, chalk.red('END OF LOG'));
        setCategories(categoriesObj);
      });
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
 //capture where item was click
 //envoke method to select all from dB

  const categoryRendered = categories.map((value, i) => {
    const labelId = `checkbox-list-label-${value.category}`;

    return (

      <ListItem
        key={`${value.category}${i}`}
        role={undefined}
        dense
        button
        onClick={handleToggle(value)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={value.category} />
      </ListItem>

    );
  });

  return (    
    <div>
      <div>
        <List className={catagoryClasses.root}>
          {categoryRendered}        
        </List>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={questionsClasses.button}
          endIcon={<Icon>send</Icon>}
        >
          Get Questions
        </Button>
      </div>
    </div>
  )};
