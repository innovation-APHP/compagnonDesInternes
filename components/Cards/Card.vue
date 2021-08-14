<template>
  <div :class="`card${buttons && buttons.length > 0 ? ' card--has-buttons' : ''}${isOnlyButtons() ? ' card--only-buttons' : ''}`">
    <Eyebrow v-if="eyebrow" :data="eyebrow" />
    <TitleH2 v-if="title" :data="title" />
    <TextP1 v-if="text" :data="text" />
    <CalendarWeek v-if="calendar" :calendar="calendar" />
    <div v-if="buttons && buttons.length > 0" class="buttons">
      <CardButton
        v-for="(button, i) in buttons" :key="i"
        :label="button.label"
        :to="button.to"
        :type="button.type"
        :action="button.action"
        :notifications="button.notifications"
        :picture="button.picture"
        :icon="button.icon"
        :sublabel="button.sublabel"
      />
    </div>
  </div>
</template>

<script>
import Eyebrow from '~/components/Text/Eyebrow.vue'
import TitleH2 from '~/components/Text/TitleH2.vue'
import TextP1 from '~/components/Text/TextP1.vue'
import CardButton from '~/components/Cards/CardButton.vue'
import CalendarWeek from '~/components/Calendar/CalendarWeek.vue'

export default {
  components: {
    Eyebrow,
    TitleH2,
    TextP1,
    CardButton,
    CalendarWeek
  },
  props: {
    eyebrow: String,
    title: String,
    text: String,
    buttons: Array,
    calendar: Array
  },
  methods: {
    isOnlyButtons() {
      if (!this.$props.eyebrow && !this.$props.title && !this.$props.text && !this.$props.calendar) {
        return true
      }
      else return false
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  margin: $spacer-s 0;
  padding: $spacer-l;
  background-color: $white;
  border-radius: $border-radius-s;
  overflow: hidden;

  .buttons {
    margin: 0;

    .card-button:not(:first-child) {
      border-top: solid $border-width $background;
    }
  }

  * + .buttons .card-button { // Border-top if element before
    border-top: solid $border-width $background;
  }

  &--has-buttons {
    padding: $spacer-l $spacer-l 0 $spacer-l;

    .buttons {
      margin-top: $spacer-l;
    }
  }

  &--only-buttons {
    padding: 0 $spacer-l;

    .buttons {
      margin-top: 0;
    }
  }
}

.eyebrow {
  margin-bottom: $spacer-m;
}

.title-h2 {
  margin-bottom: $spacer-s;
}
</style>
