import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Theme from '../../containers/theme';
import { createTask } from '../../actions/create-task';
import CreateTaskForm from '../../components/create-task-form';

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      text: '',
      isError: false,
      isCreated: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ isError: true });
    }
    if (this.props.createdTask && this.props.createdTask !== prevProps.createdTask) {
      this.setState({ isCreated: true });
    }
  }

  onChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  onClickReset = () => {
    this.setState({
      username: '',
      email: '',
      text: '',
      isError: false
    })
  };

  onClickCreateTask = () => {
    const { username, email, text } = this.state;
    this.props.createTask({ username, email, text });
  };

  onClickCloseErrMsg = () => {
    this.setState({ isError: false });
  };

  onClickCloseSuccessMsg = () => {
    this.setState({
      isCreated: false,
      username: '',
      email: '',
      text: '',
    });
  };

  getErrorMessages = () => {
    const errorMessages = [];
    for(let key in this.props.error) {
      errorMessages.push({
        key,
        value: this.props.error[key]
      });
    }
    return (
      <>
        {errorMessages.map((item, index) => (
          <Typography gutterBottom key={index}>
            {item.key}: {item.value}
          </Typography>
        ))}
      </>
    );
  };

  render() {
    const { createdTask, error } = this.props;
    const { username, email, text, isError, isCreated } = this.state;
    const isOpenErrMsg = !!(isError && error);
    const isOpenSuccessMsg = !!(createdTask && createdTask.status === 'ok' && isCreated);

    return (
      <Theme>
        <Typography variant="h4" gutterBottom component="h2">
          Добавление задачи
        </Typography>
        <CreateTaskForm
          username={username}
          email={email}
          text={text}
          onChange={this.onChange}
          onClickReset={this.onClickReset}
          onClickCreateTask={this.onClickCreateTask}
          onClickCloseErrMsg={this.onClickCloseErrMsg}
          getErrorMessages={this.getErrorMessages}
          onClickCloseSuccessMsg={this.onClickCloseSuccessMsg}
          isOpenErrMsg={isOpenErrMsg}
          isOpenSuccessMsg={isOpenSuccessMsg}
        />
      </Theme>
    );
 }
}

CreateTask.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.object,
  createdTask: PropTypes.object,
  createTask: PropTypes.func,
};

CreateTask.defaultProps = {
  classes: {},
  error: null,
  createdTask: {},
  createTask: () => {}
};

const mapStateToProps = (state) => ({
  createdTask: state.createTask.createdTask,
  error: state.createTask.createTaskError
});

const mapDispatchToProps = (dispatch) => ({
  createTask: (data) => dispatch(createTask(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
