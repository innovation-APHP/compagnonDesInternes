<template>
  <div
    class="editable-field"
    contenteditable="true"
    :data-placeholder="placeholder"
    @input="handlePlaceholder($event.target)"
    ref="editableField"
  >
    {{data}}
  </div>
</template>

<script>
export default {
  props: {
    data: String,
    placeholder: String
  },
  methods: {
    handlePlaceholder(element) {
      element.textContent.length === 0 ?
      element.classList.remove('isFilled') :
      element.classList.add('isFilled')

      this.$emit('update', element.textContent)
    }
  },
  watch: {
    data: function (val) {
      const element = this.$refs.editableField
      element.textContent = val
      this.handlePlaceholder(element)
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-field {
  @include f_body2;
  text-align: left;

  &::before {
    content: attr(data-placeholder);
    color: $grey;
  }
  &:focus {
    outline: none;
  }
  &.isFilled {
    &::before {
      content: '';
    }
  }
}
</style>
