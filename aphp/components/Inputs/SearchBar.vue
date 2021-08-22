<template>
  <div class="search-bar">
    <label class="label" for="search">
      <img class="label__icon" src="/uploads/icons/search.svg" alt="">
    </label>
    <input
      ref="input"
      class="input"
      id="search"
      type="text"
      placeholder="Rechercher"
      @input="e => update(e)"
    >
    <ul v-if="suggestions && suggestionsActive" class="suggestions">
      <li v-for="(suggestion, index) in filteredSuggestions" :key="index" class="suggestions__item">
        <nuxt-link :to="suggestion.notfound ? '/annuaire' : { name: 'annuaire-tous-contact', params: { contact: suggestion.id, name: suggestion.name }}">
          <TitleH4 :data="suggestion.name"/>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
import TitleH4 from '~/components/Text/TitleH4'

export default {
  components: {
    TitleH4
  },
  data() {
    return {
      suggestionsActive: false,
      query: ''
    }
  },
  props: {
    suggestions: Array[Object]
  },
  computed: {
    filteredSuggestions() {
      const searchedUsers = [];
      for (const user of this.suggestions) {
        if (user.name.toLowerCase().includes(this.query.toLowerCase())) {
            searchedUsers.push(user);
        }
      }
      if (searchedUsers.length === 0) {
        searchedUsers.push({ notfound: true, name: 'Pas d\'utilisateur correspondant' });
      }
      return searchedUsers
    }
  },
  methods: {
    blur() {
      // Wait click trigger to update value before bluring input
      setTimeout(() => {
        this.suggestionsActive = false
      }, 100);
    },
    update(e) {
      if (e.target.value) this.suggestionsActive = true
      else this.suggestionsActive = false
      this.query = e.target.value
    }
  }
}
</script>
<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  height: 48px;
  background-color: $white;
  position: relative;
}
.label {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    height: 16px;
    width: 16px;
  }
}
.input {
  @include f_body2;
  line-height: 1.4rem; // safari needs need to read same line-height and font-size
  width: 100%;
  height: 100%;
}
.suggestions {
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  right: 0;
  background-color: white;
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  max-height: 50vh;
  overflow: hidden;
  overflow-y: scroll;

  &__item {
    padding: $spacer-m $spacer-l;
    border-bottom: 1px solid $borderGrey;
    cursor: pointer;
    &:hover {
      background-color: $borderGrey;
    }
  }
}
</style>