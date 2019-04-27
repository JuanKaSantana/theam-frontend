export default function statusErrorHandler(status) {
    console.log('status', status);
    switch (status) {
        case 400:
            return 'Some fields are required';
        case 403:
            return 'Wrong credentials';
        case 422:
            return 'Invalid data';
        case 409:
            return 'Duplicated data';
        case 500:
            return 'Ups, something went wrong';
        default:
            break;
    }
}
