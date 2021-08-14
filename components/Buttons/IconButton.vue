<template>
  <div v-if="to && title" class="iconButton" :class="{'transparent': isTransparent}" :style="`background-image:url('/uploads/icons/${icon}.svg')`">
    <nuxt-link :to="to" :title="title">
    </nuxt-link>
  </div>
  <div
    v-else
    class="iconButton"
    :class="{'transparent': isTransparent, 'disabled': disabledState}"
    :style="`background-image:url('/uploads/icons/${icon}.svg')`"
    @click="disabledState ? null : action()"
  >
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabledState: this.action ? false : true
    }
  },
  props: {
    to: String,
    title: String,
    icon: String,
    isTransparent: Boolean,
    action: Function,
  },
}
</script>

<style lang="scss" scoped>
  .iconButton {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: $primary;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .transparent {
    background-color: transparent;
  }

  .disabled {
    opacity: .4;
    cursor: default;
    pointer-events: none;
  }

  a {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
</style>
