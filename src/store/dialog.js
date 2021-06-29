export default {
    namespaced: true,
    state: {
        status: false,
        component: '',
    },

    actions: {
        setStatus: ({ commit }, status) => {
            commit('setStatus', status)
        },
        setComponent: ({ commit }, component) => {
            commit('setComponent', component);
        }
    },
    mutations: {
        setStatus: (state, status) => {
            state.status = status;
        },
        setComponent: (state, component) => {
            state.component = component;
        }
    },
    getters: {
        status: state => state.status,
        component: state => state.component
    }
}