require('./bootstrap');


window.Vue = require('vue');

import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('add-task', require('./components/AddTaskComponent.vue').default);
Vue.component('edit-task', require('./components/EditTaskComponent.vue').default);



import Home from './components/HomeComponent.vue';
import Task from './components/TaskComponent.vue';



const routes=[
    {
        path:'/',
        component:Home
    },
    {
        path:'/task',
        component:Task
    }
]

const router= new VueRouter({routes});

const app = new Vue({
    el: '#app',
    mode:'history',
    router:router
});
