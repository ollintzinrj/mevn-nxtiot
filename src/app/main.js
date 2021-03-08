import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './components/App.vue';

Vue.use(VueResource);

//Declaración de que componente se renderisa y en donde se monta (un div con id app)
new Vue ({
  render : h => h(App)
}).$mount('#app');