import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_getCustomers } from '../../redux/actions/customerAction';
import Table from '../../_components/Table';
import Logout from '../../_components/Logout';

class Customers extends Component {
    componentDidMount() {
        const { getCustomers, history: { push } } = this.props;
        const token = window.localStorage.getItem('x-token');
        getCustomers(token).catch((err) => {
            if (err.status === 401) {
                window.localStorage.clear();
                return push('login');
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { didInvalidate, getCustomers, history: { push } } = this.props;
        const token = window.localStorage.getItem('x-token');
        if (didInvalidate && didInvalidate !== prevProps.didInvalidate) {
            getCustomers(token).catch((err) => {
                if (err.status === 401) {
                    window.localStorage.clear();
                    return push('login');
                }
            });
        }
    }

    render() {
        const { customers, isFetching, didInvalidate, location, history } = this.props;
        const admin = window.localStorage.getItem('x-admin');
        let headers;
        if (customers && customers.length > 0) {
            headers = Object.keys(customers[0]);
            headers.unshift('Image')
        }
        return (
            <div>
                <h1>Customers</h1>
                {admin && admin === 'true' && <Link to="/users">Users</Link>}
                <Link to="/customers/new">New Customer</Link>
                <Logout history={history}/>
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

function mapStateToProps({ customerReducer}) {
    const {
        list, isFetching, didInvalidate
    } = customerReducer;
    return {
        customers: list,
        isFetching,
        didInvalidate,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCustomers: (token) => dispatch(API_getCustomers(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);