
// Register icon sprite

import { createApp } from 'vue';


import App from './src/App.vue';

async function initApp() {

  // Configure store
  // 配置 store

  // Initialize internal system configuration
  // 初始化内部系统配置

  // Register global components
  // 注册全局组件

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取

  // Configure routing
  // 配置路由

  // router-guard
  // 路由守卫

  // Register global directive
  // 注册全局指令

  // Configure global error handling
  // 配置全局错误处理

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();


}
const app = createApp(App);

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  const { container } = props;
  app.mount(container ? container : "#root");

}
export async function unmount() {
  app.unmount();

}
