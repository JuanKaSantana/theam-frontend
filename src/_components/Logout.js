import React from 'react';

const Logout = ({ history: { replace } }) => {
    const handleClick = () => {
        window.localStorage.clear();
        replace('login');
    }
    return (
        <div>
            <button className="button delete logout" onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Logout;
