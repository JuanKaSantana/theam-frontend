import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        const token = window.localStorage.getItem('x-token');
        const admin = window.localStorage.getItem('x-admin');
        const { history: { replace } } = this.props;
        
        if (admin === 'false') {
            window.localStorage.clear();
            return replace('/login');
        }
        API.get('auth/secure', token).catch((err) => {
            if (err.status === 401) {
                window.localStorage.clear();
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
        const token = window.localStorage.getItem('x-token');
        const { user } = this.state;
        const { history: { goBack } } = this.props;
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

export default NewUser;