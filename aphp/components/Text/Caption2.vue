<template>
  <p class="caption2" v-html="data"></p>
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
  @include f_caption2;
}
</style>