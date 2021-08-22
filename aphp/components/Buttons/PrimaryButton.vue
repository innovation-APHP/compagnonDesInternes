<template>
  <div :class="`primary-button
    ${isDisabled ? ' disabled' : ''}
    ${isSecondary ? ' alternative-button' : ''}
    ${isTertiary ? ' tertiary-button' : ''}
    ${disabledState ? ' disabled' : ''}
  `">
    <nuxt-link v-if="to" :to="to ? to : '/'" :title="`Aller à ${label}`">{{label}}</nuxt-link>
    <input v-if="type" :type="type" :value="label"/>
    <input v-if="action" type="button" :value="label" @click="action" />
  </div>
</template>
<script>
export default {
  name: 'PrimaryButton',
  data() {
    return {
      disabledState: this.action || this.to || this.type ? false : true
    }
  },
  props: {
    to: String,
    type: String,
    label: String,
    action: Function,
    isSecondary: Boolean,
    isTertiary: Boolean,
    isDisabled: Boolean
  },
}
</script>

<style lang="scss" scoped>
.primary-button {
  background-color: $primary;
  border-radius: $border-radius-s;
  user-select: none;
  cursor: pointer;
}

.alternative-button {
  background-color: transparent;
  border: 1px solid $grey-border;

  a, input, .label {
    color: $black;
  }
}

.tertiary-button {
  border: none;
  background-color: transparent;

  & * {
    color: $primary;
  }
}

.disabled {
  cursor: default;
  opacity: .4;
  pointer-events: none;
}

a, input, .label {
  width: 100%;
  height: 100%;
  padding: $spacer-m;
  color: $white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
</style>
