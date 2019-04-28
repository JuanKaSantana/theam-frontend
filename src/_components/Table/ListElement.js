import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import c from 'classnames';

import API from '../../services/Api';
import { invalidateList as invalidateCustomerList } from '../../redux/actions/customerAction';
import { invalidateList as invalidateUserList } from '../../redux/actions/userActions';

class ListElement extends Component {
    state = {
        image: null,
        loading: false,
    };

    componentDidMount() {
        const { from, singleData } = this.props;
        if (from.includes('customers')) {
            this.setState({ loading: true });
            this.downloadImage(singleData.id).then(image => this.setState({ image, loading: false }));
        }
    }

    downloadImage = (id) => {
        const token = window.localStorage.getItem('x-token');
        return API.get(`images/download/${id}`, token)
            .then(res => _.get(res[0], 'image', null));
    };

    getImage = () => {
        const { image, loading } = this.state;
        if (image && !loading) {
            return <td><img src={image} className="image" alt="Customer" /></td>;
        } else {
            return <td>None</td>;
        }
    }

    onClick = (from, id) => {
        const { invalidateCustomerList, invalidateUserList } = this.props;
        const token = window.localStorage.getItem('x-token');
        const secure = window.confirm('Are you sure that you want to delete this user?');
        if (secure) {
            API.delete(`${from.substring(1)}/${id}`, token)
                .then(() => {
                    if (from.includes('customer')) {
                        invalidateCustomerList();
                    } else {
                        invalidateUserList();
                    }
                });
        }
    };

    render() {
        const { from, singleData } = this.props;
        const { loading } = this.state;
        if (loading) {
            return <tr><td>Loading</td></tr>
        }
        return (
            <tr>
                {
                    from.includes('customers') && this.getImage()
                }
                {
                    Object.keys(singleData).map((key) => {
                        if (key === 'admin') {
                            return <td key={`${from}-${key}`} className={c('td')}>{!!singleData[key] ? "true" : "false"}</td>;
                        } else if (key !== '_id' && key !== 'password') { 
                            return <td key={`${from}-${key}`} className={c('td')}>{singleData[key]}</td>;
                        } else {
                            return null;
                        }
                    })
                }
                <td className={c('action-container')}>
                    <Link className="button edit" to={`${from}/edit/${singleData._id}`}>Edit</Link>
                    <button className="button delete" onClick={() => this.onClick(from, singleData._id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        invalidateCustomerList: () => dispatch(invalidateCustomerList()),
        invalidateUserList: () => dispatch(invalidateUserList()),
    };
}

export default connect(null, mapDispatchToProps)(ListElement);