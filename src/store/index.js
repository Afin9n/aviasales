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
        setSort: ({commit}, sotrBy) => {
            commit('setSort', sotrBy)
        },
        setFilters: ({commit}, filters) => {
            commit('setSort', filters)
        },
    },
    mutations: {
        setSort (state, sortBy) {
            state.sortBy = sortBy
        },
        setFilters (state, filters) {
            console.log(1);
            state.filters = filters
        },
    },
    getters: {
        sortBy: (state) => state.sortBy,
        filters: (state) => state.filters,
    }
})