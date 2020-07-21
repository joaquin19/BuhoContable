import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getHistory } from "./store";
import * as SecuriyHelper from './helper/security';
import { ScreensSecurity } from './types/enums/generic-form'
import * as Screen from './screens'

import { connect } from 'react-redux';

const history = getHistory();

const PrivateRoute = ({ component: Component, permission: Permission, permissions: Permissions, ...rest }) => (
  <Route {...rest} render={(props) => (
    SecuriyHelper.validateScreen(Permissions, Permission)
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/accessdenied',
        state: { from: props.location }
      }} />
  )
  } />)

interface Prop {
  auth: any;
}

class routes extends Component<Prop> {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>          
          <Route path="/login" component={Screen.Login} exact />
          <Route path="/accessdenied" component={Screen.AccessDenied} exact />
          <Route path="/" component={Screen.Reddit} />
          <Route component={Screen.NoMatch} />
        </Switch>
      </ConnectedRouter >
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, null)(routes)