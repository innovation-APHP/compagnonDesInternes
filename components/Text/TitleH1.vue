<template>
  <h1 class="title-h1">{{data}}</h1>
</template>

<script>
export default {
  props: {
    data: String
  }
}
</script>

<style lang="scss" scoped>
h1 {
  @include f_h1;
}
</style>