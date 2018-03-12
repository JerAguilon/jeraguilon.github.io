import * as React from 'react';
import { Helmet } from "react-helmet";
import _ from 'lodash';


const { meta } = require('./meta.json');

export const SEO = (props) => {

    let content = _.find( meta, { url: props.url } );
    if ( ! content ) {
        content = _.find( meta, { url: 'default' } );
    }

    return (
        <Helmet>
            <title>{ content.title }</title>
            <meta name="description" content={ content.description } />
            <meta name="keywords" content={ content.keywords } />
        </Helmet>
    );

}
