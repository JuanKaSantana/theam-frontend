import React, { Component } from 'react';
import { connect } from 'react-redux';
import API from '../services/Api';
import statusErrorHandler from '../_helper/statusErrorHandler';
import { setUser } from '../redux/actions/userActions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    handleFieldChange = field => e => this.setState({ [field]: e.target.value });

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login = () => {
        const { email, password } = this.state;
        if (!this.validateEmail(email)) {
            return this.setState({ message: 'Invalid email' });
        }
        API.post('auth/login', { email, password })
            .then((res) => {
                this.props.setUser(res.user);
                window.localStorage.setItem('x-token', res.token);
                window.localStorage.setItem('x-admin', res.user.admin);
                if (res.user.admin) {
                    this.props.history.push('/users');
                } else {
                    this.props.history.push('/customers');
                }
            })
            .catch((err) => {
                this.setState({ message: statusErrorHandler(err.status) });
            });
    }

    signup = () => {
        const { email, password } = this.state;
        const user = { email, password };
        if (!this.validateEmail(email)) {
            return this.setState({ message: 'Invalid email' });
        }
        API.post('auth/signup', { user })
            .then((res) => {
                this.props.setUser(res.user);
                window.localStorage.setItem('x-token', res.token);
                window.localStorage.setItem('x-admin', false);
                this.props.history.push('/customers');
            })
            .catch((err) => {
                this.setState({ message: statusErrorHandler(err.status) });
            });
    }

    render() {
        const { email, password, message } = this.state;
        return (
            <div className="container">
                <h1 className="page-header">Login</h1>
                <div className="form-container">
                    <div className="input-container">
                        <label>Email</label>
                        <input type="email" onChange={e => this.handleFieldChange('email')(e)} value={email} />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" onChange={e => this.handleFieldChange('password')(e)} value={password} />
                    </div>
                    <div className="input-container">
                        <input type="button" className="button save" onClick={this.login} value="Log in" disabled={!email || !password} />
                        <input type="button" className="button edit" onClick={this.signup} value="Sign up" disabled={!email || !password} />
                    </div>
                    {message && <span>{message}</span>}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: user => dispatch(setUser(user)),
    };
}

export default connect(null, mapDispatchToProps)(Login);
