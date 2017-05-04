import React, { Component } from 'react';
import ReactCSSTG from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import './Login.css';

// Login component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
    // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isVisible: false,
    });
    return false;
  }
  handleRemount(e) {
    this.setState({
      isVisible: true,
    });
    e.preventDefault();
  }

  render() {
    // const for React CSS transition declaration
    const component = this.state.isVisible ? <Modal onSubmit={this.handleSubmit} key="modal" />
    : <ModalBack onClick={this.handleRemount} key="bringitback" />;

    return (
      <ReactCSSTG
        transitionName="animation"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        { component }
      </ReactCSSTG>
    );
  }
}

// Modal
const Modal = props => (
  <div className="Modal">
    <Logo />
    <form onSubmit={props.onSubmit} >
      <Input type="text" name="username" placeholder="username" />
      <Input type="password" name="password" placeholder="password" />
      <button> Login </button>
    </form>
    <div className="social-signin">
      <button className="fb" onClick={props.onClick}>
        <i className="fa fa-facebook" aria-hidden="true" />
      </button>
      <button className="tw" onClick={props.onClick}>
        <i className="fa fa-twitter" aria-hidden="true" />
      </button>
    </div>
    <a href="#/">Lost your password ?</a>
  </div>
);

Modal.propTypes = {
  onSubmit: PropTypes.function,
  onClick: PropTypes.function,
};

// Generic input field
const Input = props => (
  <div className="Input">
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      required
      autoComplete="false"
    />
    <label htmlFor={props.name} />
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.placeholder,
};

// Fake logo
const Logo = () => (
  <div className="logo">
    <i className="fa fa-bug" aria-hidden="true" />
    <span> Log in to Q </span>
  </div>
);

// Button to brind the modal back
const ModalBack = props => (
  <button
    className="bringitback"
    onClick={props.onClick}
    key={props.className}
  >
  Bring the modal back!
  </button>
);

ModalBack.propTypes = {
  onClick: PropTypes.function,
  className: PropTypes.string,
};

export default Login;
