import Vue from 'vue'
import Vuex from 'vuex'
import note from './note'
import db from '../modules/database'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        note,
    },
    state() {
        return {
            notebooks: [], // item: {id, title, notes: {id}}
            tags: [], // item: {id, title, notes: {id}}
            notes: [], // item: {id, created, title, notebook, tags}
        }
    },
    getters: {
        notebooks: (state) => state.notebooks,
        tags: (state) => state.tags,
        notes: (state) => state.notes,
    },
    mutations: {
        removeItem(state, { type, id }) {
            const itemIndex = state[type].findIndex(i => i.id === id)
            state[type].splice(itemIndex, 1)
        },
        addItem(state, { type, item }) {
            state[type].push(item)
        },
        updateItem(state, { type, item }) {
            const itemIndex = state[type].findIndex(i => i.id === item.id)
            state[type][itemIndex] = item
        },
        clearList(state, { type }) {
            state[type] = []
        },
    },
    actions: {
        async removeItem({ commit, dispatch }, { type, item }) {
            commit('removeItem', {
                type: type,
                id: item.id,
            })
            switch (type) {
                case 'notes': {
                    dispatch('note/deleteNote', {
                        id: item.id,
                    })
                    break
                }
                case 'notebooks': {
                    // 删除其对应的note中的信息
                    const notebook = await db.read('notebooks', item.id)
                    const notes = notebook.notes
                    for (const note of notes) {
                        let currentNote = await db.read('notes', note.id)
                        currentNote.notebook = null
                        await db.update('notes', currentNote)
                    }
                    // 删除本体
                    await db.delete('notebooks', item.id)
                    break
                }
                case 'tags': {
                    const tags = await db.read('tags', item.id)
                    const notes = tags.notes
                    for (const note of notes) {
                        let currentNote = await db.read('notes', note.id)
                        currentNote.tags.splice(currentNote.tags.findIndex(tag => tag.id === item.id), 1)
                        await db.update('notes', currentNote)
                    }
                    await db.delete('tags', item.id)
                    break
                }
                default: {
                    break
                }
            }
        },
        async addItem({ commit }, { type, item }) {
            commit('addItem', {
                type: type,
                item: item
            })
            await db.add(type, item)
        },
        async updateItem({ commit }, { type, item }) {
            commit('updateItem', {
                type: type,
                item: item
            })
            await db.update(type, item)
        },
        async loadList({ commit }, { type }) {
            const list = await db.readAll(type)
            for (const storedItem of list) {
                let item = {}
                if (type === 'notes') {
                    // no content
                    item = {
                        id: storedItem.id,
                        created: storedItem.created,
                        title: storedItem.title,
                        notebook: storedItem.notebook,
                        tags: storedItem.tags
                    }
                } else {
                    item = storedItem
                }
                commit('addItem', {
                    type: type,
                    item: item
                })
            }
        },
        async loadSpecialNoteList({ commit }, { type, id }) {
            // 根据book的id读取book中保存的note
            const book = await db.read(type, id)
            for (const note of book.notes) {
                const storedNote = await db.read('notes', note.id)
                commit('addItem', {
                    type: 'notes',
                    item: {
                        id: storedNote.id,
                        created: storedNote.created,
                        title: storedNote.title,
                        notebook: storedNote.notebook,
                        tags: storedNote.tags
                    }
                })
            }
        },
        clearList({ commit }, { type }) {
            commit('clearList', {
                type: type
            })
        },
    },
})
