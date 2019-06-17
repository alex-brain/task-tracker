import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Theme from '../../containers/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getTasks } from "../../actions/get-tasks";
import { updateTask } from "../../actions/update-task";
import Popup from '../../components/popup';
import TaskSort from '../../components/task-sort';
import TasksTable from '../../components/tasks-table';
import Preloader from '../../components/preloader';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      field: '',
      direction: '',
      editingItemId: null,
      text: '',
      isError: false,
      status: 0
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && this.props.error!== prevProps.error) {
      this.setState({ isError: true });
    }
  }

  onClickCloseErrMsg = () => {
    this.setState({ isError: false });
  };

  getTasks = () => {
    const { page, field, direction } = this.state;
    this.props.getTasks(page + 1, field, direction);
  };

  onClickAddTaskBtn = () => {
    this.props.history.push('/add-task');
  };

  onClickResetSortBtn = () => {
    this.setState({
      field: '',
      direction: ''
    }, () => this.getTasks());
  };

  onChangePaginationPage = async (changedPage) => {
    this.setState({
      page: changedPage,
    }, () => this.getTasks());
  };

  onChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => this.getGoods());
  };

  onChangeSort = (field) => (event) => {
    this.setState({ [field]: event.target.value}, () => this.getTasks());
  };

  isCheckboxDisabled = () => {
    return !this.props.accessToken;
  };

  onClickEditItem = (text, status, itemId) => () => {
    this.setState({ editingItemId: itemId, text, status });
  };

  onClickDoneItem = () => {
    this.props.updateTask(this.state.text, this.state.status, this.state.editingItemId);
    this.setState({ text: '', editingItemId: null});
  };

  onClickItemStatus = (text, status, itemId) => () => {
    const updatedStatus = status === 0 ? 10 : 0;
    this.props.updateTask(text, updatedStatus, itemId);
  };

  onChangeTaskText = (e) => {
    this.setState({ text: e.target.value });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.updateTask(this.state.text, this.state.status, this.state.editingItemId);
      this.setState({ text: '', editingItemId: null});
    }
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

  checkIsTaskDone = (status) => {
    return status === 10;
  };

  render() {
    const { tasks, totalTaskCount, accessToken, error, getTasksLoading } = this.props;
    const { page, field, direction, editingItemId, text, isError } = this.state;
    const isOpenErrMsg = !!(isError && error);

    return (
      <Theme>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.onClickAddTaskBtn}
          >
            Добавить задачу
          </Button>
        </Grid>
        {getTasksLoading ? (
          <Preloader/>
        ) : (
          <>
            <TaskSort
              field={field}
              direction={direction}
              onChangeSort={this.onChangeSort}
              onClickResetSortBtn={this.onClickResetSortBtn}
            />
            <TasksTable
              accessToken={accessToken}
              tasks={tasks}
              editingItemId={editingItemId}
              text={text}
              totalTaskCount={parseInt(totalTaskCount)}
              page={page}
              checkIsTaskDone={this.checkIsTaskDone}
              isCheckboxDisabled={this.isCheckboxDisabled}
              onClickItemStatus={this.onClickItemStatus}
              onChangeTaskText={this.onChangeTaskText}
              onKeyDown={this.onKeyDown}
              onClickDoneItem={this.onClickDoneItem}
              onClickEditItem={this.onClickEditItem}
              onChangePaginationPage={this.onChangePaginationPage}
              onChangeRowsPerPage={this.onChangeRowsPerPage}
            />
          </>
        )}
        <Popup
          isOpen={isOpenErrMsg}
          onClickClose={this.onClickCloseErrMsg}
          text={this.getErrorMessages()}
          title="Ошибка редактирования"
        />
      </Theme>
    );
 }
}

Home.propTypes = {
  tasks: PropTypes.array,
  totalTaskCount: PropTypes.string,
  getTasksLoading: PropTypes.bool,
  getTasks: PropTypes.func,
  updateTask: PropTypes.func,
  accessToken: PropTypes.string,
  error: PropTypes.object,
};

Home.defaultProps = {
  tasks: [],
  totalTaskCount: '0',
  getTasksLoading: false,
  getTasks: () => {},
  updateTask: () => {},
  accessToken: '',
  error: {},
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
  totalTaskCount: state.tasks.totalTaskCount,
  getTasksLoading: state.tasks.getTasksLoading,
  accessToken: state.auth.access_token,
  error: state.updateTask.updateTaskError,
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: (page, field, direction) => dispatch(getTasks(page, field, direction)),
  updateTask: (text, status, itemId) => dispatch(updateTask(text, status, itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
