<template>
  <div class="calendar-week">
    <ul class="calendar-week__week">
      <li :class="`calendar-week__day${getTodayEvent(day.date) ? ` calendar-week__day--${getTodayEvent(day.date)}` : ''}`" v-for="(day, i) in days" :key="i">
        <div class="calendar-week__day__letter">{{day.weekDay}}</div>
        <div class="calendar-week__day__number">
          <div class="calendar-week__day__circle"></div>
          <div class="calendar-week__day__label">{{day.day}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { areSameDay } from '~/assets/js/formatDate.js'

export default {
  props: {
    calendar: Array
  },
  data() {
    return {
      firstDay: 1,
      dayLetters: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      days: {
        date: Date,
        day: Number,
        weekDay: String
      }
    }
  },
  mounted() {
    this.days = this.getDays()
  },
  methods: {
    getDays(day) {
      const dayShown = 7
      const dates = []
      for (let i = 0; i < dayShown; i++) {
        const today = new Date()
        const futureDay = new Date(today.setDate(new Date().getDate() + i))
        dates.push({
          date: futureDay,
          day: futureDay.getDate(),
          weekDay: this.dayLetters[futureDay.getDay()]
        })
      }
      return dates
    },
    getTodayEvent(date) {
      for (const element of this.calendar) {
        if (areSameDay(new Date(element.date), date)) return element.type
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-week {

  &__week {
    width: calc(100% + 20px);
    margin: 0 0 0 -10px;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  &__day {
    width: 14.28%; // (100 / 7 days)
    padding: 16px 10px 0 10px;
    flex-shrink: 0;
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
      margin-top: 15px;
      font-size: 12px;
      color: #999999;
      position: relative;
    }

    &__circle {
      content: '';
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 9;
      transform: translateX(-50%) translateY(-50%);
    }

    &__label {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      z-index: 10;
    }

    &--shift {
      color: $white;

      .calendar-week__day__number {
        color: $yellow;
      }

      .calendar-week__day__circle {
        background-color: rgba($yellow, .3);
      }
    }

    &--school {
      color: $white;

      .calendar-week__day__number {
        color: $blue;
      }

      .calendar-week__day__circle {
        background-color: rgba($blue, .3);
      }
    }

    &--hospital {
      color: $white;

      .calendar-week__day__number {
        color: $green;
      }

      .calendar-week__day__circle {
        background-color: rgba($green, .3);
      }
    }
  }
}
</style>