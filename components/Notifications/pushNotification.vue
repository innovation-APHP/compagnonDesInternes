<template>
<div class="push-notification" :class="{active: isVisible}">
    <TitleH4
      :data='title'
    />
    <TextP2
      :data='text'
    />
  </div>
</template>
<script>
import TitleH4 from '~/components/Text/TitleH4'
import TextP2 from '~/components/Text/TextP2'

export default {
  data() {
    return {
      isVisible: this.isActive
    }
  },
  components: {
    TitleH4,
    TextP2
  },
  props: {
    title: String,
    text: String,
    duration: {
      type: Number,
      default: 5000
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hideWithDelay() {
      setTimeout(() => this.isVisible = false, this.duration);
    }
  },
  mounted() {
    if(this.isActive) this.hideWithDelay()
  },
  watch: {
    isActive(value) {
      this.isVisible = value
      if(value) this.hideWithDelay()
    }
  }
}
</script>
<style lang="scss" scoped>
.push-notification {
  padding: $spacer-l $spacer-xxl;
  position: fixed;
  top: $spacer-m;
  left: $spacer-m;
  right: $spacer-m;
  background-color: $white;
  border-radius: $border-radius-s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transform: translateY(calc(-100% - 20px));
  opacity: 0;
  visibility: hidden;
  transition: transform $duration-m $ease-basic, opacity $duration-m $ease-basic, visibility $duration-m $ease-basic;
}
.title-h4 {
  margin-bottom: $spacer-s;
}
.push-notification.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}
</style>