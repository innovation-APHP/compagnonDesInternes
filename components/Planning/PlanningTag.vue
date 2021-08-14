<template>
  <li class="planning-tag">
    <TitleH4 :data="`${count} ${label}`" />
    <TextP3 class="planning-tag__text" :data="text" />
    <div class="planning-tag__color" :style="{backgroundColor: color}"></div>
  </li>
</template>

<script>
import TitleH4 from '~/components/Text/TitleH4.vue'
import TextP3 from '~/components/Text/TextP3.vue'

export default {
  components: {
    TitleH4,
    TextP3
  },
  props: {
    count: Number,
    label: String,
    text: String,
    color: String
  }
}
</script>

<style lang="scss" scoped>
.planning-tag {
  flex: 1;
  padding: $spacer-m;
  list-style: none;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: $border-radius-s;
  overflow: hidden;
  position: relative;

  &__text {
    margin-top: $spacer-xs;
  }

  &__color {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 5px;
  }
}
</style>
