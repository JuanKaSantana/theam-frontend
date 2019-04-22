import * as types from '../actions/actionTypes';

const initialState = {
    list: {},
    total: 0,
    didInvalidate: true,
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {

    case types.GET_CUSTOMERS:
        newState = {
            ...state,
            list: action.customers,
        }
        return newState;

    case types.ADD_CUSTOMER:
        if (!state.list[action.id]) {
            const list = state.list;
            list[action.id] = action.user;
            newState = {
                ...state,
                list,
            }
        }
        return newState;

    case types.REQUEST_CUSTOMERS:
        newState = {
            ...state,
            isFetching: true,
        }
        return newState;

    case types.RECEIVE_CUSTOMERS:
        newState = {
            ...state,
            list: action.customers,
            total: action.total,
            isFetching: false,
            didInvalidate: false,
        }
        return newState;

    case types.INVALIDATE_CUSTOMERS_LIST:
        newState = {
            ...state,
            didInvalidate: true,
        }
        return newState;

    default:
        return state;
    }
}
