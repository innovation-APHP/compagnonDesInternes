<template>
  <li class="planning-shift">
    <div>
      <TextP2 :data="label" />
    </div>
    <div class="planning-shift__right">
      <SecondaryButton v-if="!isSet && attributeAction" label="Attribuer" :action="attributeAction" />
      <IconButton v-else-if="isSet && isItMe && switchAction" title="shift" icon="shift" :action="switchAction" />
      <TitleH4 v-if="text && isSet" :data="text" class="planning-shift__text" />
    </div>
  </li>
</template>

<script>
import TextP2 from '~/components/Text/TextP2.vue'
import TitleH4 from '~/components/Text/TitleH4.vue'
import SecondaryButton from '~/components/Buttons/SecondaryButton.vue'
import IconButton from '~/components/Buttons/IconButton.vue'

export default {
  components: {
    TextP2,
    TitleH4,
    SecondaryButton,
    IconButton,
  },
  props: {
    me: null,
    owner: String,
    label: String,
    text: String,
    isSet: Boolean,
    attributeAction: Function,
    switchAction: Function
  },
  computed: {
    isItMe() {
      return this.me.id === this.owner
    }
  },
}
</script>

<style lang="scss" scoped>
.planning-shift {
  height: 64px;
  padding: 0 $spacer-xl 0 $spacer-l;
  border-top: solid .5px #F4F4F4;
  // border-bottom: solid .5px #F4F4F4;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    margin-left: $spacer-m;
  }
}
</style>
