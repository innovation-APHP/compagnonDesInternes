<template>
  <div class="card-button">
    <a :href="to ? to : '/'" :title="`Aller à ${label}`" :class="{'fullwidth': isFullwidth}" @click.prevent="simulateNuxtLink">
      <div class="body">
        <div v-if="picture" class="picture">
          <img class="picture__image" :src="picture" alt="Profile Picture">
        </div>
        <div v-if="icon" class="category-icon">
          <img :src="`/uploads/icons/${icon}.svg`" class="category-icon__icon">
        </div>
        <div class="text">
          <TitleH4
            class="text__label"
            :data="label"
          />
          <TextP2
            v-if="sublabel"
            class="text__sublabel"
            :data="sublabel"
          />
        </div>
      </div>
      <div v-if="notifications && notifications > 0" class="notif-badge">
        <div class="notif-badge__number">{{notifications}}</div>
      </div>
      <div class="arrow"></div>
    </a>
  </div>
</template>

<script>
import TitleH4 from '~/components/Text/TitleH4'
import TextP2 from '~/components/Text/TextP2'

export default {
  components: {
    TitleH4,
    TextP2
  },
  props: {
    label: String,
    sublabel: String,
    icon: String,
    picture: String,
    to: [String, Object],
    notifications: Number,
    isFullwidth: {
      type: Boolean,
      default: () => false,
    },
    action: null
  },
  methods: {
    simulateNuxtLink(e) {
      if (this.action) {
        e.preventDefault()
        this.action()
      }
      else this.$router.push(this.to)
    }
  },
}
</script>

<style lang="scss" scoped>
.card-button {
  min-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  list-style: none;
  position: relative;
  background-color: $white;

  a {
    height: 100%;
    width: 100%;
    padding: $spacer-m 0px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: $black;

    &.fullwidth {
      padding: $spacer-m $spacer-xl $spacer-m $spacer-m;
    }
  }
}

.body {
  display: flex;
  flex-flow: row nowrap;
}

.text {
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.picture {
  width: 48px;
  height: 48px;
  margin-right: $spacer-l;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.category-icon {
  display: flex;
  align-items: center;
  margin-right: $spacer-m;
}

.notif-badge {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 $spacer-m;
  margin-left: auto;
  border-radius: 50%;
  background-color: $primary;

  &__number {
    @include f_overline;
    color: $white;
  }
}

.arrow {
  height: 14px;
  width: 7px;
  flex-shrink: 0;
  background-position: center center;
  background-image: url('/uploads/icons/arrow.svg');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
