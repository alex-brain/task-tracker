import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Popup extends Component {
  render() {
    const { isOpen, title, onClickClose, text } = this.props;
    return (
      <Dialog
        onClose={onClickClose}
        fullWidth
        aria-labelledby='customized-dialog-title'
        open={isOpen}
        scroll='paper'
      >
        <DialogTitle id='customized-dialog-title' onClose={onClickClose}>
          {title}
        </DialogTitle>
        <DialogContent>
          {text}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color='primary'>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    );
 }
}

Popup.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClickClose: PropTypes.func,
};

Popup.defaultProps = {
  isOpen: false,
  title: '',
  onClickClose: () => {}
};

export default Popup;
