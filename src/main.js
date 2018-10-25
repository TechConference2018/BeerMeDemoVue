import Vue from 'vue'
import App from './App.vue'

require('./assets/style.scss');

new Vue({
  el: '#app',
  render: h => h(App)
})
