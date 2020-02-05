export const state = () => ({
  products: []
})

export const mutations = {
  fill(state, data) {
    state.products = data
  },
  clear(state) {
    state.products = []
  }
}
