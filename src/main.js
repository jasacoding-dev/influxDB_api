import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Pastikan ini diimpor
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App)
  .use(router) // Pastikan router digunakan
  .mount('#app');