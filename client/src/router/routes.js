
const routes = [
    {
        path: '/',
        component: () => import('pages/Index.vue')
    },

    {
        path: '/register',
        component: ()=>import('pages/Register.vue')
    },

    {
        path: '/login',
        component: ()=>import('pages/Login.vue')
    },

    {
        path: '/todo-submit',
        component: ()=>import('pages/TodoSubmission')
    },

    {
        path: '/admin',
        component: ()=>import('pages/Admin')
    },

    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
