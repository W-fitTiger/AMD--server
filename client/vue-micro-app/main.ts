
// Register icon sprite

import { createApp } from 'vue';
import App from './src/App.vue';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

const app = createApp(App);
renderWithQiankun({
 bootstrap() {
  console.log('[vue] vue app bootstraped');
}, 
mount(props) {
 
  const { container } = props;
  console.log(container,'containercontainer');
  
  app.mount(container ? container: "#root");

}
, unmount() {

},update(props) {
    
},
})
