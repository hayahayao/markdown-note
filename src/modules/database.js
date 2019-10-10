export default {
    db: {},
    transaction: {},
    startTransaction(type) {
        if (this.db.length) {
            this.transaction = this.db.transaction(type, 'readwrite')
            // eslint-disable-next-line
            this.transaction.onerror = e => console.dir(e)
        }
    },
    async initDB(types) {
        let request = window.indexedDB.open('myDB')
        // eslint-disable-next-line
        request.onerror = e => console.log(e.currentTarget.error.message)
        request.onsuccess = e => {
            this.db = e.target.result
        }
        request.onupgradeneeded = e => {
            let thisDB = e.target.result
            for (const type of types) {
                if (!thisDB.objectStoreNames.contains(type)) {
                    thisDB.createObjectStore(type, { keyPath: 'id' })
                }
            }
        }
    },
    deleteDB() {
        indexedDB.deleteDatabase('myDB')
    },
    add(type, item, cb) {
        this.startTransaction(type)
        let objectStore = this.transaction.objectStore(type)
        let request = objectStore.add(item)
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                type: type,
                item: item,
            })
        }
        request.onerror = (e) => {
            if (cb) cb({
                error: e.message
            })
        }
    },
    update(type, item, cb) {
        this.startTransaction(type)
        let objectStore = this.transaction.objectStore(type)
        let request = objectStore.put(item)
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                type: type,
                data: item,
            })
        }
        request.onerror = (e) => {
            if (cb) cb({
                error: e.message
            })
        }
    },
    read(type, id, cb) {
        this.startTransaction(type)
        let objectStore = this.transaction.objectStore(type)
        let request = objectStore.get(id)
        request.onsuccess = (e) => {
            if (cb) cb({
                error: 0,
                type: type,
                data: {
                    id: id,
                    ...e.target.result
                }
            })
        }
        request.onerror = (e) => {
            if (cb) cb({
                error: e.message
            })
        }
    },
    readAll(type, cb) {
        this.startTransaction(type)
        let objectStore = this.transaction.objectStore(type)
        let datalist = []
        let request = objectStore.openCursor(IDBKeyRange.lowerBound(0))
        request.onsuccess = (e) => {
            let cursor = e.target.result
            if (!cursor && cb) {
                cb({
                    error: 0,
                    type: type,
                    data: datalist,
                })
                return
            }
            datalist.push({
                id: cursor.key,
                ...cursor.value
            })
            cursor.continue()
        }
        request.onerror = (e) => {
            if (cb) cb({
                error: e.message
            })
        }
    },
    delete(type, id, cb) {
        this.startTransaction(type)
        let objectStore = this.transaction.objectStore(type)
        let request = objectStore.delete(id)
        request.onsuccess = () => {
            if (cb) cb({
                error: 0,
                type: type,
                data: id,
            })
        }
        request.onerror = (e) => {
            if (cb) cb({
                error: e.message
            })
        }
    },
}
