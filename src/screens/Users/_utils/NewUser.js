import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import API from '../../../services/Api';

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: false,
            error: false,
        };
    }

    componentDidMount() {
        const { token, history: { replace } } = this.props;
        API.get('auth/secure', token).catch((err) => {
            if (err.status === 401) {
                return replace('/login');
            }
        });
    }

    changeField = field => (e) => {
        let { user } = this.state;
        user[field] = e.target.value;
        this.setState({ user });
    };

    save = () => {
        const { user } = this.state;
        const { history: { goBack }, token } = this.props;
        this.setState({ loading: true });
        API.post('users', { user }, {}, token)
            .then(() => goBack())
            .catch(() => goBack());
    }


    render() {
        const { user, loading, error } = this.state;
        return (
            <div>
                NEW USER
                { loading && <span>Loading</span> }
                { error && <span>Error while getting user info</span> }
                <div>
                    <div>
                        <label>Email</label>
                        <input type="email" onChange={e => this.changeField('email')(e)} value={user.email || ''} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" onChange={e => this.changeField('password')(e)} value={user.password || ''} />
                    </div>
                    <div>
                        <button onClick={this.save}>Save</button>
                        <Link to="/users">Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ userReducer: { token } }) {
    return {
        token,
    };
}

export default connect(mapStateToProps, null)(NewUser);