<template>
  <div>
    <nuxt v-if="$store.state.isAuthenticated" />
    <Login v-else-if="loginSignup === 'login'" :action="login" :resetSignIn="() => setLoginSignup(null)" />
    <Signup v-else-if="loginSignup === 'signup'" :action="signup" :resetSignIn="() => setLoginSignup(null)" />
    <LoginSignup v-else :action="setLoginSignup" />
    <BottomNav v-if="$store.state.isAuthenticated" />
  </div>
</template>

<script>
import { authenticate, register } from '~/assets/js/authentication.js'

import Login from '~/components/Login/Login'
import Signup from '~/components/Login/Signup'
import LoginSignup from '~/components/Login/LoginSignup'
import BottomNav from '~/components/Navigation/BottomNav'

export default {
  components: {
    Login,
    Signup,
    LoginSignup,
    BottomNav
  },
  methods: {
    async authenticate(email, password) {
      await authenticate(this, email, password)
    },
    async register(email, password, username) {
      await register(this, email, password, username)
    },
    login(e) {
      e.preventDefault()

      this.$apolloHelpers.onLogout()
      this.$store.commit('logout')
      
      const email = e.target.elements[0].value 
      const password = e.target.elements[1].value 

      this.authenticate(email, password)
    },
    signup(e) {
      e.preventDefault()

      this.$apolloHelpers.onLogout()
      this.$store.commit('logout')

      const email = e.target.elements[0].value 
      const password = e.target.elements[1].value 
      const firstName = e.target.elements[2].value 
      const lastName = e.target.elements[3].value 
      const username = `${firstName} ${lastName}`

      this.register(email, password, username)
    },
    setLoginSignup(type) {
      this.loginSignup = type
    }
  },
  data() {
    return {
      loginSignup: null,
      navigation: [
        {
          uid: 'dashboard',
          label: 'Dashboard',
          icon: 'uploads/icons/navigation/dashboard.svg',
          iconSelected: 'uploads/icons/navigation/dashboard-selected.svg'
        },
        {
          uid: 'planning',
          label: 'Planning',
          icon: 'uploads/icons/navigation/planning.svg',
          iconSelected: 'uploads/icons/navigation/planning-selected.svg'
        },
        {
          uid: 'annuaire',
          label: 'Annuaire',
          icon: 'uploads/icons/navigation/annuaire.svg',
          iconSelected: 'uploads/icons/navigation/annuaire-selected.svg'
        },
        {
          uid: 'profil',
          label: 'Profil',
          icon: 'uploads/icons/navigation/profil.svg',
          iconSelected: 'uploads/icons/navigation/profil-selected.svg'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
html, body {
  color: $black;
}
</style>
