import React from 'react';
import c from 'classnames';
import ListElement from './ListElement';

const Body = ({ data, from }) => (
    <tbody className={c('tbody')}>
        {
            data.map(singleData => <ListElement key={singleData._id} singleData={singleData} from={from} />)
        }
    </tbody>
);

export default Body;
