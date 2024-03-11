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
            {
                path: '/about',
                component: () => import('./components/AboutUs.vue'),
                meta: { breadcrumb: 'About-Us', title: 'About-Us' }
            },
            {
                path: '/contact',
                component: () => import('./components/ContactUs.vue'),
                meta: { breadcrumb: 'Contact-Us', title: 'Contact-Us' }
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