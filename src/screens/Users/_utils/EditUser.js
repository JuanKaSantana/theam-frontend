import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../../services/Api';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem('x-token');
        const admin = window.localStorage.getItem('x-admin');
        const { history: { replace },match: { params: { id } } } = this.props;
        
        if (admin === 'false') {
            window.localStorage.clear();
            return replace('/login');
        }

        API.get(`users/search/${id}`, token)
            .then((res) => {
                if (res.error) {
                    window.localStorage.clear();
                    return replace('/login');
                }
                this.setState({ loading: false, user: res.user });
            })
            .catch(() => this.setState({ loading: false, error: true }));
    }

    changeField = field => (e) => {
        let { user } = this.state;
        user[field] = e.target.value;
        this.setState({ user });
    };

    handleAdminChange = (e) => {
        const { target: { checked } } = e;
        let { user } = this.state;
        user.admin = checked;
        this.setState({ user });
    }

    save = () => {
        const token = window.localStorage.getItem('x-token');
        const { user } = this.state;
        const { history: { goBack } } = this.props;
        this.setState({ loading: true });
        API.put('users', { id: user._id, changeValues: user }, token)
            .then(() => goBack())
            .catch(() => goBack());
    }


    render() {
        const { user, loading, error } = this.state;
        return (
            <div className="container">
                <h1 className="page-header">Edit User</h1>
                {
                    user && Object.keys(user).length > 0 && (
                        <div className="form-container">
                            <div className="input-container">
                                <label>Email</label>
                                <input type="text" onChange={e => this.changeField('email')(e)} value={user.email} />
                            </div>
                            <div className="input-container">
                                <label>Admin</label>
                                <input type="checkbox" onChange={this.handleAdminChange} checked={user.admin} />
                            </div>
                            <div>
                                <button className="button save" onClick={this.save}>Save</button>
                                <Link to="/users" className="button back">Back</Link>
                            </div>
                        </div>
                    )
                }
                { loading && <span>Loading</span> }
                { error && <span>Error while getting user info</span> }
            </div>
        );
    }
}

export default EditUser;
