import db from '../modules/database'

export default {
    namespaced: true,
    state() {
        return {
            id: null,
            title: '',
            content: '',
            created: null,
            notebook: '',
            tags: [],
        }
    },
    getters: {
        id: state => state.id,
        title: state => state.title,
        content: state => state.content,
        created: state => state.created,
        notebook: state => state.notebook,
        tags: state => state.tags,
        note: state => {
            return {
                id: state.id,
                title: state.title,
                content: state.content,
                created: state.created,
                notebook: state.notebook,
                tags: state.tags,
            }
        },
    },
    mutations: {
        id(state, value) {
            state.id = value
        },
        title(state, value) {
            state.title = value
        },
        content(state, value) {
            state.content = value
        },
        created(state, value) {
            state.created = value
        },
        notebook(state, value) {
            state.notebook = value
        },
        tags(state, value) {
            state.tags = value
        },
    },
    actions: {
        async initNote({ getters, commit }) {
            const time = Date.now()
            commit('id', String(time))
            commit('created', time)
            await db.add('note', getters.note)
        },
        setNote({ commit }, { id, title, content, created, notebook, tags }) {
            commit('id', id)
            commit('title', title)
            commit('content', content)
            commit('created', created)
            commit('notebook', notebook)
            commit('tags', tags)
        },
        async loadNote({ dispatch }, id) {
            const note = await db.read('note', id)
            dispatch('setNote', note)
        },
        async updateNote({ getters, commit }, { title, content, notebook, tags }) {
            if (title !== undefined) commit('title', title)
            if (content !== undefined) commit('content', content)
            if (notebook !== undefined) {
                commit('notebook', notebook)
                let storedNotebook = await db.read('notebook', notebook)
                if (!storedNotebook.notes.includes(getters.id)) {
                    storedNotebook.notes.push(getters.id)
                }
                await db.update('notebook', storedNotebook)
            }
            if (tags !== undefined) commit('tags', tags)
            await db.update('note', getters.note)
        },
        clearNote({ commit }) {
            commit('id', null)
            commit('title', '')
            commit('content', '')
            commit('created', null)
            commit('notebook', null)
            commit('tags', [])
        },
    },
}
