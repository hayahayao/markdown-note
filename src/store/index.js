import Vue from 'vue'
import Vuex from 'vuex'
import note from './note'
import { $read, $save, $delete, $keys } from '../plugins/storage'

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
        }
    },
    getters: {
        listType: (state) => state.listType,
        itemList: (state) => state.itemList,
    },
    mutations: {
        setType(state, value) {
            state.listType = value
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
        removeItem({ commit }, item) {
            commit('removeItem', item)
            $delete(item.id)
        },
        addItem({ commit }, item) {
            commit('addItem', item)
            $save(item)
        },
        loadList({ commit, dispatch }, type) {
            dispatch('setType', type)
            for (const key of $keys(type)) {
                commit('addItem', $read(key))
            }
        },
        clearList({ commit }) {
            commit('clearList')
        },
        saveNote() {
            $save(note)
        },
    },
})
