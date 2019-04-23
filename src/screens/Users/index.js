import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_getUsers } from '../../redux/actions/userActions';
import Table from '../../_components/Table';
import Logout from '../../_components/Logout';

class Users extends Component {
    componentDidMount() {
        const { getUsers, history: { push } } = this.props;
        const token = window.localStorage.getItem('x-token');
        const admin = window.localStorage.getItem('x-admin');
        if (admin === 'false') {
            window.localStorage.clear();
            return push('login');
        } else {
            getUsers(token)
                .catch((err) => {
                    if (err.status === 401) {
                        window.localStorage.clear();
                        return push('login');
                    }
                });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.didInvalidate && this.props.didInvalidate !== prevProps.didInvalidate) {
            this.props.getUsers(this.props.token);
        }
    }

    render() {
        const {
            users, isFetching, didInvalidate, match, history } = this.props;
        return (
            <div>
                <h1>Users</h1>
                <Link to="/customers">Customers</Link>
                <Link to="/users/new">New User</Link>
                <Logout history={history}/>
                {
                    isFetching && <h3>Loading</h3>
                }
                {
                    users && users.length > 0 && !didInvalidate && <Table from={match.url} headers={Object.keys(users[0])} data={users} />
                }
            </div>
        );
    }
}

function mapStateToProps({ userReducer }) {
    const {
        list, isFetching, didInvalidate, logged, admin, token,
    } = userReducer;
    return {
        users: list,
        isFetching,
        didInvalidate,
        logged,
        admin,
        token,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: (token) => dispatch(API_getUsers(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);