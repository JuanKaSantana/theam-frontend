import * as types from './actionTypes';
import API from '../../services/Api';

export function receiveCustomers(customers, total) {
    return { type: types.RECEIVE_CUSTOMERS, customers, total };
}

export function requestCustomers() {
    return { type: types.REQUEST_CUSTOMERS };
}

export function invalidateList() {
    return { type: types.INVALIDATE_CUSTOMERS_LIST };
}

export function API_getCustomers(token) {
    return (dispatch) => {
        dispatch(requestCustomers());
        return API.get('customers/search', token).then((res) => {
            dispatch(receiveCustomers(res.customers, res.total));
            return res;
        });
    };
}

