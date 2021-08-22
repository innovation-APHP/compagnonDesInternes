<template>
  <Card
    eyebrow="Stage en cours"
    :title="`Stage à l'${self.currentHospital.name || 'test'}`"
    :text="self.currentService.nameBasins || self.currentService.nameSirius"
    :buttons="[
      {
        label: 'Informations de l\'hôpital',
        to: '/hopital/informations',
        notifications: this.hospitalInformations.length,
      },
      {
        label: 'Informations liées au service',
        to: '/service/informations',
        notifications: this.serviceInformations.length,
      }
    ]"
  />
</template>

<script>
import gql from 'graphql-tag'

import Card from '~/components/Cards/Card.vue'

export default {
  components: {
    Card
  },
  data() {
    return {
      hospitalInformations: [],
      serviceInformations: [],
    }
  },
  props: {
    self: null
  },
  apollo: {
    hospitalInformations: {
      query: gql`query ($id: ID!) {
        hospitalInformations: informations(where: { hospital: $id }) {
          id
        }
      }`,
      variables() {
        return {
          id: this.self ? this.self.currentHospital.id : null
        }
      }
    },
    serviceInformations: {
      query: gql`query ($id: ID!) {
        serviceInformations: informations(where: { service: $id }) {
          id
        }
      }`,
      variables() {
        return {
          id: this.self ? this.self.currentService.id : null
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>