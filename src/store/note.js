import db from '../modules/database'

export default {
    namespaced: true,
    state() {
        return {
            id: null,
            title: '',
            content: '',
            created: null,
            favorited: false,
            notebook: null,
        }
    },
    getters: {
        id: state => state.id,
        title: state => state.title,
        content: state => state.content,
        created: state => state.created,
        favorited: state => state.favorited,
        notebook: state => state.notebook,
        note: state => {
            return {
                id: state.id,
                title: state.title,
                content: state.content,
                created: state.created,
                favorited: state.favorited,
                notebook: state.notebook
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
        favorited(state, value) {
            state.favorited = value
        },
        notebook(state, value) {
            state.notebook = value
        },
    },
    actions: {
        async initNote({ getters, commit }) {
            const time = Date.now()
            commit('id', `${String(time)}`)
            commit('created', String(time))
            await db.add('note', getters.note)
        },
        async updateNote({ getters, commit }, { title, content, favorited, notebook }) {
            if (title !== undefined) commit('title', title)
            if (content !== undefined) commit('content', content)
            if (favorited !== undefined) commit('favorited', favorited)
            if (notebook !== undefined) {
                commit('notebook', notebook)
                let storedNotebook = await db.read('notebook', notebook)
                if (!storedNotebook.notes.includes(getters.id)) {
                    storedNotebook.notes.push(getters.id)
                }
                await db.update('notebook', storedNotebook)
            }
            await db.update('note', getters.note)
        },
        clearNote({ commit }) {
            commit('id', null)
            commit('title', '')
            commit('content', '')
            commit('favorited', false)
            commit('created', null)
            commit('notebook', null)
        },
    },
}
