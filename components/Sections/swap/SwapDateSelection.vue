<template>
  <ul v-if="timeSlots">
    <PlanningShift
      v-for="(timeSlot, index) in timeSlots"
      :key="index"
      :label="timeSlot.date"
      :text="timeSlot.username"
      @click="onTimeSlotSelect"
    />
  </ul>
</template>
<script>
import PlanningShift from '~/components/Planning/PlanningShift.vue'

export default {
  components: {
    PlanningShift
  },
  props: {
    timeSlots: {
      type: Array,
      default: () => [] // contains objects like { date: String, username: String }
    }, 
  },
  methods: {
    onTimeSlotSelect() {
      console.log('[onTimeSlotSelect] do something')
    },
  }
}
</script>