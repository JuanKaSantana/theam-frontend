import React, { Component } from 'react';
import { connect } from 'react-redux';
import API from '../services/Api';
import { setUser, setToken } from '../redux/actions/userActions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    handleFieldChange = field => e => this.setState({ [field]: e.target.value });

    login = () => {
        const { email, password } = this.state;
        API.post('auth/login', { email, password })
            .then((res) => {
                if (res.status === 'OK') {
                    this.props.setUser(res.user);
                    this.props.setToken(res.token);
                    if (res.user.admin) {
                        this.props.history.push('/users');
                    } else {
                        this.props.history.push('/customers');
                    }
                } else {
                    this.setState({ message: res.errorMessage });
                }

            })
            .catch((err) => console.log('err', err));
    }

    signup = () => {
        const { email, password } = this.state;
        const user = { email, password };
        API.post('auth/signup', { user })
            .then((res) => {
                if (res.errorMessage) {
                    this.setState({ message: res.errorMessage });
                } else {
                    this.props.setUser(res.user);
                    this.props.setToken(res.token);
                    this.props.history.push('/customers');
                }
            })
            .catch((err) => console.log('err', err));
    }

    render() {
        const { email, password, message } = this.state;
        return (
            <div>
                <div>
                    <label>Email</label>
                    <input type="text" onChange={e => this.handleFieldChange('email')(e)} value={email} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={e => this.handleFieldChange('password')(e)} value={password} />
                </div>
                <div>
                    <input type="button" onClick={this.login} value="Log in" />
                    o
                    <input type="button" onClick={this.signup} value="Sign up" />
                </div>
                {message && <span>{message}</span>}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: user => dispatch(setUser(user)),
        setToken: user => dispatch(setToken(user)),
    };
}

export default connect(null, mapDispatchToProps)(Login);
