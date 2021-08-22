<template>
  <div class="scrollable-modal" :class="{active: isOpen}">
    <div class="scrollable-modal__overlay" @click="closeAction"></div>
    <div class="scrollable-modal__window">
      <img 
        class="scrollable-modal__cross" 
        src="/uploads/icons/cross.svg" 
        alt=""
        @click="closeAction"
      >
      <ModalBody
        :illustration="illustration ? `/uploads/illustrations/${illustration}` : null"
        :title="title"
        :text="text"
      >
        <slot name="body" slot="body"/>
        <slot name="actions" slot="actions"/>
      </ModalBody>
    </div>
  </div>
</template>
<script>
import ModalBody from '~/components/Sections/modal/ModalBody'

export default {
  components: {
    ModalBody
  },
  props: {
    illustration: String,
    title: String,
    text: String,
    isOpen: Boolean,
    closeAction: null
  }
}
</script>
<style lang="scss" scoped>
.scrollable-modal {
  position: fixed;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 20000000;
  display: flex;
  align-items: flex-end;
  visibility: hidden;
  transition: visibility $duration-m $ease-basic;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba($black, .25);
    transition: opacity $duration-m $ease-basic;
    opacity: 0;
  }

  &__window {
    max-height: calc(100% - 125px);
    width: 100%;
    position: relative;
    background-color: $white;
    padding-top: $spacer-xxxl;
    padding-bottom: 0;
    border-radius: $border-radius-xl $border-radius-xl 0 0;
    text-align: center;
    transition: transform $duration-m $ease-basic;
    transform: translateY(100%);
  }

  &__cross {
    position: absolute;
    right: $spacer-l;
    top: $spacer-l;
    cursor: pointer;
    border-radius: $border-radius-xl $border-radius-xl 0 0;
    text-align: center;
    transition: transform $duration-m $ease-basic;
  }
}
// Active

.scrollable-modal.active {
  visibility: visible;
  .scrollable-modal {
    &__overlay {
      opacity: 1;
    }

    &__window {
      transform: translateY(0);
    }
  }
}
</style>