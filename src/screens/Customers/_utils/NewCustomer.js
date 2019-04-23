import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../../services/Api';

import ImageUploader from '../../../_components/ImageUploader';

class NewCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            loading: false,
            error: false,
            image: '',
        };
    }

    componentDidMount() {
        const { history: { replace } } = this.props;
        const token = window.localStorage.getItem('x-token');
        API.get('auth/secure', token).catch((err) => {
            if (err.status === 401) {
                window.localStorage.clear();
                return replace('/login');
            }
        });
    }

    changeField = field => (e) => {
        let { customer } = this.state;
        customer[field] = e.target.value;
        this.setState({ customer });
    };

    handlePhotoChange = image => this.setState({ image });

    saveImage = () => {
        const token = window.localStorage.getItem('x-token');
        const { customer: { id }, image } = this.state;
        return API.post('images/upload', { id, image }, {}, token);
    };

    save = () => {
        const token = window.localStorage.getItem('x-token');
        const { customer, image } = this.state;
        const { history: { goBack } } = this.props;
        this.setState({ loading: true });
        API.post('customers', { customer }, {}, token)
            .then(() => {
                if (image.length > 0) {
                    this.saveImage().then(() => {
                        goBack();
                    });
                } else {
                    goBack();
                }
            })
            .catch(() => goBack());
    }


    render() {
        const { customer, loading, error, } = this.state;

        return (
            <div>
                NEW CUSTOMER
                <div>
                    <div>
                        <label>Id</label>
                        <input type="text" onChange={e => this.changeField('id')(e)} value={customer.id || ''} />
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={e => this.changeField('name')(e)} value={customer.name || ''} />
                    </div>
                    <div>
                        <label>Surname</label>
                        <input type="text" onChange={e => this.changeField('surname')(e)} value={customer.surname || ''} />
                    </div>
                    {
                        customer && customer.id && customer.name && customer.surname && (
                            <ImageUploader handleImageChange={this.handlePhotoChange} />
                        )
                    }
                    <div>
                        <button onClick={this.save}>Save</button>
                        <Link to="/customers">Back</Link>
                    </div>
                </div>
                {loading && <span>Loading</span>}
                {error && <span>Error while getting customer info</span>}
            </div>
        );
    }
}

export default NewCustomer;