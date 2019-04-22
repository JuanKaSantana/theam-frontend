import * as types from '../actions/actionTypes';

const initialState = {
    user: {},
    list: {},
    total: 0,
    token: '',
    logged: false,
    admin: false,
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
            admin: action.user.admin,
            logged: true,
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

    case types.ADD_USER:
        if (!state.list[action.id]) {
            const list = state.list;
            list[action.id] = 'asd';
            newState = {
                ...state,
                list,
            }
        }
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

    case types.SET_TOKEN:
        newState = {
            ...state,
            token: action.token,
        }
        return newState;

    case types.DELETE_TOKEN: 
        newState = {
            ...state,
            token: '',
        }
        return newState;

    default:
        return state;
    }
}
