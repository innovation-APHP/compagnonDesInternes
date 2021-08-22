<template>
  <p class="text-p1" v-html="data"></p>
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
  @include f_body1;
}
</style>