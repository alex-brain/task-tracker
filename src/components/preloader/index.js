import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  progress: {
    width: '100%',
    minHeight: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress__item: {
    margin: theme.spacing.unit * 2,
  },
});

class Preloader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.progress}>
        <CircularProgress className={classes.progress__item} />
      </Grid>
    );
 }
}

export default withStyles(styles)(Preloader);
