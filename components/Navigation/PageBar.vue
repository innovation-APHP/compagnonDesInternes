<template>
<div class="page-bar-container">
  <div class="page-bar">
    <TitleH3 class ="title" :data="title" />
    <a :href="prec" title="Go back" class="page-bar__back-box" @click.prevent="() => simulateLink(prec)">
      <div class="page-bar__back"></div>
    </a>
    <IconButton
      v-if="hasEdit"
      class="page-bar__edit"
      title="edit"
      icon="pen-primary"
      isTransparent
      :action="edit"
    />
  </div>
</div>
</template>

<script>
import TitleH3 from '~/components/Text/TitleH3.vue'
import Caption1 from '~/components/Text/Caption1.vue'
import IconButton from '~/components/Buttons/IconButton.vue'

export default {
  components: {
    TitleH3,
    Caption1,
    IconButton
  },
  props: {
    title: String,
    prec: String,
    precAction: Function,
    hasEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    edit() {
      this.$emit('edit')
    },
    simulateLink(prec) {
      if (this.precAction) this.precAction()
      else this.$router.push(prec)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-bar-container {
  height: calc(76px - 40px);
}

.page-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  height: 76px;
  background-color: $background;

  &__back-box, &__edit {
    position: absolute;
    left: 24px;
    top: calc(50% - 14px);
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }

  &__edit {
    left: auto;
    right: 24px;
    border-radius: 0;
    background-position: 100% 50%;
  }

  &__back {
    height: 14px;
    width: 7px;
    background-position: center center;
    background-image: url('/uploads/icons/back-arrow.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
}

.title {
  margin: $spacer-xl 0 $spacer-l 0;
  color: $black;
  text-align: center;
}
</style>
