import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('@/components/HomePage.vue'),
                meta: { breadcrumb: 'Home', title: 'Home' }
            },
            {
                path: '/about',
                component: () => import('@/components/AboutUs.vue'),
                meta: { breadcrumb: 'About-Us', title: 'About-Us' }
            },
            {
                path: '/contact',
                component: () => import('@/components/ContactUs.vue'),
                meta: { breadcrumb: 'Contact-Us', title: 'Contact-Us' }
            },
            {
                path: '/careers',
                component: () => import('@/components/CareersPage.vue'),
                meta: { breadcrumb: 'Careers', title: 'Careers' }
            },
            {
                path: '/faqs',
                component: () => import('@/components/FaqsPage.vue'),
                meta: { breadcrumb: 'FAQs', title: 'FAQs' }
            },
            {
                path: '/cars',
                component: () => import('@/components/shop/MainPage.vue'),
                meta: { breadcrumb: 'Cars', title: 'Cars' }
            },
            {
                path: '/cars/:id',
                name: 'CarDetails',
                component: () => import('@/components/shop/CarDetails.vue'),
                meta: { breadcrumb: 'CarDetails', title: 'CarDetails' },
                props: true
            },
            {
                path: '/login',
                component: () => import('@/components/user/UserLogin.vue'),
                meta: { breadcrumb: 'Login', title: 'Login' }
            },
            {
                path: '/register',
                component: () => import('@/components/user/UserRegister.vue'),
                meta: { breadcrumb: 'Register', title: 'Register' }
            },
            {
                path: '/reset-password',
                component: () => import('@/components/user/PasswordReset.vue'),
                meta: { breadcrumb: 'Reset Password', title: 'Reset Password' }
            },
            {
                path: '/dashboard',
                component: () => import('@/components/user/UserDashboard.vue'),
                meta: { breadcrumb: 'Dashboard', title: 'Dashboard' },
                children: [
                    {
                        path: '',
                        component: () => import('@/components/user/UserProfile.vue'),
                        meta: { breadcrumb: 'Profile', title: 'Profile' }
                    },
                    {
                        path: 'sell-car',
                        component: () => import('@/components/user/SellCar.vue'),
                        meta: { breadcrumb: 'Sell Your Car', title: 'Sell Your Car' }
                    },
                    {
                        path: 'cars-sold',
                        component: () => import('@/components/user/CarsSold.vue'),
                        meta: { breadcrumb: 'Cars Sold', title: 'Cars Sold' }
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'DrivExpert';
    next();
});

export default router;
