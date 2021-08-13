export const state = () => ({
  userData: null,
  isAuthenticated: null,
  currentPage: 0,
})

export const mutations = {
  updateCurrentPage(state, updatedPage) {
    state.currentPage = updatedPage
  },
  setUser(state, user) {
    state.userData = user
  },
  setItAuthenticated(state, jwt) {
    state.isAuthenticated = jwt
  },
  logout(state) {
    state.isAuthenticated = null
    state.userData = null
  }
}
