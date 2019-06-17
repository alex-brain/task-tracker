import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  tasksTable: {
    marginTop: '20px'
  },
  smallWidth: {
    width: '10%'
  },
  bigWidth: {
    width: '30%'
  },
  marginTop: {
    marginTop: '40px'
  }
});

class TasksTable extends Component {
  render() {
    const { classes, accessToken, tasks, editingItemId, text, totalTaskCount, page, checkIsTaskDone,
      isCheckboxDisabled, onClickItemStatus, onChangeTaskText, onKeyDown, onClickDoneItem, onClickEditItem,
      onChangePaginationPage, onChangeRowsPerPage
    } = this.props;

    if (tasks.length !== 0) {
      return (
        <Table className={classes.tasksTable}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Имя пользователя</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left" className={classes.bigWidth}>Текст</TableCell>
              <TableCell align="left" className={classes.smallWidth}>Выполнено</TableCell>
              {accessToken ? (
                <TableCell align="left" className={classes.smallWidth}>Редактирование</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">{item.username}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left" className={classes.bigWidth}>
                  {accessToken && editingItemId && editingItemId === item.id ? (
                    <TextField
                      value={text}
                      label="Текст"
                      fullWidth
                      onChange={onChangeTaskText}
                      onKeyDown={onKeyDown}
                    />
                  ): (
                    item.text
                  )}
                </TableCell>
                <TableCell align="left" className={classes.smallWidth}>
                  <Checkbox
                    checked={checkIsTaskDone(item.status)}
                    disabled={isCheckboxDisabled()}
                    onClick={onClickItemStatus(item.text, item.status, item.id)}
                  />
                </TableCell>
                {accessToken && (
                  <TableCell className={classes.smallWidth}>
                    {editingItemId === item.id ? (
                      <Button color="primary" onClick={onClickDoneItem}>
                        <DoneIcon />
                      </Button>
                    ) : (
                      <Button color="primary" onClick={onClickEditItem(item.text, item.status, item.id)}>
                        <EditIcon />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[3]}
                labelRowsPerPage="На странице"
                count={parseInt(totalTaskCount)}
                rowsPerPage={3}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={(event, changedPage) => onChangePaginationPage(changedPage)}
                onChangeRowsPerPage={onChangeRowsPerPage}
                SelectProps={{
                  native: true,
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      );
    } else {
      return (
        <Grid container justify="center" className={classes.marginTop}>
          <Typography variant="h4" gutterBottom component="h2">
            Нет  данных
          </Typography>
        </Grid>
      )
    }
 }
}

TasksTable.propTypes = {
  classes: PropTypes.object,
  accessToken: PropTypes.string,
  text: PropTypes.string,
  totalTaskCount: PropTypes.number,
  tasks: PropTypes.array,
  editingItemId: PropTypes.number,
  page: PropTypes.number,
  checkIsTaskDone: PropTypes.func,
  onClickItemStatus: PropTypes.func,
  onChangeTaskText: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClickDoneItem: PropTypes.func,
  onClickEditItem: PropTypes.func,
  onChangePaginationPage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  isCheckboxDisabled: PropTypes.func,
};

TasksTable.defaultProps = {
  classes: {},
  accessToken: '',
  text: '',
  totalTaskCount: 0,
  tasks: [],
  editingItemId: null,
  page: 0,
  checkIsTaskDone: () => {},
  onClickItemStatus: () => {},
  onChangeTaskText: () => {},
  onKeyDown: () => {},
  onClickDoneItem: () => {},
  onClickEditItem: () => {},
  onChangePaginationPage: () => {},
  onChangeRowsPerPage: () => {},
  isCheckboxDisabled: () => {}
};

export default withStyles(styles)(TasksTable);
