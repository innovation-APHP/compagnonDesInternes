<template>
  <h2 class="title-h2" v-html="data">{{data}}</h2>
</template>

<script>
export default {
  props: {
    data: String
  }
}
</script>

<style lang="scss" scoped>
h2 {
  @include f_h2;
}
</style>