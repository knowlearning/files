import { browserAgent } from '@knowlearning/agents'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

window.Agent = browserAgent()

createApp(App).mount('#app')
