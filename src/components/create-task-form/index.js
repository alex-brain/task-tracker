import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popup from '../../components/popup';

const styles = () => ({
  textFieldContainer: {
    marginTop: '20px'
  },
  buttons: {
    marginTop: '30px'
  },
  addTaskBtn: {
    marginLeft: '20px'
  }
});

class CreateTaskForm extends Component {
  render() {
    const { classes, username, email, text, onChange, onClickReset, onClickCreateTask, onClickCloseErrMsg,
      getErrorMessages, onClickCloseSuccessMsg, isOpenErrMsg, isOpenSuccessMsg
    } = this.props;

    return (
      <>
        <Grid className={classes.textFieldContainer}>
          <TextField
            value={username}
            label="Имя пользователя"
            fullWidth
            onChange={onChange('username')}
          />
        </Grid>
        <Grid className={classes.textFieldContainer}>
          <TextField
            value={email}
            label="email"
            fullWidth
            onChange={onChange('email')}
          />
        </Grid>
        <Grid className={classes.textFieldContainer}>
          <TextField
            value={text}
            label="Текст"
            fullWidth
            multiline
            rowsMax="5"
            onChange={onChange('text')}
          />
        </Grid>
        <Grid className={classes.buttons} container justify={"flex-end"}>
          <Button
            color="secondary"
            variant="contained"
            onClick={onClickReset}
          >
            Очистить
          </Button>
          <Button
            className={classes.addTaskBtn}
            color="primary"
            variant="contained"
            onClick={onClickCreateTask}
          >
            Создать задачу
          </Button>
        </Grid>
        <Popup
          isOpen={isOpenErrMsg}
          onClickClose={onClickCloseErrMsg}
          title="Ошибка запроса"
          text={getErrorMessages()}
        />
        <Popup
          isOpen={isOpenSuccessMsg}
          onClickClose={onClickCloseSuccessMsg}
          title="Задача добавлена"
          text="Готово"
        />
      </>
    );
 }
}

CreateTaskForm.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  text: PropTypes.string,
  isOpenErrMsg: PropTypes.bool,
  isOpenSuccessMsg: PropTypes.bool,
  onChange: PropTypes.func,
  onClickReset: PropTypes.func,
  onClickCreateTask: PropTypes.func,
  onClickCloseErrMsg: PropTypes.func,
  getErrorMessages: PropTypes.func,
  onClickCloseSuccessMsg: PropTypes.func,
};

CreateTaskForm.defaultProps = {
  username: '',
  email: '',
  text: '',
  isOpenErrMsg: false,
  isOpenSuccessMsg: false,
  onChange: () => {},
  onClickReset: () => {},
  onClickCreateTask: () => {},
  onClickCloseErrMsg: () => {},
  getErrorMessages: () => {},
  onClickCloseSuccessMsg: () => {},
};

export default withStyles(styles)(CreateTaskForm);
