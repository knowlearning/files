import { browserAgent } from '@knowlearning/agents'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

window.Agent = browserAgent()

const { auth: { provider }} = await Agent.environment()

if (provider === 'anonymous') Agent.login()
else createApp(App).mount('#app')
