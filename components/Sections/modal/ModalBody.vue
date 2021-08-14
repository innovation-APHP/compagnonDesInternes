<template>
  <div class="modal-body">
    <div class="modal-body__content">
      <div class="modal-body__heading">
        <div v-if="illustration" class="illustration">
          <img class="illustration__image" :src="illustration" alt="">
        </div>
        <TitleH2 :data="title"/>
        <TextP2 :data="text"/>
      </div>
      <div class="modal-body__body">
        <slot name="body"></slot>
      </div>
      <div class="modal-body__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import TitleH2 from '~/components/Text/TitleH2'
import TextP2 from '~/components/Text/TextP2'

export default {
  components: {
    TitleH2,
    TextP2
  },
  props: {
    illustration: String,
    title: String,
    text: String,
  }
}
</script>
<style lang="scss" scoped>
.modal-body {
  &__heading {
    padding: 0 $spacer-xxl;
    margin-bottom: $spacer-xxl;
  }

  &__body {
    width: 100%;
    margin-bottom: $spacer-xxl;
  }

  &__actions {
    padding: 0 $spacer-l;

    > *:not(:last-child) {
      margin-bottom: $spacer-s;
    }
  }

  .text-p2 {
    margin-top: $spacer-l;
  }

  .illustration {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: $spacer-m;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    background-color: #fff;
    padding-bottom: $spacer-l;
  }
}
</style>
