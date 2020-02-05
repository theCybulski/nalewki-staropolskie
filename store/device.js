export const state = () => ({
  isMobile: false,
  isSmall: false
})

export const mutations = {
  checkDevice(state, x) {
    const mobile = x.matchMedia('(max-width: 767px)')
    const small = x.matchMedia('(min-width: 768px) and (max-width: 1024px)')

    if (mobile.matches) {
      state.isMobile = true
      state.isSmall = false
    } else if (small.matches) {
      state.isMobile = false
      state.isSmall = true
    } else {
      state.isMobile = false
      state.isSmall = false
    }
  }
}
