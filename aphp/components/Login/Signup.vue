<template>
  <div class="container">
    <PageBar
      title="Créer un compte"
      :precAction="resetSignIn"
    />
    <form class="body" method="post" action="#" @submit="e => action(e)">
      <div class="slider">
        <div 
          class="slider__slide"
          v-for="(slide, index) in slides"
          :key="index"
          :class="{'isLeft': index < currentSlide, 'isRight': index > currentSlide}"
        >
          <TitleH4
            :data="slide.title"
          />
          <StandardInput 
            v-for="(input, index) in slide.inputs" 
            :key="index" 
            :required="slide.required" 
            :name="input.name" 
            :type="input.type" 
            :label="input.label" 
            :placeholder="input.placeholder" 
            :content="input.content"
            v-model="params[input.vModelKey]"
          />
          <TextP2
            v-if="slide.help"
            :data="slide.help"
          />
        </div>
      </div>
      <PrimaryButton
        :label="isLastSlide() ? 'S\'inscrire' : 'Suivant'"
        :action="isLastSlide() ? null : () => currentSlide++"
        :type="isLastSlide() ? 'submit' : null"
      />
      <PrimaryButton
        label="Retour"
        :action="currentSlide == 0 ? () => {} : () => currentSlide--"
        :isDisabled="currentSlide == 0 ? true : false"
        isSecondary
      />
    </form>
  </div>
</template>
<script>
import PageBar from '~/components/Navigation/PageBar'
import StandardInput from '~/components/Inputs/StandardInput'
import PrimaryButton from '~/components/Buttons/PrimaryButton'
import TitleH4 from '~/components/Text/TitleH4'
import TextP2 from '~/components/Text/TextP2'

export default {
  layout: 'empty',
  computed: {
    slides() { 
      return [
        {
          title: 'Veuillez renseigner votre email AP-HP.',
          inputs: [
            {
              required: true,
              name: 'username',
              type: 'email',
              label: 'Email',
              placeholder: 'prenom.nom@aphp.fr',
              vModelKey: 'email'
            }
          ],
          help: "Pour recevoir vos identifiants AP-HP, veuillez envoyer un email à <a href='mailto:contact@aphp.fr'>contact@aphp.fr</a>"
        },
        {
          title: 'Veuillez créer votre mot de passe.',
          inputs: [
            {
              required: true,
              name: 'password',
              type: 'password',
              label: 'Mot de passe',
              placeholder: '••••••••••',
              vModelKey: 'password'
            }
          ],
        },
        {
          title: 'Veuillez confirmer ou modifier votre nom et prénom associés à ce compte.',
          inputs: [
            {
              required: true,
              name: 'firstname',
              type: 'text',
              label: 'Prénom',
              content: this.getFullName(this.params.email).firstname,
              vModelKey: 'firstname'
            },
            {
              required: true,
              name: 'lastname',
              type: 'text',
              label: 'Nom',
              content: this.getFullName(this.params.email).lastname,
              vModelKey: 'lastname'
            },
          ],
        },
      ]
    }
  },
  props: {
    resetSignIn: null,
    action: null
  },
  data() {
    return {
      currentSlide: 0,
      params: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
      }
    }
  },
  components: {
    PageBar,
    StandardInput,
    TitleH4,
    TextP2,
    PrimaryButton
  },
  methods: {
    getFullName(email) {

      const _firstname = email.split('@')[0].split('.')[0]
      const _lastname = email.split('@')[0].split('.')[1]

      return {
        firstname: _firstname ? this.capitalize(_firstname) : '',
        lastname: _lastname ? this.capitalize(_lastname) : '',
      }
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    isLastSlide() {
      return this.currentSlide == this.slides.length - 1
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-top: $spacer-xxxl;
  padding-bottom: $spacer-m;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  height: 100vh;
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.title-h4 {
  margin-bottom: $spacer-l;
  text-align: center;
}
.text-p2 {
  margin-top: $spacer-xl;
  text-align: center;
}
.primary-button {
  margin: 0 $spacer-m;
  margin-top: $spacer-s;
}
.slider {
  flex: 1;
  width: 100%;
  margin: $spacer-xxl 0;
  position: relative;
  &__slide {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 $spacer-m;

    transition: transform $duration-m $ease-basic;
    &.isLeft {
      transform: translateX(-100%);
    }
    &.isRight {
      transform: translateX(100%);
    }
  }
}
</style>