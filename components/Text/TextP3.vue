<template>
  <p class="text-p3" v-html="data"></p>
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
  @include f_body3;
}
</style>
