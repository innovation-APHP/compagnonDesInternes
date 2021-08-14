<template>
  <h4 class="title-h4">{{data}}</h4>
</template>

<script>
export default {
  props: {
    data: String
  }
}
</script>

<style lang="scss" scoped>
h4 {
  @include f_h4;
}
</style>