import { $read, $save } from "../plugins/storage"

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
        updateNote({ getters, commit }, { title, content, favorited, notebook }) {
            if (title !== undefined) commit('title', title)
            if (content !== undefined) commit('content', content)
            if (favorited !== undefined) commit('favorited', favorited)
            if (notebook !== undefined) {
                commit('notebook', notebook)
                let storedNotebook = $read(notebook)
                if (!storedNotebook.notes.includes(getters.id)) {
                    storedNotebook.notes.push(getters.id)
                }
                $save(storedNotebook)
            }
            $save({
                id: getters.id,
                title: getters.title,
                content: getters.content,
                created: getters.created,
                favorited: getters.favorited,
                notebook: getters.notebook,
            })
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