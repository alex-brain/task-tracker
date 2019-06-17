import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from '../pages/home';
import CreateTask from '../pages/create-task';
import Login from '../pages/login';
import { loginSuccess } from '../actions/auth';

const theme = createMuiTheme({
    typography: {
    useNextVariants: true,
  },
});

class Layout extends Component {
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData !== null && userData.access_token) {
      this.props.loginSuccess(userData);
    }
    this.setState({ isCheckedToken: true });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-task" component={CreateTask} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (accessToken) => dispatch(loginSuccess(accessToken)),
});

export default connect(null, mapDispatchToProps)(Layout);
