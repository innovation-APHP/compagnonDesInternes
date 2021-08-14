<template>
  <div class="time-picker">
    <div class="time-picker__hour">
      <label for="start">
        <TitleH4
          data="Début"
        />
      </label>
      <input 
        v-model="startTime" 
        type="time" 
        id="start" 
        value="12:00" 
        required
      >
    </div>
    <div class="time-picker__hour">
      <label for="end">
        <TitleH4
          data="Fin"
        />
      </label>
      <input 
        v-model="endTime"
        type="time" 
        id="end" 
        :min="startTime" 
        max="00:00" 
        value="02:00" 
        required
      >
    </div>
  </div>
</template>
<script>
import TitleH4 from '~/components/Text/TitleH4.vue'

export default {
  data() {
    return {
      startTime: '00:00',
      endTime: '00:00',
    }
  },
  components: {
    TitleH4
  },
  watch: {
    startTime(value) {
      console.log(value)
    }
  }
}
</script>
.<style lang="scss" scoped>
.time-picker {
  border-top: 1px solid $borderGrey;
  border-bottom: 1px solid $borderGrey;
  display: flex;
  justify-content: space-evenly;
  padding: $spacer-m 0;

  .title-h4 {
    margin-bottom: $spacer-s;
  }

  input {
    @include f_body2;
    height: 20px;
  }

  &__hour {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>