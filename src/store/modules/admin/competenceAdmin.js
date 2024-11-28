import axios from "axios"
import VueCookies from "vue-cookies"

export default {
    actions: {
        async fetchCompetenceData({ commit }) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/getList';
                let response = await axios({
                    method: 'GET',
                    url,
                    headers: { Authorization: `Bearer ${VueCookies.get('authToken')}` }
                });
                commit('setCompetenceData', response.data);
            } catch (e) {
                console.error(`Ошибка в fetchCompetenceData:`, e.message);
            }
        },
        async fetchCreateGrade(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/create'
                return await axios({
                    method: 'POST',
                    url,
                    data: {
                        title: payload
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
            } catch (e) {
                console.log(`Ошибка в fetchCreateGrade:`, e.message)
            }
        },
        async fetchDeleteGrade(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/delete'
                let response = await axios({
                    method: 'DELETE',
                    url,
                    data: {
                        id: payload,
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
                await context.dispatch('fetchCompetenceData')
            } catch (e) {
                console.log(`Ошибка в fetchDeleteGrade:`, e.message)
            }
        },
        async fetchUpdateGrade(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/update'
                let response = await axios({
                    method: 'POST',
                    url,
                    data: {
                        id: payload.id,
                        title: payload.title,
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
                await context.dispatch('fetchCompetenceData')
            } catch (e) {

            }
        },
        async fetchCreateGradeItem(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/item/create'
                let response = await axios({
                    method: 'POST',
                    url,
                    data: {
                        'title': payload.title,
                        'grade_parent_id': payload.id
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
                await context.dispatch('fetchGradeItems', { id: payload.id })
            } catch (e) {
                console.log(`Ошибка в fetchCreateGradeItem:`, e.message)
            }
        },
        async fetchDeleteGradeItem(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/item/delete'
                let response = await axios({
                    method: 'DELETE',
                    url,
                    data: {
                        id: payload.id
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
                await context.dispatch('fetchGradeItems', { id: payload.parentId })
            } catch (e) {
                console.log(`Ошибка в fetchDeleteGradeItem:`, e.message)
            }
        },
        async fetchUpdateGradeItem(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/item/update'
                let response = await axios({
                    method: 'POST',
                    url,
                    data: {
                        id: payload.id,
                        title: payload.title,
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
                await context.dispatch('fetchGradeItems', { id: payload.parentId })
                return response;
            } catch (e) {
                console.log(`Ошибка в fetchUpdateGradeItem:`, e.message)
            }
        },
        async fetchGradeItems(context, payload) {
            try {
                let url = import.meta.env.VITE_API_GRADE + '/api/grade/item/getByParent'
                let response = await axios({
                    methods: 'GET',
                    url,
                    params: {
                        'grade_parent_id': payload.id,
                    },
                    headers: {Authorization: `Bearer ${VueCookies.get('authToken')}`}
                })
                response = response.data.data
                context.commit('setGradeItems', {
                    parentId: payload.id,
                    data: response
                })
            } catch (e) {
                console.log(`Ошибка в fetchGradeItems`, e.message)
            }
        }
    },
    state:{
        competenceData: [],
        gradeItems: {},
    },
    mutations: {
        setCompetenceData(state, payload) {
            state.competenceData = payload.data;
        },
        setGradeItems(state, payload) {
            state.gradeItems[payload.parentId] = payload.data
        }
    },
    getters: {
        getCompetences(state) {
            return state.competenceData
        },
        getGradeItems(state) {
            return state.gradeItems
        }
    }
}
