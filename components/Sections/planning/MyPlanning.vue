<template>
<div>
  <div class="planning-options" ref="options">
    <div v-if="isEditing" class="planning-dropdown">
      <div class="planning-dropdown__title">
        <TitleH4 data="Mon calendrier"/>
      </div>
      <Dropdown :top="dropdownTop" :options="tags" :getCurrentIndex="setEditingType"/>
    </div>
    <ul v-else class="planning-tags">
      <PlanningTag
        class="planning-tag"
        :count="userShiftDays.length"
        label="gardes"
        text="Au total"
        color="#f3cc36"
      />
      <PlanningTag
        class="planning-tag"
        :count="userSchoolDays.length"
        label="jours"
        text="À la fac"
        :color="tags[0].color"
      />
      <PlanningTag
        class="planning-tag"
        :count="userHospitalDays.length"
        label="jours"
        text="À l'hôpital"
        :color="tags[1].color"
      />
    </ul>
  </div>
  <div v-if="currentMonth(0) && getCalendarData" class="calendars">
    <Calendar
      v-for="i in monthsShown"
      :key="i"
      :me="me"
      :month="currentMonth(i - 1)"
      :calendar="getCalendarData"
      :isEditing="isEditing"
      :editing="editing"
      :refreshPlanning="refreshPlanning"
    />
  </div>
  <MaterialSingleButton :action="setEditingMode" to="/" label="Editer mon calendrier" :icon="isEditing ? 'done.svg' : 'pen.svg'"/>
</div>
</template>

<script>
import PlanningTag from '~/components/Planning/PlanningTag.vue'
import Calendar from '~/components/Calendar/Calendar.vue'
import MaterialSingleButton from '~/components/Buttons/MaterialSingleButton.vue'
import Dropdown from '~/components/Inputs/Dropdown.vue'
import TitleH4 from '~/components/Text/TitleH4.vue'

export default {
  components: {
    PlanningTag,
    Calendar,
    MaterialSingleButton,
    Dropdown,
    TitleH4
  },
  data() {
    return {
      dropdownTop: 0,
      isEditing: false,
      editing: null,
      monthsShown: 6,
      tags: [
        { label: 'À la Fac', color: '#00b8db' },
        { label: 'À l\'hôpital', color: '#2db47d' },
      ],
    }
  },
  props: {
    me: null,
    refreshPlanning: null,
    userShiftDays: {
      type: Array,
      default: () => []
    },
    userHospitalDays: {
      type: Array,
      default: () => []
    },
    userSchoolDays: {
      type: Array,
      default: () => []
    },
  },
  mounted(){
    this.dropdownTop = this.$refs.options.offsetTop
  },
  computed: {
    getCalendarData() {
      return this.userShiftDays.concat(this.userSchoolDays.concat(this.userHospitalDays))
    },
  },
  methods: {
    currentMonth(monthOffset) {
      const today = new Date()
      if (today) {
        let yearOffset = 0
        let month = today.getMonth() + monthOffset
        if (month > 11) {
          month -= 12
          yearOffset++
        }
        const year = today.getFullYear() + yearOffset
        return { year, month }
      }
      else return null
    },
    setEditingMode() {
      this.isEditing = !this.isEditing
      this.editing = this.isEditing ? 0 : null
    },
    setEditingType(index) {
      this.editing = index
    }
  },
}
</script>

<style lang="scss">
.planning-options {
  height: 90px;
  margin: 0;
  padding: $spacer-m $spacer-xs 0 $spacer-xs;
}

.planning-tags {
  display: flex;
  justify-content: space-between;
}

.planning-tag {
  margin: 0 $spacer-xs;
}

.planning-dropdown {

  &__title {
    text-align: center;
    margin-bottom: 6px;
  }
}

.calendars {
  padding-bottom: 66px;
}
</style>
