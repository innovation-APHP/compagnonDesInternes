<template>
  <ul>
    <PlanningShift
      label="Date à échanger"
      :text="swappingDate"
    />
    <PlanningShift
      label="Date souhaitée"
      :text="wishingDate"
    >
      <IconButton
        icon="pen"
        :action="onSwitch"
      />
    </PlanningShift>
    <PlanningShift
      label="Interne concerné(e)"
      :text="username"
    />
  </ul>
</template>
<script>
import PlanningShift from '~/components/Planning/PlanningShift.vue'
import IconButton from '~/components/Buttons/IconButton.vue'

export default {
  components: {
    PlanningShift,
    IconButton
  },
  props: {
    date: String,
    swappingDate: String,
    wishingDate: String,
    username: String,
  },
  methods: {
    onSwitch() {
      console.log('[onSwitch] do something')
    },
    onMainAction() {
      console.log('[onMainAction] do something')
    },
    onSecondaryAction() {
      console.log('[onSecondaryAction] do something')
    },
  }
}
</script>