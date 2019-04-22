import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_getCustomers } from '../../redux/actions/customerAction';
import Table from '../../_components/Table';

class Customers extends Component {
    componentDidMount() {
        const { token, logged, getCustomers, history: { push } } = this.props;
        if (!logged) {
            return push('login');
        }
        getCustomers(token).then((res) => {
            if (res.error === 'Invalid token') {
                return push('login');
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { didInvalidate, token, getCustomers, history: { push } } = this.props;
        if (didInvalidate && didInvalidate !== prevProps.didInvalidate) {
            getCustomers(token).then((res) => {
                if (res.error === 'Invalid token') {
                    return push('login');
                }
            });
        }
    }

    render() {
        const { customers, isFetching, didInvalidate, location, admin } = this.props;
        let headers;
        if (customers && customers.length > 0) {
            headers = Object.keys(customers[0]);
            headers.unshift('Image')
        }
        return (
            <div>
                <h1>Customers</h1>
                {admin && <Link to="/users">Users</Link>}
                <Link to="/customers/new">New Customer</Link>
                {
                    isFetching && <h3>Loading</h3>
                }
                {
                    customers && customers.length > 0 && !didInvalidate && <Table from={location.pathname} headers={headers} data={customers} />
                }
            </div>
        );
    }
}

function mapStateToProps({ customerReducer, userReducer: { logged, admin, token } }) {
    const {
        list, isFetching, didInvalidate
    } = customerReducer;
    return {
        customers: list,
        isFetching,
        didInvalidate,
        logged,
        admin,
        token,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCustomers: (token) => dispatch(API_getCustomers(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);