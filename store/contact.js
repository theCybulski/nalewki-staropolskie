export const state = () => ({
  contact: {
    titlePl: 'Kontakt',
    titleEn: 'Contact',
    txtPl: '',
    txtEn: '',
    tel: '',
    tel2: '',
    mail: '',
    address: '',
    facebook: '',
    instagram: ''
  }
})

export const mutations = {
  fill(state, data) {
    state.contact = data
  },
  clear(state) {
    state.contact = []
  }
}
