<template>
<div class="page-tabs-container">
  <ul class="page-tabs">
    <li v-for="(tab, i) in tabs" :key="i" :class="`page-tab${currentTab === i ? ' page-tab--selected' : ''}`" v-on:click="setCurrentTab(i)">{{tab.name}}</li>
    <div class="page-tabs__line" :style="{width: `${parseInt(windowWidth / tabs.length)}px`, transform: `translateX(${parseInt(windowWidth / tabs.length) * currentTab}px)`}"></div>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: 375
    }
  },
  props: {
    tabs: Array,
    currentTab: Number,
    setCurrentTab: Function
  },
  mounted() {
    this.windowWidth = window.innerWidth
  },
}
</script>

<style lang="scss" scoped>
.page-tabs-container {
  height: 58px;
}

.page-tabs {
  list-style: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  margin: 0;
  height: 58px;
  display: flex;
  background-color: $white;
  border-bottom: solid 1px $borderGrey;

  &__line {
    height: 2px;
    position: absolute;
    bottom: -1px;
    left: 0;
    background-color:$primary;
  }
}

.page-tab {
  @include f_h4;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &--selected {
    color: $primary;
  }
}
</style>
