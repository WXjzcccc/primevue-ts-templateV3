import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';

const routes = [
    {
        path: '/',
        redirect: '/Dashboard'
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/About',
        name: 'About',
        component: About
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;