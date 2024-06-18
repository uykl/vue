import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入router实例


createApp(App)
    .use(router) // 挂载到根实例
    .mount('#app')
