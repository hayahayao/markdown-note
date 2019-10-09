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
        initNote({ commit }) {
            const time = Date.now()
            commit('id', `note: ${String(time)}`)
            commit('created', String(time))
        },
        updateNote({ commit }, { title, content, favorited, notebook }) {
            if (title) commit('title', title)
            if (content) commit('content', content)
            if (favorited) commit('favorited', favorited)
            if (notebook) commit('notebook', notebook)
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