<template>
  <ul class="navigation">
    <li class="navigation__item-container" v-for="(item, i) in navigation" :key="item.uid">
      <nuxt-link :to="`/${item.uid}`">
        <div class="navigation__item">
          <div class="navigation__item__icon">
            <Icon :color="getColor(i)"><component :is="navigation[i].icon"></component></Icon>
          </div>
          <div class="navigation__item__label" :style="{color: getColor(i)}">{{item.label}}</div>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
// Icons
import Icon from '~/components/Icons/Icon'
import Home from '~/components/Icons/Home'
import Calendar from '~/components/Icons/Calendar'
import Phone from '~/components/Icons/Phone'
import User from '~/components/Icons/User'
// Utils
import getTheme from '~/utils/getTheme'

export default {
  components: {
    Icon,
    Home,
    Calendar,
    Phone,
    User
  },
  data() {
    return {
      navigation: [
        {
          uid: 'dashboard',
          label: 'Dashboard',
          icon: 'home',
          iconSelected: 'uploads/icons/navigation/dashboard-selected.svg'
        },
        {
          uid: 'planning',
          label: 'Planning',
          icon: 'calendar',
          iconSelected: 'uploads/icons/navigation/planning-selected.svg'
        },
        {
          uid: 'annuaire',
          label: 'Annuaire',
          icon: 'phone',
          iconSelected: 'uploads/icons/navigation/annuaire-selected.svg'
        },
        {
          uid: 'profil',
          label: 'Profil',
          icon: 'user',
          iconSelected: 'uploads/icons/navigation/profil-selected.svg'
        }
      ]
    }
  },
  methods: {
    getColor(i) {
      return this.$store.state.currentPage === i 
        ? getTheme('primary') 
        : getTheme('light-grey')
    }
  },
}
</script>

<style lang="scss">
.navigation {
  height: 64px;
  margin: 0;
  padding: 0 $spacer-l;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background-color: $white;
  border-top: solid 1px $borderGrey;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 56px;

    &__icon {
      height: 24px;
      width: 24px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__label {
      @include f_overline;
      margin-top: $spacer-xs;
      text-transform: initial;
    }
  }
}
</style>
