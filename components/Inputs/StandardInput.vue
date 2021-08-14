<template>
  <div class="standard-input">
    <label :for="name" class="standard-input__label">{{ label }}</label>
    <input v-if="isEditable" :class="`standard-input__input form-${name}`" :required="required" :id="name" :type="type" :placeholder="placeholder ? placeholder : label" :value="value" @input="updateValue($event.target.value)" @focus="suggestionsActive = true" @blur="blur"/>
    <div v-else class="standard-input__input">{{content}}</div>
    <ul v-if="suggestions && suggestionsActive" class="suggestions">
      <li v-for="(suggestion, index) in suggestions" :key="index" class="suggestions__item" @click="value = suggestion.name"><TitleH4 :data="suggestion.name"/></li>
    </ul>
  </div>
</template>

<script>
import TitleH4 from '~/components/Text/TitleH4'
export default {
  components: {
    TitleH4
  },
  data() {
    return {
      value: this.content,
      suggestionsActive: false,
    }
  },
  props: {
    name: {
      type: String,
      default: 'input'
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    required: {
      type: String,
      default: 'false'
    },
    isEditable: {
      type: Boolean,
      default: true
    },
    suggestions: Array[Object], 
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    blur() {
      // Wait click trigger to update value before bluring input
      setTimeout(() => {
        this.suggestionsActive = false
      }, 100);
    }
  }
}
</script>

<style lang="scss" scoped>
.standard-input {
  background-color: $white;
  padding: 20px 24px;
  font-size: 0;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px $borderGrey;
  position: relative;

  &__label {
    width: 35%;
    display: block;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: $black;
  }

  &__input {
    width: calc(65% - 16px);
    height: 100%;
    margin-left: 16px;
    display: block;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: $black;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      color: $grey;
    }
  }
}

.suggestions {
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  max-height: 40vh;
  overflow: hidden;
  overflow-y: scroll;

  &__item {
    padding: $spacer-m $spacer-l;
    border-bottom: 1px solid $borderGrey;
    cursor: pointer;
    &:hover {
      background-color: $borderGrey;
    }
  }
}
</style>
