import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home/HomePage.vue';
import Login from '@/views/login/LoginPage.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            isAuth: false
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            isAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthRoute = to.matched.some(record => record.meta.isAuth);

    // Если не авторизован редиректим в login
    if (isAuthRoute && !isUserSignedIn()) {
        return next('/login');
    }

    return next();
});

// Проверяем авторизован ли пользователь или нет
function isUserSignedIn() {
    const user = localStorage.getItem("auth");

    if (user !== null) {
        const isSignedIn = JSON.parse(user);
        return isSignedIn.isAuthenticated;
    }
    return false;
}

export default router;