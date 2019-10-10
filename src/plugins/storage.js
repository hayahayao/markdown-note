export default {
    install(Vue) {
        Vue.prototype.$read = $read
        Vue.prototype.$save = $save
        Vue.prototype.$delete = $delete
        Vue.prototype.$keys = $keys
    }
}

export function $read(id) {
    return JSON.parse(localStorage.getItem(id))
}

export function $save(item) {
    localStorage.setItem(item.id, JSON.stringify(item))
}

export function $delete(id) {
    localStorage.removeItem(id)
}

export function $keys(type) {
    let list = []
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(`${type}: `)) {
            list.push(localStorage.key(i))
        }
    }
    return list
}
