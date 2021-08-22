<template>
  <p class="eyebrow">{{data}}</p>
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
  @include f_overline;
  color: $primary;
}
</style>