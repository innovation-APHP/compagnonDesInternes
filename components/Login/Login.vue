<template>
  <div class="container">
    <PageBar
      title="Se connecter"
      :precAction="resetSignIn"
    />
    <TitleH4 data="Veuillez renseigner vos identifiants."/>
    <form method="post" action="#" class="login-form" @submit="action">
      <StandardInput required="true" name="username" type="email" label="Mail AP-HP" placeholder="prenom.nom@aphp.fr"/>
      <StandardInput required="true" name="password" type="password" label="Mot de passe" placeholder="••••••••••"/>
      <div class="login-form__actions">
        <PrimaryButton type="submit" label="Se connecter"/>
        <PrimaryButton type="submit" label="Mot de passe oublié ?" isTertiary/>
      </div>
    </form>
  </div>
</template>

<script>
import PageBar from '~/components/Navigation/PageBar'
import TitleH4 from '~/components/Text/TitleH4.vue'
import StandardInput from '~/components/Inputs/StandardInput.vue'
import PrimaryButton from '~/components/Buttons/PrimaryButton.vue'

export default {
  components: {
    TitleH4,
    StandardInput,
    PrimaryButton,
    PageBar
  },
  props: {
    action: null,
    resetSignIn: null
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: $spacer-xxxl;
}
.login-form {
  overflow: hidden;

  &__actions {
    margin-top: $spacer-xxxl;

    .primary-button:first-child {
      margin-bottom: $spacer-s;
    }
  }
}
.title-h4 {
  text-align: center;
  margin-bottom: $spacer-l;
}
</style>