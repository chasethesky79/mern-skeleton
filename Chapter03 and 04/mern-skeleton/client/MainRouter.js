import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import SignUp from './user/SignUp'
import Users from './user/Users'

const MainRouter = () => {
    return (<div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={Users}/>
        <Route path='/signup' component={SignUp}/>
      </Switch>
    </div>)
}

export default MainRouter
