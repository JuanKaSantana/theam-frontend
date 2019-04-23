import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../../services/Api';
import ImageUploader from '../../../_components/ImageUploader';

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            image: null,
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        const { history: { replace }, match: { params: { id } } } = this.props;
        const token = window.localStorage.getItem('x-token');
        API.get(`customers/search/${id}`, token)
            .then((res) => {
                const { customer } = res;
                let image = null;
                API.get(`images/download/${customer.id}`, token)
                    .then((result) => {
                        image = result[0].image;
                        this.setState({ loading: false, customer, image })
                    });
            })
            .catch((err) => {
                if (err.status === 401) {
                    window.localStorage.clear();
                    return replace('/login');
                }
                this.setState({ loading: false, error: true })
            });
    }

    changeField = field => (e) => {
        let { customer } = this.state;
        customer[field] = e.target.value;
        this.setState({ customer });
    };

    saveImage = (image) => {
        const token = window.localStorage.getItem('x-token');
        const { customer: { id } } = this.state;
        return API.post('images/upload', { id, image }, {}, token);
    };

    save = () => {
        const { customer } = this.state;
        const { history: { goBack } } = this.props;
        const token = window.localStorage.getItem('x-token');
        this.setState({ loading: true });
        API.put('customers', { id: customer._id, changeValues: customer }, token)
            .then(() => goBack())
            .catch(() => goBack());
    }


    render() {
        const { customer, loading, error, image } = this.state;
        return (
            <div>
                EDIT
                {loading && <span>Loading</span>}
                {error && <span>Error while getting customer info</span>}
                {
                    customer && Object.keys(customer).length > 0 && (
                        <div>
                            <div>
                                <label>Id</label>
                                <input type="text" onChange={e => this.changeField('id')(e)} value={customer.id} />
                            </div>
                            <div>
                                <label>Name</label>
                                <input type="text" onChange={e => this.changeField('name')(e)} value={customer.name} />
                            </div>
                            <div>
                                <label>Surname</label>
                                <input type="text" onChange={e => this.changeField('surname')(e)} value={customer.surname} />
                            </div>
                            {
                                customer && customer.id && customer.name && customer.surname && (
                                    <ImageUploader image={image} handleImageChange={this.saveImage} />
                                )
                            }
                            <div>
                                <button onClick={this.save}>Save</button>
                                <Link to="/customers">Back</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}
export default EditCustomer;