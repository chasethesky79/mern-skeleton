import React from 'react'
import { Typography, Card, CardContent, CardActions, Button, Icon, TextField } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import { signin } from './api-auth';
import auth from './auth-helper';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
       marginTop: theme.spacing(2),
       color: theme.palette.openTitle 
    },
    textField: {
       marginLeft: theme.spacing(1),
       marginRight: theme.spacing(1),
       width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
  }));

  export default function SignIn(props){
    const classes = useStyles();
    const { location: { state }} = props;
    const from = state?.from || { pathname: '/' };
    const [values, setValues] = useState({
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
    });
    const { redirectToReferrer } = values;
    console.log(`STATE AND FROM ${JSON.stringify(state)}, ${JSON.stringify(from)}, ${redirectToReferrer}`);
    const handleChange = name => event => {
        const { target: { value }} = event;
        setValues({...values, [name]: value });
    }
    const handleSubmit = async () => {
        const { email, password } = values;
        const user = {
            email,
            password
        };
        const data = await signin(user);
        const { error } = data;
        if (error) {
            setValues({...values, error });
        } else {
            auth.authenticate(data, () => setValues({...values, error: '', redirectToReferrer: true }));
        }
    }
    if (redirectToReferrer) {
        return <Redirect to={from}/>
    }
    console.log(`AFTER REDIRECTOREFERRER ${redirectToReferrer}`);
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign In
                    </Typography>
                    <TextField id='email' type='email' label='Email' className={classes.textField} value={values.email} onChange={handleChange('email')} margin='normal'/><br/>
                    <TextField id='password' type='password' label='Password' className={classes.textField} value={values.password} onChange={handleChange('password')} margin='normal'/><br/>
                    {values.error && <Typography component='p' color='error'><Icon color='error' className={classes.error}>error</Icon>{values.error}</Typography>}
                </CardContent>
                <CardActions>
                    <Button color='primary' variant='contained' onClick={handleSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
  }

