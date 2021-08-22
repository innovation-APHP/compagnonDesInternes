<template>
  <div class="modal" :class="{active: isActive}">
    <div class="modal__overlay" @click="isActive = false"></div>
    <div class="modal__window">
      <ModalBody
        :illustration="illustration"
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
  data() {
    return {
      isActive: this.isOpen
    }
  },
  components: {
    ModalBody
  },
  props: {
    title: String,
    text: String,
    illustration: String,
    isOpen: Boolean
  }
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20000;
  visibility: hidden;
  opacity: 0;
  transition: visibility $duration-m $ease-basic, opacity $duration-m $ease-basic;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($black, .25);
  }

  &__window {
    max-height: calc(100% - 125px);
    width: 100%;
    position: relative;
    background-color: $white;
    margin: 0 $spacer-m;
    padding-top: $spacer-xxxl;
    padding-bottom: $spacer-l;
    text-align: center;
    transition: transform $duration-m $ease-basic;
    transform: scale(.96);
  }
}

// Active

.modal.active {
  visibility: visible;
  opacity: 1;
  .modal {
    &__window {
      transform: scale(1);
    }
  }
}
</style>