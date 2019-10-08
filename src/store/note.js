export default {
    namespaced: true,
    state() {
        return {
            id: null,
            title: '',
            content: '',
            created: null,
            notebook: null,
            tags: [],
        }
    },
    getters: {
        id: state => state.id,
        title: state => state.title,
        content: state => state.content,
        created: state => state.created,
        notebook: state => state.notebook,
        tags: state => state.notebook,
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
        initNote({ commit }) {
            const time = Date.now()
            commit('id', `note: ${String(time)}`)
            commit('created', String(time))
            commit('title', '')
            commit('content', '')
        },
        updateNote({ commit }, { title, content, notebook, tags }) {
            if (title) commit('title', title)
            if (content) commit('content', content)
            if (notebook) commit('notebook', notebook)
            if (tags) commit('tags', tags)
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