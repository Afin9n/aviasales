import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sortBy: 'ask-price',
        filters: [
            {
                name: 'Без пересадок',
                value: true,
                key: 0,
            },
            {
                name: '1 пересадка',
                value: true,
                key: 1,
            },
            {
                name: '2 пересадки',
                value: true,
                key: 2,
            },
            {
                name: '3 пересадки',
                value: true,
                key: 3,
            }
        ]
    },
    actions: {
        setSort: ({commit}, sortBy) => {
            commit('setSort', sortBy)
        },
        setFilters: ({commit}, filters) => {
            commit('setFilters', filters)
        },
    },
    mutations: {
        setSort (state, sortBy) {
            state.sortBy = sortBy
        },
        setFilters (state, filters) {
            state.filters = filters
        },
    },
    getters: {
        sortBy: (state) => state.sortBy,
        filters: (state) => state.filters,
    }
})
