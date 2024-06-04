import { createRouter, createWebHistory } from 'vue-router';

// Mock function to check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('token'); // Check if token exists in localStorage
}

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
                path: '/cars',
                component: () => import('./components/shop/MainPage.vue'),
                meta: { breadcrumb: 'Cars', title: 'Cars' }
            },
            {
                path: '/sell-car',
                component: () => import('./components/user/SellCar.vue'),
                meta: { breadcrumb: 'Sell Your Car', title: 'Sell Your Car', requiresAuth: true }
            },
            {
                path: '/dashboard',
                component: () => import('./components/user/UserDashboard.vue'),
                meta: { breadcrumb: 'Dashboard', title: 'Dashboard', requiresAuth: true }
            },
            {
                path: '/profile',
                component: () => import('./components/user/UserProfile.vue'),
                meta: { breadcrumb: 'Profile', title: 'Profile', requiresAuth: true }
            },
            {
                path: '/login',
                component: () => import('./components/user/UserLogin.vue'),
                meta: { title: 'Login' }
            },
            {
                path: '/register',
                component: () => import('./components/user/UserRegister.vue'),
                meta: { title: 'Register' }
            },
            {
                path: '/reset-password',
                component: () => import('./components/user/PasswordReset.vue'),
                meta: { title: 'Reset Password' }
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

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
        // Redirect to login page if not authenticated
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
