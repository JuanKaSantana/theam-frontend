import React from 'react';
import c from 'classnames';

const Head = ({ headers }) => (
    <thead className={c('thead')}>
        <tr className={c('header')}>
            {
                headers.map((header) => header !== '_id' && header !== 'password' && <th className={c('th')}>{header}</th>)
            }
            <th className={c('th')}>Actions</th>
        </tr>
    </thead>
);

export default Head;
