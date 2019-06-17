import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter, NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { logout } from '../actions/auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    marginLeft: '24px',
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  tableContainer: {
    height: 320,
  },
  mainLink: {
    color: '#FFFFFF'
  }
});

class Theme extends React.Component {
  state = {
    open: false,
  };

  onClickLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { classes, children, accessToken } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  <NavLink to={'/'} className={classes.mainLink}>Список задач</NavLink>
                </Typography>
              </Grid>
              <Grid item>
                {accessToken ? (
                  <NavLink to={'/login'} className={classes.mainLink} onClick={this.onClickLogout}>Выйти</NavLink>
                ) : (
                  <NavLink to={'/login'} className={classes.mainLink}>Войти</NavLink>
                )}

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* Header */}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    );
  }
}

Theme.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.access_token
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Theme)));
