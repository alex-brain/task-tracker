import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    padding: '20px 20px 0',
    height: '250px',
    width: '500px',
    margin: 'auto'
  },
  password: {
    marginTop: '20px'
  },
  btn: {
    padding: '20px'
  }
});

const LoginForm = (props) => {
  const { classes } = props;
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const onChange = field => e => {
    const { value } = e.target;
    const data = {
      ...loginForm,
      [field]: value
    };
    setLoginForm(data);
  };

  const onClickLogin = () => {
    props.onClickLogin(loginForm);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom component="h5">
        Авторизация
      </Typography>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          value={loginForm.username}
          label="Логин"
          type="text"
          onChange={onChange('username')}
        />
        <TextField
          className={classes.password}
          value={loginForm.password}
          fullWidth
          label="Пароль"
          type="password"
          onChange={onChange('password')}
        />
      </Grid>
      <Grid
        className={classes.btn}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={onClickLogin}
        >
          Войти
        </Button>
      </Grid>
    </Paper>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickLogin: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  onClickLogin: () => {}
};

export default withStyles(styles)(LoginForm);
