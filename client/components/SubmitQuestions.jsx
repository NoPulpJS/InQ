import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function SubmitQuestions() {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [questions, setQuestion] = useState('');

  useEffect(() => {
    fetch('/getCategories')
      .then((categories) => categories.json())
      .then((categories) => {
        console.log('Categories: ', categories);
        setCategories(categories);
      });
  }, []);

  useEffect(() => {
    fetch('/getCompanies')
      .then((companies) => companies.json())
      .then((companies) => {
        setCompanies(companies);
      });
  }, []);
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <BusinessIcon />
          </Grid>
          <Grid item>
            <TextField
              label="Enter Company"
              id="companyName"
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={1} alignItems="flex-end">
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
            />
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
