<template>
  <a :href="link" class="external-link">
    <!-- TODO: Dynamise icon -->
    <div class="external-link__icon"></div>
    <div class="external-link__label">{{label}}</div>
  </a>
</template>
<script>
export default {
  props: {
    label: String,
    link: String,
  }
}
</script>
<style lang="scss" scoped>
.external-link {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $spacer-xl;
  &__icon {
    width: 14px;
    height: 14px;
    background-image: url('/uploads/icons/download.svg');
    background-position: center;
    margin-right: $spacer-s;
  }
  &__label {
    @include f_h4;
    color: $primary;
  }
}
</style>