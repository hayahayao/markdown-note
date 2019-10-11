import { openDB } from 'idb'

export default {
    dbPromise: {},
    async initDB(types) {
        this.dbPromise = await openDB('myDB', 1, {
            upgrade(db) {
                for (const type of types) {
                    if (!db.objectStoreNames.contains(type)) {
                        db.createObjectStore(type, { keyPath: 'id', })
                    }
                }
            }
        })
    },
    async add(type, item) {
        return (this.dbPromise).add(type, item)
    },
    async update(type, item) {
        return (this.dbPromise).put(type, item)
    },
    async read(type, id) {
        return (this.dbPromise).get(type, id)
    },
    async readAll(type) {
        return (this.dbPromise).getAll(type)
    },
    async delete(type, id) {
        return (this.dbPromise).delete(type, id)
    }
}
