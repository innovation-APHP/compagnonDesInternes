<template>
  <div class="container">
    <img class="logo" src="/uploads/logos/aphp-rounded.svg" alt="">
    <TitleH2
      data='Bienvenue sur <br> AP-HP internes !'
    />
    <PrimaryButton
      label='Je me connecte'
      :action="() => action('login')"
    />
    <PrimaryButton
      label="Je n'ai pas encore de compte"
      :action="() => action('signup')"
      isSecondary
    />
  </div>
</template>

<script>
import TitleH2 from '~/components/Text/TitleH2'
import PrimaryButton from '~/components/Buttons/PrimaryButton'
export default {
  data() {
    return {
      eyebrow: "Quelques mots sur l'app",
    }
  },
  props: {
    action: null
  },
  layout: 'empty',
  components: {
    TitleH2,
    PrimaryButton
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: $spacer-xxxl;
  padding: $spacer-m;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  height: 100vh;
}

.logo {
  margin-top: $spacer-xxxl;
}

.title-h2 {
  text-align: center;
  margin-top: $spacer-xxl;
  margin-bottom: $spacer-xxxl;
}

.card {
  margin-bottom: $spacer-l;
}

.primary-button {
  margin-bottom: $spacer-s;
}
</style>
