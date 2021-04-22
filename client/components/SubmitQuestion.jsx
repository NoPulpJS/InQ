import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import { useStylesCatagories } from './StyleFactory';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  textFieldCompany: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  textFieldQuestion: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100ch',
  },
  buttonStyle: {

  },

}));

export default function SubmitQuestions(props) {
  const catagoryClasses = useStylesCatagories();

  const [categories, setCategories] = useState([]);
  const [company, setCompany] = useState('');
  const [question, setQuestion] = useState('');
  const [checkedCategory, setCheckedCategory] = useState([]);

  useEffect(() => {
    fetch('/getCategories')
      .then((categories) => categories.json())
      .then((categoriesObj) => {
        console.log('Categories: ', categoriesObj);
        setCategories(categoriesObj);
      });
  }, []);

  useEffect(() => {
    fetch('/getCompanies')
      .then((companies) => companies.json())
      .then((companies) => {
        setCompanies(companies);
      });
  }, []);

  const handleToggleCategory = (value) => () => {
    const currentIndex = checkedCategory.indexOf(value);
    const newChecked = [...checkedCategory];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedCategory(newChecked);
  };
  // array passed into map should be changed
  // ListItemText primary prop needs to change

  const categoryRendered = categories.map((value, i) => {
    const labelId = `checkbox-list-label-${value.category}`;

    return (
      <ListItem
        key={`${value.category}${i}`}
        role={undefined}
        dense
        button
        onClick={handleToggleCategory(value._id)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checkedCategory.indexOf(value._id) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={value.category} />
      </ListItem>
    );
  });

  const classes = useStyles();

  const submitQuestion = () => {
    if (!question.length || !checkedCategory.length || !company.length) return;

    const info = {
      question,
      categories: checkedCategory,
      company,
      _id: props.user._id,
    };
    fetch('/questions/submit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      })
      .then((data) => data.json())
      .then(() => {
        setCheckedCategory([]);
        setQuestion('');
        setCompany('');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Container>
        <form className={classes.root}>
          <div>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <BusinessIcon />
              </Grid>
              <Grid item>
                <TextField
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                  label="Enter Company"
                  id="companyName"
                  className={classes.textFieldCompany}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <HelpIcon />
                </Grid>
                <Grid item>
                  <TextField
                    label="Enter Question"
                    id="companyName"
                    className={classes.textFieldQuestion}
                    multiline
                    fullWidth
                    variant="filled"
                    rows="14"
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                  />
                  {/* <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <HelpIcon />
          </Grid>
          <Grid item>
            <TextField
              id="submittedQuestion"
              label="Submit Question"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              multiline
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            /> */}
                  <Button variant="contained" color="secondary" onClick={submitQuestion}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <List className={catagoryClasses.root}>{categoryRendered}</List>
        </form>
      </Container>
    </>
  );
}
