import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        const { token } = this.props;
        return API.get(`images/download/${id}`, token)
            .then(res => res[0].image);
    };

    getImage = () => {
        const { image, loading } = this.state;
        if (image && !loading) {
            return <img src={image} style={{ width: 50, height: 50 }} />;
        } else {
            return <div style={{ width: 50, height: 50 }}>None</div>;
        }
    }

    onClick = (from, id) => {
        const { token } = this.props;
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
            <tr className={c('tr')}>
                {
                    from.includes('customers') && this.getImage()
                }
                {
                    Object.keys(singleData).map((key) => {
                        if (key === 'admin') {
                            return <td className={c('td')}>{singleData[key].toString()}</td>;
                        } else if (key !== '_id' && key !== 'password') {
                            return <td className={c('td')}>{singleData[key]}</td>;
                        } else {
                            return null;
                        }
                    })
                }
                <td className={c('td')}>
                    <Link to={`${from}/edit/${singleData._id}`}>Edit</Link>
                    <button onClick={() => this.onClick(from, singleData._id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

function mapStateToProps({ userReducer: { token } }) {
    return {
        token,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        invalidateCustomerList: () => dispatch(invalidateCustomerList()),
        invalidateUserList: () => dispatch(invalidateUserList()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListElement);