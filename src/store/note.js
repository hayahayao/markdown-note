import db from '../modules/database'

export default {
    namespaced: true,
    state() {
        return {
            id: null,
            created: null,
            title: '',
            content: '',
            notebook: null, // {id, title}
            tags: [], // item: {id, title}
        }
    },
    getters: {
        id: state => state.id,
        created: state => state.created,
        title: state => state.title,
        content: state => state.content,
        notebook: state => state.notebook,
        tags: state => state.tags,
        note: state => {
            return {
                id: state.id,
                created: state.created,
                title: state.title,
                content: state.content,
                notebook: state.notebook,
                tags: state.tags,
            }
        },
    },
    mutations: {
        id(state, value) {
            state.id = value
        },
        created(state, value) {
            state.created = value
        },
        title(state, value) {
            state.title = value
        },
        content(state, value) {
            state.content = value
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
            await db.add('notes', getters.note)
        },
        async loadNote({ commit }, { id }) {
            const note = await db.read('notes', id)
            commit('id', note.id)
            commit('title', note.title)
            commit('content', note.content)
            commit('created', note.created)
            commit('notebook', note.notebook)
            commit('tags', note.tags)
        },
        async updateNote({ getters, commit, dispatch }, { title, content, notebook, tags }) {
            if (title !== undefined) commit('title', title)
            if (content !== undefined) commit('content', content)
            if (notebook !== undefined) {
                const oldNotebook = getters.notebook
                const newNotebook = notebook
                commit('notebook', notebook)

                // 删除oldNotebook中的notes信息
                if (oldNotebook) {
                    let currentNotebook = await db.read('notebooks', oldNotebook.id)
                    currentNotebook.notes.splice(currentNotebook.notes.findIndex(note => note.id === getters.id), 1)
                    dispatch('updateItem', {
                        type: 'notebooks',
                        item: currentNotebook
                    }, { root: true })
                }

                // 增加newNotebook中的notes信息
                let currentNotebook = await db.read('notebooks', newNotebook.id)
                if (!currentNotebook.notes.findIndex(note => note.id === getters.id)) {
                    currentNotebook.notes.push({
                        id: getters.id,
                        created: getters.created,
                        title: getters.title,
                    })
                }
                dispatch('updateItem', {
                    type: 'notebooks',
                    item: currentNotebook
                }, { root: true })
            }
            if (tags !== undefined) {
                const oldTags = getters.tags
                const newTags = tags
                commit('tags', tags)

                // 新增tag（newTags中有而oldTags中没有）
                for (const tag of newTags) {
                    if (!oldTags.find(item => item.id === tag.id)) {
                        let currentTag = await db.read('tags', tag.id)
                        currentTag.notes.push({
                            id: getters.id,
                            created: getters.created,
                            title: getters.title,
                        })
                        dispatch('updateItem', {
                            type: 'tags',
                            item: currentTag
                        }, { root: true })
                    }
                }
                // 删除tag（oldTags中有而newTags中没有）
                for (const tag of oldTags) {
                    if (!newTags.find(item => item.id === tag.id)) {
                        let currentTag = await db.read('tags', tag.id)
                        currentTag.notes.splice(currentTag.notes.findIndex(note => note.id === getters.id), 1)
                        dispatch('updateItem', {
                            type: 'tags',
                            item: currentTag
                        }, { root: true })
                    }
                }
            }
            await db.update('notes', getters.note)
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
