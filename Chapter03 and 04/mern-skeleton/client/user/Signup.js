import React from 'react'
import { Typography, Card, CardContent, CardActions, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from '@material-ui/core';
import { useState } from 'react';
import { create } from './api-user';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

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
  }))

export default function SignUp() {
    const classes = useStyles();
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      open: false,
      error: ''
    })

    const handleChange = name => event => {
        const { target: { value }} = event;
        setValues({...values, [name]: value });
    }

    const handleSubmit = async () => {
        const { name, email, password } = values;
        const user = {
            name,
            email,
            password
        };
        const { error } = await create(user);
        setValues(error ? { ...values, error} : {...values, open: true });
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id='name' label='Name' className={classes.textField} value={values.name} onChange={handleChange('name')} margin='normal'/><br/>
                    <TextField id='email' type='email' label='Email' className={classes.textField} value={values.email} onChange={handleChange('email')} margin='normal'/><br/>
                    <TextField id='password' type='password' label='Password' className={classes.textField} value={values.password} onChange={handleChange('password')} margin='normal'/><br/>
                    {values.error && <Typography component='p' color='error'><Icon color='error' className={classes.error}>error</Icon>{values.error}</Typography>}
                </CardContent>
                <CardActions>
                    <Button color='primary' variant='contained' onClick={handleSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>New account successfully created</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to='/signin'>
                        <Button color='primary' autoFocus='autoFocus' variant='contained'>
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}