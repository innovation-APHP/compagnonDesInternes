<template>
  <p class="text-p2" v-html="data"></p>
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
  @include f_body2;
}
</style>