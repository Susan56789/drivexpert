import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    {
        path: '/',
        component: () => import('./components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/HomePage.vue'),
                meta: { breadcrumb: 'Home', title: 'Home' }
            },

        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes

});


router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'DrivExpert';
    next();
});


export default router;