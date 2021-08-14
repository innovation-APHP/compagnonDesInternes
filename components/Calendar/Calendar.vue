<template>
  <div class="calendar" ref="calendar">
    <TitleH3
      class="calendar__month"
      :data="monthNames[month.month]"
    />
    <ul class="calendar__dayLetters">
      <li class="calendar__dayLetter" v-for="(dayName, i) in dayNames" :key="i">{{dayName}}</li>
    </ul>
    <ul class="calendar__days" ref="days">
      <li :class="`calendar__day
        ${areSameDay(currentDay, day.date) ? ' calendar__day--current' : ''}
        ${getTodayEvent(day.date) ? ` calendar__day--${getTodayEvent(day.date)}` : ''}
        ${hasPrev(currentMonthDays, i) ? 'hasPrev' : ''}
        `" v-for="(day, i) in currentMonthDays" :key="day.label"  @click="addShiftToUser(day.date, i, 'day' + i)"
        :ref="'day'+i"
        >
        <div :class="`calendar__day__number${isEditing ? ' calendar__day__number--clickable' : ''}`">
          <div class="calendar__day__circle" :style="{width: `${getCircleWidth(currentMonthDays, i)}px`}"></div>
          <div v-if="areSameDay(currentDay, day.date)" class="calendar__day__circle current"></div>
          <div class="calendar__day__label">{{day.label > 0 ? day.label : ''}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import { areSameDay, getDaysInMonth } from '~/assets/js/formatDate.js'

import TitleH3 from '~/components/Text/TitleH3'

export default {
  components: {
    TitleH3,
  },
  props: {
    me: null,
    month: Object,
    calendar: Array,
    editing: Number,
    isEditing: Boolean,
    refreshPlanning: null
  },
  data() {
    return {
      hasNextCircleWidth: Number,
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      dayNames: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      currentDay: Number,
      daysList: NodeList,
      firstDay: 1,
    }
  },
  mounted() {
    const today = new Date()
    this.currentDay = today
    this.hasNextCircleWidth = this.calcCircleWidth()
    this.daysList = this.$refs.days.querySelectorAll('li')

    window.addEventListener('resize', () => { this.hasNextCircleWidth = this.calcCircleWidth() })
  },
  updated() {
    const monthFirstDay = new Date(`${this.month.year}-${this.month.month + 1 < 10 ? `0${this.month.month + 1}` : this.month.month + 1}-01`)
    this.firstDay = monthFirstDay.getDay() === 0 ? 6 : monthFirstDay.getDay() - 1
  },
  computed: {
    currentMonthDays() {
      const currentMonthDays = [] 
      const monthLength = getDaysInMonth(this.month.year, this.month.month + 1)
      for (let i = this.firstDay; i > 0; i--) {
        currentMonthDays.push(
          { label: i * -1, date: null }
        )
      }
      for (let i = 1; i < monthLength + 1; i++) {
        currentMonthDays.push(
          { label: i, date: new Date(`${this.month.year}-${this.month.month + 1 < 10 ? `0${this.month.month + 1}` : this.month.month + 1}-${i < 10 ? `0${i}` : i}`) }
        )
      }
      return currentMonthDays
    }
  },
  methods: {
    getTodayEvent(date) {
      for (const element of this.calendar) {
        if (areSameDay(new Date(element.date), date)) return element.type
      }
      return null
    },
    calcCircleWidth() {
      return (this.$refs.days.offsetWidth - parseInt(window.getComputedStyle(this.$refs.days).paddingLeft) * 2) / 7 + 40
    },
    areSameDay(dayOne, dayTwo) {
      return areSameDay(dayOne, dayTwo)
    },
    hasPrev(days, index) {
      return days[index - 1] 
        && this.getTodayEvent(days[index].date) == this.getTodayEvent(days[index - 1].date) 
          ? true : false
    },
    hasNext(days, index) {
      return days[index + 1] 
        && this.getTodayEvent(days[index].date) == this.getTodayEvent(days[index + 1].date) 
          ? true : false
    },
    getCircleWidth(days, index) {
      return this.hasNext(days, index) || this.hasPrev(days, index) ? this.hasNextCircleWidth : 40
    },
    async addShiftToUser(date, i, day) {
      // Removed current and followed day linked style
      this.$refs['day' + (i + 1)][0].classList.remove('hasPrev')
      this.$refs['day' + (i)][0].classList.remove('hasPrev')
      this.$refs['day' + (i - 1)][0].querySelector('.calendar__day__circle').style.width = '40px'
  
      let shiftType
      if (this.isEditing && this.editing !== null) {
        switch (this.editing) {
          case 0:
            shiftType = 'school'
            break
          case 1:
            shiftType = 'hospital'
            break
        }
        this.preDisplayStyle(shiftType, i)

        let exists = false

        const res = await this.$apollo.query({
          query: gql`
            query checkShiftExist($owner: ID!, $date: Date!) {
              shifts(where: { owner: $owner, date: $date }) {
                id
              }
            }
          `,
          variables: {
            owner: this.me.id,
            date: date.toISOString().substring(0, 10)
          },
          fetchPolicy: 'no-cache'
        }).then(async ({ data }) => {
          exists = data.shifts.length > 0 ? data.shifts[0].id : false

          if (exists) {
            try {
              const res = await this.$apollo.mutate({
                mutation: gql`
                  mutation deleteShift($id: ID!) {
                    deleteShift(input: { where: { id: $id } }) {
                      shift { id }
                    }
                  }
                `,
                variables: {
                  id: exists,
                }
              }).then(({ data }) => {
                this.refreshPlanning()
              })
            }
            catch (e) {}
          }
          else {
            const res = await this.$apollo.mutate({
              mutation: gql`
                mutation addShiftToUser($owner: ID!, $date: Date!, $type: ENUM_SHIFT_TYPE!) {
                  createShift(input: { data: { owner: $owner, date: $date, type: $type } }) {
                    shift {
                      id
                      owner {
                        id
                      }
                      date
                      type
                    }
                  }
                }
              `,
              variables: {
                owner: this.me.id,
                date: date.toISOString().substring(0, 10),
                type: shiftType
              }
            }).then(({ data }) => {
              this.refreshPlanning()
            })
          }
        })
      }
    },
    preDisplayStyle(shiftType, targetIndex) {
      const target = this.$refs.calendar.querySelectorAll('.calendar__day')[targetIndex]
      if (target.classList.contains('calendar__day--hospital') || target.classList.contains('calendar__day--school')) {
        target.classList.remove('calendar__day--hospital')
        target.classList.remove('calendar__day--school')
      }
      else {
        target.classList.add(`calendar__day--${shiftType}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  margin: 16px 0;
  background-color: #ffffff;

  &__month {
    padding: 20px 16px;
    font-weight: 500;
    font-size: 16px;
    border-bottom: solid 1px #EDF0F3;
  }

  &__dayLetters {
    margin: 0;
    padding: 8px 16px;
    display: flex;
    border-bottom: solid 1px #EDF0F3;
  }
  
  &__dayLetter {
    width: calc(100% / 7); // 7 days
    padding: 10px;
    flex-shrink: 0;
    @include f_calendar;
    text-align: center;
  }

  &__days {
    margin: 0;
    padding: 8px 16px;
    display: flex;
    flex-wrap: wrap;
  }

  &__day {
    width: calc(100% / 7); // 7 days
    height: 40px;
    margin: $spacer-xs 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: #999999;
    @include f_calendar;
    text-align: center;
    position: relative;

    &__letter {
      font-size: 12px;
      font-weight: 500;
      color: #000000;
    }
    
    &__number {
      height: 20px;
      width: 40px;
      margin: 0 auto;
      font-size: 12px;
      color: #999999;
      position: relative;

      &--clickable {
        cursor: pointer;
      }
    }

    &__circle {
      content: '';
      width: 40px;
      height: 40px;
      border-radius: 20px;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 1;
      transform: translateY(-50%);
    }

    &.hasPrev {
      .calendar__day__circle {
        right: 0;
        z-index: 0;
        left: initial;
      }
    }

    &__label {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      z-index: 1;
    }

    &--current {

      .calendar__day__label {
        color: $white;
      }
      .calendar__day__circle.current {
        content: '';
        width: 40px;
        height: 40px;
        position: absolute;
        border-radius: 20px;
        top: 50%;
        left: 0;
        z-index: 1;
        background-color: $primary;
        transform: translateY(-50%);
      }
      .calendar__day__circle.current.hasPrev {
        right: 0;
        left: initial;
      }
    }

    &--shift {
      color: $white;

      .calendar__day__number {
        color: $yellow;
      }

      .calendar__day__circle {
        background-color: $yellow-light;
      }

      &.calendar__day--current {
        .calendar__day__circle.current {
          background-color: $yellow;
        }
      }
    }

    &--school {
      color: $white;

      .calendar__day__number {
        color: $blue;
      }

      .calendar__day__circle {
        background-color: $blue-light;
      }

      &.calendar__day--current {
        .calendar__day__circle.current {
          background-color: $blue;
        }
      }
    }

    &--hospital {
      color: $white;

      .calendar__day__number {
        color: $green;
      }

      .calendar__day__circle {
        background-color: $green-light;
      }

      &.calendar__day--current {
        .calendar__day__circle.current {
          background-color: $green;
        }
      }
    }
  }
}
</style>