import Vue from 'vue'
import Vuex from 'vuex'
import note from './note'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        note,
    },
    state() {
        return {
            notelist: [], // item: {id, title}
        }
    },
    getters: {
        notelist: (state) => state.notelist,
    },
    mutations: {
        removeNote(state, { id }) {
            state.notelist = state.splice(state.notelist.findIndex(note => note.id === id), 1)
        },
        addNote(state, { id, title }) {
            state.notelist.push({
                id: id,
                title: title,
            })
        },
    },
    actions: {
        removeNote({ commit }, note) {
            commit('removeNote', note)
        },
        addNote({ commit }, note) {
            commit('addNote', note)
        },
    },
})
