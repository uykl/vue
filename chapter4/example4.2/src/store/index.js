import { createStore } from 'vuex'

const store = createStore({
    state: {
        count: 8
    },
    getters: {
        tenTimes: (state) => {
            return state.count * 10
        }
    }
})

export default store