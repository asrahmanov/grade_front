import { createWebHistory, createRouter } from 'vue-router'
import store from '../store/store.js'
import authPage from '../components/pages/authPage.vue'
import mainPage from '../components/pages/mainPage.vue'
import adminPage from '../components/pages/adminPage.vue'
import personalCompetenciesPage from '../components/pages/personalCompetenciesPage.vue'
import competencePage from "../components/pages/competencePage.vue";
import jobsAdminPage from "../components/pages/jobsAdminPage.vue";
import myTeam from '../components/pages/myTeam.vue'
import progressPage from '../components/pages/progressPage.vue'

const routes = [
    {
        path: '/auth',
        name: 'authPage',
        component: authPage
    },
    {
        path: '/',
        name: 'mainPage',
        component: mainPage
    },
    {
        path: '/admin/progress-page',
        name: 'progressPage',
        component: progressPage,
        beforeEnter: async (to, from) => {
            return await checkAdmin(to, from)
        }
    },
    {
        path: '/personal-competencies',
        name: 'personalCompetenciesPage',
        component: personalCompetenciesPage
    },
    {
        path: '/my-team',
        name: 'myTeam',
        component: myTeam
    },
    {
        path: '/admin',
        name: 'adminPage',
        component: adminPage,
        beforeEnter: async (to, from) => {
            return await checkAdmin(to, from)
        },
    },
    {
        path: '/admin/competence',
        name: 'competencePage',
        component: competencePage,
        beforeEnter: async (to, from) => {
            return await checkAdmin(to, from)
        }
    },
    {
        path: '/admin/jobsAdminPage',
        name: 'jobsAdminPage',
        component: jobsAdminPage,
        beforeEnter: async (to, from) => {
            return await checkAdmin(to, from)
        }
    }
]

async function checkAdmin(to, from) {
    const authToken = store.getters.getAuthToken
    await store.dispatch('fetchUser', { authToken })
    const user = store.getters.getUser
    if (user.rights !== 'admin') {
        return { name: from.name }
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    if (!$cookies.get('authToken') && to.name !== 'authPage') {
        return { name: 'authPage' }
    } else if ($cookies.get('authToken') && to.name === 'authPage') {
        return { name: 'mainPage' }
    }
})

export default router