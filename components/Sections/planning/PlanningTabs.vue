<template>
  <div class="planning-tabs">
    <div v-if="currentTab === 0">
      <MyPlanning
        :me="me"
        :userShiftDays="userShiftDays"
        :userHospitalDays="userHospitalDays"
        :userSchoolDays="userSchoolDays"
        :refreshPlanning="reloadData"
      />
    </div>
    <div v-else-if="currentTab === 1">
      <ShiftsPlanning
        :me="me"
        :parsedShifts="parsedShifts"
        :refreshPlanning="reloadData"
      />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import { areSameDay } from '~/assets/js/formatDate.js'

import MyPlanning from '~/components/Sections/planning/MyPlanning.vue'
import ShiftsPlanning from '~/components/Sections/planning/ShiftsPlanning.vue'

export default {
  components: {
    MyPlanning,
    ShiftsPlanning
  },
  props: {
    me: null,
    self: null,
    currentTab: 0
  },
  data() {
    return {
      shiftDays: [],
      userHospitalDays: [],
      userSchoolDays: [],
    }
  },
  computed: {
    parsedShifts() {
      const parsedShifts = []
      let filled = false
      for (const date of this.dates) {
        for (const shift of this.shiftDays) {
          if (areSameDay(shift.date, date)) {
            parsedShifts.push({ ...shift })
            filled = true
          }
        }
        if (!filled) parsedShifts.push({ date })
        filled = false
      }
      return parsedShifts
    },
    userShiftDays() {
      const userShiftDays = []
      for (const day of this.shiftDays) {
        if (day.owner && day.owner.id === this.me.id) userShiftDays.push(day)
      }
      return userShiftDays
    },
    dates() {
      const dayShown = 30
      const dates = []
      for (let i = 1; i < dayShown + 1; i++) {
        const today = new Date()
        const futureDay = today.setDate(new Date().getDate() + i)
        dates.push(futureDay)
      }
      return dates
    },
  },
  methods: {
    reloadData() {
      this.$apollo.queries.shiftDays.refetch()
      this.$apollo.queries.userHospitalDays.refetch()
      this.$apollo.queries.userSchoolDays.refetch()
    }
  },
  apollo: {
    shiftDays: {
      query: gql`{
        shiftDays: shifts(where: { type: "shift" }) {
          id
          owner {
            id
            username
          }
          type
          date
          isNight
        }
      }`,
    },
    userHospitalDays: {
      query: gql`query ($id: ID!) {
        userHospitalDays: shifts(where: { type: "hospital", owner: { _id: $id } }) {
          id
          owner {
            id
            username
          }
          type
          date
        }
      }`,
      variables() {
        return {
          id: this.me ? this.me.id : null
        }
      }
    },
    userSchoolDays: {
      query: gql`query ($id: ID!) {
        userSchoolDays: shifts(where: { type: "school", owner: { _id: $id } }) {
          id
          owner {
            id
            username
          }
          type
          date
        }
      }`,
      variables() {
        return {
          id: this.me ? this.me.id : null
        }
      }
    }
  }
}
</script>