import { createStore } from "vuex"
import auth from "./modules/auth.js"
import user from "./modules/user.js"
import competenceAdmin from './modules/admin/competenceAdmin.js';

const store = createStore({
    modules: {
        auth,
        user,
        competence: competenceAdmin
    }
})

export default store