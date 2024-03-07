import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    {
        path: '/',
        component: () => import('./components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/HomePage.vue'),
                meta: { breadcrumb: 'Home' }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes

});


export default router;