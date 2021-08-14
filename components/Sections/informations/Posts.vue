<template>
  <ul>
    <PostCard
      v-for="(card, i) in informations" :key="i"
      :id="card.id"
      :text="card.text"
      :author="card.author.username"
      :date="getFullDate(card.updatedAt)"
      :mark="(card.likes && card.dislikes) && card.likes.length - card.dislikes.length"
      :likes="card.likes"
      :dislikes="card.dislikes"
      :likeType="() => getLikeType(card.likes, card.dislikes)"
    />
  </ul>
</template>

<script>
import gql from 'graphql-tag'

import PostCard from '~/components/Cards/PostCard.vue'

import { miniDateTime } from '~/assets/js/formatDate.js'

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      informations: []
    }
  },
  props: {
    me: null,
    self: null,
    whichInformations: String,
  },
  methods: {
    getFullDate(datetime) {
      return miniDateTime(datetime)
    },
    getLikeType(likes, dislikes) {
      for (const like of likes) {
        if (like.id === this.me.id) return 'like'
      }
      for (const dislike of dislikes) {
        if (dislike.id === this.me.id) return 'dislike'
      }
      return 'none'
    }
  },
  apollo: {
    informations: {
      query() {
        if (this.whichInformations === 'hospital') {
          return gql`query ($id: ID!) {
            informations(where: { hospital: $id }) {
              updatedAt id text date likes { id } dislikes { id } author { username }
          }
          }`
        }
        else if (this.whichInformations === 'service')  {
          return gql`query ($id: ID!) {
            informations(where: { service: $id }) {
              updatedAt id text date likes { id } dislikes { id } author { username }
            }
          }`
        }
      },
      variables() {
        if (this.whichInformations === 'hospital') {
          return {
            id: this.self ? this.self.currentHospital.id : null
          }
        }
        else if (this.whichInformations === 'service')  {
          return {
            id: this.self ? this.self.currentService.id : null
          }
        }
      }
    }
  }
}
</script>
