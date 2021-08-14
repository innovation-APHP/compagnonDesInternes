<template>
  <div class="dropdown" ref="dropdown">
    <div class="dropdown__inner" :class="{'isFixed': isFixed}" :style="{top: `${isFixed ? top : 0}px`}">
      <div class="dropdown__current" @click="isOpen = isOpen ? false : true">
        <div class="option">
          <div class="option__badge" :style="{ backgroundColor: options[selectedIndex].color }"></div>
          <TitleH4
            :data="options[selectedIndex].label"
          />
          <div class="option__arrow"></div>
        </div>
      </div>
      <ul class="options" v-if="isOpen">
        <li 
          v-for="(option, index) in options"
          :key="index"
          @click="updateState(index)"
          :style="{display: index === selectedIndex ? 'none' : 'block'}"
          class="options__item">
            <div class="option">
              <div class="option__badge" :style="{ backgroundColor: option.color }"></div>
              <TitleH4
                :data="option.label"
              />
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import TitleH4 from '~/components/Text/TitleH4'

export default {
  components: {
    TitleH4,
  },
  props: {
    options: Array,
    currentIndex: {
      type: Number,
      default: 0,
    },
    getCurrentIndex: null,
    top: 0,
  },
  data() {
    return {
      isOpen: false,
      isFixed: false,
      selectedIndex: this.currentIndex,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleDropDownScoll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleDropDownScoll)
  },
  methods: {
    updateState(selectedIndex) {
      this.selectedIndex = selectedIndex
      this.isOpen = false
      if (this.getCurrentIndex) this.getCurrentIndex(selectedIndex)
    },
    handleDropDownScoll() {
      const offsetTop = this.$refs.dropdown.offsetTop - this.top
      const scrollY = window.scrollY

      this.isFixed = scrollY >= offsetTop ? true : false
    }
  },
}
</script>
<style lang="scss" scoped>
.dropdown {
  top: $spacer-s;
  position: sticky;
  z-index: 10;
  height: 48px;
  cursor: pointer;
  padding: 0 $spacer-xxxl;
  &__inner {
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    position: relative;
    z-index: 100;
    &.isFixed {
      position: fixed;

      .dropdown__current {
        margin-bottom: 0;
      }
      .options {
        top: 100%;
      }
    }
  }
  &__current {
    margin-bottom: $spacer-s;
  }
}

.options {
  background-color: $white;
  border-radius: $border-radius-s;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  border: 1px solid rgba($grey-border, .2);

  &__item {
    border-bottom: 1px solid rgba($grey-border, .2);
  }

  :last-child {
    border-bottom: none;
  }
}

.option {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  background-color: $white;
  padding: 0 $spacer-l;
  border-radius: $border-radius-s;
  &__badge {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: $spacer-l;
  }
  &__arrow {
    width: 10px;
    height: 10px;
    background-image: url(/uploads/icons/bottom-arrow.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: auto;
  }
}
</style>