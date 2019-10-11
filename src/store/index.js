import Vue from 'vue'
import Vuex from 'vuex'
import note from './note'
import db from '../modules/database'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        note,
    },
    state() {
        return {
            listType: '',
            itemList: [], // item: {id, title}
            error: 0,
        }
    },
    getters: {
        listType: (state) => state.listType,
        itemList: (state) => state.itemList,
        error: (state) => state.error,
    },
    mutations: {
        setType(state, value) {
            state.listType = value
        },
        setError(state, value) {
            state.error = value
        },
        removeItem(state, { id }) {
            state.itemList = state.splice(state.itemList.findIndex(item => item.id === id), 1)
        },
        addItem(state, { id, title }) {
            state.itemList.push({
                id: id,
                title: title,
            })
        },
        clearList(state) {
            state.listType = null
        }
    },
    actions: {
        setType({ commit }, value) {
            commit('setType', value)
        },
        error({ commit }, value) {
            commit('setError', value)
        },
        async removeItem({ getters, commit }, item) {
            commit('removeItem', item)
            await db.delete(getters.listType, item.id)
        },
        async addItem({ getters, commit }, item) {
            commit('addItem', item)
            await db.add(getters.listType, item)
        },
        async loadList({ commit, dispatch }, type) {
            dispatch('setType', type)
            const list = await db.readAll(type)
            for (const item of list) {
                commit('addItem', item)
            }
        },
        clearList({ commit }) {
            commit('clearList')
        },
    },
})
