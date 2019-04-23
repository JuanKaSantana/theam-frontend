import * as types from '../actions/actionTypes';

const initialState = {
    user: {},
    list: {},
    total: 0,
    didInvalidate: true,
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    case types.SET_USER:
        newState = {
            ...state,
            user: action.user,
        };
        return newState;

    case types.GET_USERS:
        newState = {
            ...state,
            list: action.users,
        }
        return newState;

    case types.LOGOUT:
        newState = initialState;
        return newState;

    case types.REQUEST_USERS:
        newState = {
            ...state,
            isFetching: true,
        }
        return newState;

    case types.RECEIVE_USERS:
        newState = {
            ...state,
            list: action.users,
            total: action.total,
            isFetching: false,
            didInvalidate: false,
        }
        return newState;

    case types.INVALIDATE_USER_LIST:
        newState = {
            ...state,
            didInvalidate: true,
        }
        return newState;

    default:
        return state;
    }
}
