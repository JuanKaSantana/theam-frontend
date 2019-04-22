import * as types from './actionTypes';
import API from '../../services/Api';

export function receiveUsers(users, total) {
    return { type: types.RECEIVE_USERS, users, total };
}

export function requestUsers() {
    return { type: types.REQUEST_USERS };
}

export function invalidateList() {
    return { type: types.INVALIDATE_USER_LIST };
}

export function setUser(user) {
    return { type: types.SET_USER, user, admin: user.admin };
}

export function logout() {
    return { type: types.LOGOUT };
}

export function setToken(token) {
    return { type: types.SET_TOKEN, token };
}

export function deleteToken() {
    return { type: types.DELETE_TOKEN };
}

export function API_getUsers(token) {
    return (dispatch) => {
        dispatch(requestUsers());
        return API.get('users/search', token).then((res) => {
            dispatch(receiveUsers(res.users, res.total));
            return res;
        });
    };
}
