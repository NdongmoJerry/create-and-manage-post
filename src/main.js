import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'vue-multiselect/dist/vue-multiselect.css'

createApp(App).use(store).use(router).mount('#app')