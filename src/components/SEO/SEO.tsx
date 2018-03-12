import * as React from 'react';
import { Helmet } from "react-helmet";
import _find from 'lodash/find';


const { meta } = require('./meta.json');

export const SEO = (props) => {

    let content = _find( meta, { url: props.url } );
    if ( ! content ) {
        content = _find( meta, { url: 'default' } );
    }

    return (
        <Helmet>
            <title>{ content.title }</title>
            <meta name="description" content={ content.description } />
            <meta name="keywords" content={ content.keywords } />
        </Helmet>
    );

}
