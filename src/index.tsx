import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "components/App";

import * as WebFont from 'webfontloader';

import 'config/style.css'

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif', 'Ubuntu Mono']
  }
});

ReactDOM.render(
    <App />,
    document.getElementById("content")
);
