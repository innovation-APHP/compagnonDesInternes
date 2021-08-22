<template>
  <div>
    <Card
      v-if="shiftDays.length > 0 && shiftDays[0]"
      title="Prochaine garde"
      :text="`${formatDate(shiftDays[0].date)} : ${shiftDays[0].isNight ? '20h00' : '8h00'}`"
    />
    <Card
      v-if="shifts && shifts.length > 0"
      title="Planning de la semaine"
      :buttons="[
        {
          label: 'Voir le planning du mois',
          to: '/planning',
          notifications: 0,
        }
      ]"
      :calendar="shifts"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'

import { fullDate } from '~/assets/js/formatDate.js'

import Card from '~/components/Cards/Card.vue'

export default {
  components: {
    Card
  },
  props: {
    me: null
  },
  data() {
    return {
      shifts: [],
    }
  },
  computed: {
    shiftDays() {
      const shiftDays = []
      for (const shift of this.shifts) {
        if (shift.type === 'shift') shiftDays.push(shift)
      }
      const sortedShiftDays = shiftDays.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      return sortedShiftDays
    }
  },
  methods: {
    formatDate(date) {
      return fullDate(date)
    }
  },
  apollo: {
    shifts: {
      query: gql`query ($id: ID!) {
        shifts(where: { owner: {id: $id}}) {
          id date type isNight
        }
      }`,
      variables() {
        return {
          id: this.me ? this.me.id : null
        }
      }
    }
  },
}
</script>