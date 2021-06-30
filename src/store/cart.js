export default {
    namespaced: true,
    state: {
        carts: []
    },
    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },
        update: (state, payload) => {
            let idx = state.carts.indexOf(payload);
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            });
            if (payload.quantity <= 0) {
                state.carts.splice(idx, 1);
            }
        },
        set: (state, payload) => {
            state.carts = payload;
        }
    },
    actions: {
        add: ({ state, commit }, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id);
            if (!cartItem) {
                commit('insert', payload)
            } else {
                cartItem.quantity++;
                commit('update', cartItem)
            }
        },
        remove: ({ state, commit }, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id);
            cartItem.quantity--;
            commit('update', cartItem)
        }
    },
    getters: {
        carts: state => state.carts,
        count: (state) => {
            return state.carts.length;
        },
        totalPrice: (state) => {
            let total = 0;
            for (let item in state.carts) {
                total += state.carts[item].price;
                console.log(state.carts[item].price);
            }
            return total;
        },
        totalQuantity: (state) => {
            let quantity = 0;
            for (let i in state.carts) {
                quantity += state.carts[i].quantity;
            }
            return quantity;
        }
    }
}