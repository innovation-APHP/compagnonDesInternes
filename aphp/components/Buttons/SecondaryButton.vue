<template>
  <div class="secondary-button">
    <button v-if="action" @click="action">{{label}}</button>
    <nuxt-link v-else-if="to" :to="to ? to : '/'" :title="`Aller à ${label}`">{{label}}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    to: String,
    label: String,
    action: null
  }
}
</script>

<style lang="scss" scoped>
.secondary-button {
  border: solid 1px $primary;
  border-radius: 4px;

  a, button {
    @include f_h4;

    width: 100%;
    height: 40px;
    padding: 0 $spacer-m;
    color: $primary;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
