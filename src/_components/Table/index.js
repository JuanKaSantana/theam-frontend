import React from 'react';
import c from 'classnames';
import Head from './Head';
import Body from './Body';

const Table = ({ headers, data, from }) => (
    <table className={c('table')}>
        <Head headers={headers} />
        <Body data={data} from={from} />
    </table>
);

export default Table;