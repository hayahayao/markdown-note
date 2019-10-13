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
            notebooks: [], // item: {id, title, notes: {id, created, title}}
            tags: [], // item: {id, title, notes: {id, created, title}}
            notes: [], // item: {id, created, title, content, notebook, tags}
        }
    },
    getters: {
        notebooks: (state) => state.notebooks,
        tags: (state) => state.tags,
        notes: (state) => state.notes,
    },
    mutations: {
        removeItem(state, { type, id }) {
            state[type] = state[type].splice(state[type].findIndex(item => item.id === id), 1)
        },
        addItem(state, { type, item }) {
            state[type].push(item)
        },
        updateItem(state, { type, item }) {
            let itemIndex = state[type].findIndex(item => item.id === item.id)
            state[type][itemIndex] = item
        },
        clearList(state, { type }) {
            state[type] = []
        },
    },
    actions: {
        async removeItem({ commit }, { type, item }) {
            commit('removeItem', {
                type: type,
                id: item.id
            })
            await db.delete(type, item.id)
        },
        async addItem({ commit }, { type, item }) {
            // eslint-disable-next-line
            console.log(item)
            commit('addItem', {
                type: type,
                item: item
            })
            await db.add(type, item)
        },
        async updateItem({ commit }, { type, item }) {
            commit('updateItem', {
                type: type,
                item: item
            })
            await db.update(type, item)
        },
        async loadList({ commit }, { type }) {
            const list = await db.readAll(type)
            for (const item of list) {
                commit('addItem', {
                    type: type,
                    item: item
                })
            }
        },
        clearList({ commit }, { type }) {
            commit('clearList', {
                type: type
            })
        },
    },
})
