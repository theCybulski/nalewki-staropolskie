export const state = () => ({
  awards: []
})

export const mutations = {
  fill(state, data) {
    state.awards = data
  },
  clear(state) {
    state.awards = []
  }
}
