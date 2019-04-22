import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        const { history: { replace },match: { params: { id } }, token } = this.props;
        API.get(`users/search/${id}`, token)
            .then((res) => {
                if (res.error) {
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
        const { user } = this.state;
        const { history: { goBack }, token } = this.props;
        this.setState({ loading: true });
        API.put('users', { id: user._id, changeValues: user }, token)
            .then(() => goBack())
            .catch(() => goBack());
    }


    render() {
        const { user, loading, error } = this.state;
        return (
            <div>
                EDIT
                { loading && <span>Loading</span> }
                { error && <span>Error while getting user info</span> }
                {
                    user && Object.keys(user).length > 0 && (
                        <div>
                            <div>
                                <label>Email</label>
                                <input type="text" onChange={e => this.changeField('email')(e)} value={user.email} />
                            </div>
                            <div>
                                <label>Admin</label>
                                <input type="checkbox" onChange={this.handleAdminChange} checked={user.admin} />
                            </div>
                            <div>
                                <button onClick={this.save}>Save</button>
                                <Link to="/users">Back</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps({ userReducer: { token } }) {
    return {
        token,
    };
}

export default connect(mapStateToProps, null)(EditUser);