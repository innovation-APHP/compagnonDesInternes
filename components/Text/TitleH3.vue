<template>
  <h3 class="title-h3">{{data}}</h3>
</template>

<script>
export default {
  props: {
    data: String
  }
}
</script>

<style lang="scss" scoped>
h3 {
  @include f_h3;
}
</style>