<template>
  <div class="body">
    <TitleH2
      data='Bienvenue !'
    />
    <Card
      :eyebrow="eyebrow"
      :text="text"
    />
    <PrimaryButton
      label='Oui, je découvre le tuto !'
      to='/onboarding'
    />
    <PrimaryButton
      label='Je gère déjà !'
      to='/dashboard'
      isSecondary
    />
  </div>
</template>

<script>
import TitleH2 from '~/components/Text/TitleH2'
import PrimaryButton from '~/components/Buttons/PrimaryButton'
import Card from '~/components/Cards/Card'

export default {
  data() {
    return {
      eyebrow: "Quelques mots sur l'app",
      text: "AP-HP Internes a été crée dans le but d’aider les internes en médecine dans leur quotidien. Gestion de ton planning, du planning de gardes du service, annuaire pour trouver les contacts facilement... Mais assez parlé ! <br><br>On commence ?"
    }
  },
  // mounted() {
  //   this.$router.push('/dashboard')
  // },
  layout: 'empty',
  components: {
    TitleH2,
    Card,
    PrimaryButton
  },
}
</script>

<style lang="scss" scoped>
.body {
  padding-top: $spacer-xxxl;
  padding: $spacer-m;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  height: 100vh;
}

.title-h2 {
  text-align: center;
  margin-top: $spacer-xxxl;
  margin-bottom: $spacer-xxl;
}

.card {
  margin-bottom: $spacer-l;
}

.primary-button {
  margin-bottom: $spacer-s;
}
</style>
