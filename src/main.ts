import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setDirective } from './utils/directive'

// 引入unocss
import 'uno.css'

const app = createApp(App)

setDirective(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
