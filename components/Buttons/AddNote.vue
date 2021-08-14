<template>
  <div class="add-note" @click='addNote'>
    <TitleH4 data="Ajouter une note" />
    <IconButton title="Nouvelle note" icon="add" />
  </div>
</template>

<script>
import TitleH4 from '~/components/Text/TitleH4.vue'
import IconButton from '~/components/Buttons/IconButton.vue'

export default {
  components: {
    TitleH4,
    IconButton
  },
  methods: {
    addNote() {
      this.$emit('addNote')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-note {
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacer-m $spacer-l;
  background-color: #fff;
  cursor: pointer;
}
.iconButton {
  opacity: 1;
}
</style>
