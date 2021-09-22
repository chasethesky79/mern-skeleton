import { ListItem, ListItemText, Divider, List, Paper, ListItemAvatar, Avatar, Typography, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import Person from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import auth from '../auth/auth-helper';
import { read } from "./api-user";
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    }
  }))

export default function Profile({ match }){
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);
    const { params: { userId }} = match;

    useEffect(async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();
        const data = await read({ userId }, { t: jwt.token }, signal);
        if (data?.error) {
           setRedirectToSignIn(true);
        } else {
            setUser(data);
        }
        return () => abortController.abort();  
    }, [userId]);

    if (redirectToSignIn) {
        return <Redirect to='/signin'/>
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant='h6' className={classes.title}>Profile</Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                          <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                        { auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id && (
                            <ListItemSecondaryAction>
                                <Link to={`/user/edit/${user._id}`}>
                                    <IconButton aria-label='Edit' color='primary'>
                                        <Edit/>
                                    </IconButton>
                                </Link>
                            </ListItemSecondaryAction>
                        )}                    
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={`Joined: ${new Date(user.created).toDateString()}`}/>
                </ListItem>
            </List>
        </Paper>
    )
}