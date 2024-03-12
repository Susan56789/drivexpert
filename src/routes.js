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
            {
                path: '/careers',
                component: () => import('./components/CareersPage.vue'),
                meta: { breadcrumb: 'Careers', title: 'Careers' }
            },
            {
                path: '/faqs',
                component: () => import('./components/FaqsPage.vue'),
                meta: { breadcrumb: 'FAQs', title: 'FAQs' }
            },
            {
                path: '/sell-car',
                component: () => import('./components/SellCar.vue'),
                meta: { breadcrumb: 'Sell Your Car', title: 'Sell Your Car' }
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