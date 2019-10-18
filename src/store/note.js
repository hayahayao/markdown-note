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
        initNote({ commit }) {
            const time = Date.now()
            commit('id', String(time))
            commit('created', time)
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
        updateNote({ commit }, { title, content, notebook, tags }) {
            if (title !== undefined) commit('title', title)
            if (content !== undefined) commit('content', content)
            if (notebook !== undefined) commit('notebook', notebook)
            if (tags !== undefined) commit('tags', tags)
        },
        clearNote({ commit }) {
            commit('id', null)
            commit('title', '')
            commit('content', '')
            commit('created', null)
            commit('notebook', null)
            commit('tags', [])
        },
        async saveNote({ getters }) {
            const oldNote = await db.read('notes', getters.id)

            // 删除oldNotebook中的notes信息
            const oldNotebook = oldNote.notebook
            if (oldNotebook) {
                let currentNotebook = await db.read('notebooks', oldNotebook.id)
                currentNotebook.notes.splice(currentNotebook.notes.findIndex(note => note.id === getters.id), 1)
                await db.update('notebooks', currentNotebook)
            }
            // 增加newNotebook中的notes信息
            const newNotebook = getters.notebook
            if (newNotebook) {
                let currentNotebook = await db.read('notebooks', newNotebook.id)
                if (!currentNotebook.notes.find(note => note.id === getters.id)) {
                    currentNotebook.notes.push({
                        id: getters.id
                    })
                }
                await db.update('notebooks', currentNotebook)
            }

            const oldTags = oldNote.tags
            const newTags = getters.tags
            // 新增tag（newTags中有而oldTags中没有）
            for (const tag of newTags) {
                if (!oldTags.find(item => item.id === tag.id)) {
                    let currentTag = await db.read('tags', tag.id)
                    currentTag.notes.push({
                        id: getters.id
                    })
                    await db.update('tags', currentTag)
                }
            }
            // 删除tag（oldTags中有而newTags中没有）
            for (const tag of oldTags) {
                if (!newTags.find(item => item.id === tag.id)) {
                    let currentTag = await db.read('tags', tag.id)
                    currentTag.notes.splice(currentTag.notes.findIndex(note => note.id === getters.id), 1)
                    await db.update('tags', currentTag)
                }
            }

            await db.update('notes', getters.note)
        },
        async deleteNote({ getters, dispatch }, { id }) {
            await dispatch('loadNote', {
                id: id,
            })

            // 删除db中对应notebook中保存的note信息
            const notebook = getters.notebook
            if (notebook) {
                let currentNotebook = await db.read('notebooks', notebook.id)
                currentNotebook.notes.splice(currentNotebook.notes.findIndex(note => note.id === getters.id), 1)
                await db.update('notebooks', currentNotebook)
            }

            // 删除db中对应tags中保存的note信息
            const tags = getters.tags
            if (tags.length) {
                for (const tag of tags) {
                    let currentTag = await db.read('tags', tag.id)
                    currentTag.notes.splice(currentTag.notes.findIndex(note => note.id === getters.id), 1)
                    await db.update('tags', currentTag)
                }
            }
            dispatch('clearNote')
            await db.delete('notes', id)
        }
    },
}
