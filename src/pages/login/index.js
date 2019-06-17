import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withRouter, Redirect } from 'react-router-dom';
import LoginForm from '../../components/login-form';
import { login } from '../../actions/auth';
import Popup from '../../components/popup';
import checkIsLogged from '../../utils/checkIsLogged';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isLogin: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ isError: true });
    }
  }

  onClickCloseErrMsg = () => {
    this.setState({ isError: false });
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
    const { login, error } = this.props;
    const { isError } = this.state;
    const isOpenErrMsg = !!(isError && error);

    if (checkIsLogged()) {
      return <Redirect to="/" />
    }
    return (
      <>
        <LoginForm onClickLogin={login} />
        <Popup
          isOpen={isOpenErrMsg}
          onClickClose={this.onClickCloseErrMsg}
          title="Ошибка запроса"
          text={this.getErrorMessages()}
        />
      </>
    )
  }
}

Login.propTypes = {
  accessToken: PropTypes.string,
  login: PropTypes.func
};

Login.defaultProps = {
  accessToken: '',
  login: () => {}
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.access_token,
  error: state.auth.errorLogin
});
const mapDispatchToProps = (dispatch) => ({
  login: (formData) => dispatch(login(formData)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
