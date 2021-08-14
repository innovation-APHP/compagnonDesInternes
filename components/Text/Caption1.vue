<template>
  <p class="caption1" v-html="data"></p>
</template>

<script>
export default {
  props: {
    data: String
  }
}
</script>

<style lang="scss" scoped>
p {
  @include f_caption1;
}
</style>