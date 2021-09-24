import { Typography, Card, CardContent, CardActions, Button, TextField, Icon } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from "react";
import auth from '../auth/auth-helper';
import {create, read} from "./api-user";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
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

export default function EditProfile({ match }){
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: ''
    })
    const { params: { userId }} = match;

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
        // const { error } = await create(user);
        // setValues(error ? { ...values, error} : {...values, open: true });
    };

    useEffect(async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();
        const data = await read({ userId }, { t: jwt.token }, signal);
        const { error } = data;
        setValues(error ? {...values, error } : {...values, ...data });
        return function cleanup(){
            abortController.abort()
        }
    }, [userId]);

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Edit Profile
                </Typography>
                <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
                <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                <br/> {
                values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                </Typography>)
            }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
    )
}