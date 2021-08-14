<template>
  <div 
    class="switch" 
    :class="{active: isActive}"
    @click="isActive = isActive ? false : true"
  >
    <div class="switch__circle"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false
    }
  }
}
</script>
<style lang="scss" scoped>
.switch {
  width: 52px;
  height: 30px;
  background-color: $light-grey;
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color $duration-m $ease-basic;

  &__circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: $white;
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translate(0%, -50%);
    transition: transform $duration-m $ease-basic;
  }

  &.active {
    background-color: $primary;
    .switch {
      &__circle {
        transform: translate(22px, -50%);
      }
    }
  }
}
</style>