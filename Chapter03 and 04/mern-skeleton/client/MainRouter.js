import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import SignUp from './user/SignUp'
import SignIn from './auth/SignIn'
import Users from './user/Users'
import Profile from './user/Profile'

const MainRouter = () => {
    return (<div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={Users}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/user/:userId' component={Profile}/>
      </Switch>
    </div>)
}

export default MainRouter
