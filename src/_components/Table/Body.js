import React from 'react';
import c from 'classnames';
import ListElement from './ListElement';

const Body = ({ data, from }) => (
    <tbody className={c('tbody')}>
        {
            data.map(singleData => <ListElement singleData={singleData} from={from} />)
        }
    </tbody>
);

export default Body;
