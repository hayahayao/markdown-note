import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state() {
        return {
            note: null,
        }
    },
    getters: {
        note: state => state.note,
        noteTitle: (state, getters) => {
            const note = getters.note
            if (note) {
                return note.title
            }
        },
        noteContent: (state, getters) => { // 笔记的markdown格式内容
            const note = getters.note
            if (note) {
                return note.content
            }
        },
        noteCreated: (state, getters) => { // 笔记创建的日期
            const note = getters.note
            if (note) {
                return note.created
            }
        },
        noteNotebook: (state, getters) => {
            const note = getters.note
            if (note) {
                return note.notebook
            }
        },
        noteTags: (state, getters) => {
            const note = getters.note
            if (note) {
                return note.tags
            }
        },
    },
    mutations: {
        note(state, value) {
            state.note = value
        },
        updateNote(state, value) {
            Object.assign(state.note, value)
        },
    },
    actions: {
        clearNote({ commit }) {
            commit('note', null)
        },
        createNote({ commit }) {
            // 默认笔记
            const time = Date.now()
            commit('note', {
                id: String(time),
                title: '',
                content: '',
                created: time,
                notebook: null,
                tags: null,
            })
        },
        updateNote({ commit }, note) {
            commit('updateNote', note)
        },
    }
})
