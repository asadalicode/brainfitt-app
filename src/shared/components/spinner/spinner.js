import React, { useEffect } from 'react';

import Style from './spinner.module.scss';

export const Spinner = ({isWhite = false}) => {

    return (
        <div className={`${Style.contianer} d-flex`}>
            <div className={`${Style.spinner} ${ isWhite ? Style.whiteborder :''}`}></div>
        </div>
    );
}
