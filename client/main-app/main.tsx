import ReactDOM from "react-dom";
import App from "./src/App";
import React from "react";
import { registerMicroApps, start } from 'qiankun';
ReactDOM.render(<App/>, document.getElementById('root'));

registerMicroApps([
    {
        name: 'react-micro-app', // app name registered
        entry: '//127.0.0.1:3120',
        container: '#react-micro-app',
        activeRule: '/yourActiveRule',
    },
    {
        name: 'vue-micro-app',
        entry: "//localhost:3110",
        container: '#vue-micro-app',
        activeRule: '/vue-micro-app',
    },
]);

start();




