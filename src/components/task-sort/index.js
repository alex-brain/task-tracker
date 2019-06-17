import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = () => ({
  formControl: {
    width: '100%'
  },
  sortItem: {
    marginRight: '30px'
  }
});

class TaskSort extends Component {
  render() {
    const { classes, field, direction, onChangeSort, onClickResetSortBtn } = this.props;

    return (
      <Grid container justify='center' alignItems='center'>
        <Grid item sm={2} className={classes.sortItem}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="field">Поле</InputLabel>
            <Select
              classes={{
                root: classes.select
              }}
              value={field}
              onChange={onChangeSort('field')}
              inputProps={{
                name: 'field',
                id: 'field',
              }}
            >
              <MenuItem value='id'>id</MenuItem>
              <MenuItem value='username'>Имя пользователя</MenuItem>
              <MenuItem value='email'>Email</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={2} className={classes.sortItem}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="field">Направление</InputLabel>
            <Select
              classes={{
                root: classes.select
              }}
              value={direction}
              onChange={onChangeSort('direction')}
              inputProps={{
                name: 'direction',
                id: 'direction',
              }}
            >
              <MenuItem value='asc'>По возрастанию</MenuItem>
              <MenuItem value='desc'>По убыванию</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} className={classes.sortItem}>
          <Button
            variant="contained"
            onClick={onClickResetSortBtn}
          >
            Очистить
          </Button>
        </Grid>
      </Grid>
    );
 }
}

TaskSort.propTypes = {
  classes: PropTypes.object,
  field: PropTypes.string,
  direction: PropTypes.string,
  onChangeSort: PropTypes.func,
  onClickResetSortBtn: PropTypes.func,
};

TaskSort.defaultProps = {
  classes: {},
  field: '',
  direction: '',
  onChangeSort: () => {},
  onClickResetSortBtn: () => {},
};

export default withStyles(styles)(TaskSort);
