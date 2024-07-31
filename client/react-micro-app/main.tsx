import ReactDOM from "react-dom";
import App from "./src/App";
import React from "react";
// import { registerMicroApps, start } from 'qiankun';
ReactDOM.render(<App />, document.getElementById('root'));



export function bootstrap() {
    console.log('[vue] vue app bootstraped');
}
export function mount(props) {
    const { container } = props;
    ReactDOM.render(<App />, container ? container : document.getElementById('root'));

}
export function unmount() {

}






