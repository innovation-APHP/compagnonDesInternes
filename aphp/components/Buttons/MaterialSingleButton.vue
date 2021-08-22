<template>
  <div class="material-single-button" :style="`background-image:url('/uploads/icons/${icon}')`">
    <button v-if="action" @click="action" :title="`${label}`">
      <div class="material-single-button__label"></div>
    </button>
    <nuxt-link v-else :to="to" :title="`Aller à ${label}`">
      <div class="material-single-button__label"></div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    },
    action: null,
    label: String,
    icon: String,
  },
  methods: {
    doAction(e) {
      if (this.action) {
        e.preventDefault()
        this.action()
      }
    }
  },
}
</script>

<style lang="scss">
.material-single-button {
  width: 60px;
  height: 60px;
  background-color: $primary;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  position: fixed;
  bottom: 88px;
  right: 22px;
  z-index: 10000;

  a, button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__label {
    font-size: 0;
  }
}
</style>
