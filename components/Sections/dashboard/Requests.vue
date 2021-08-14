<template>
  <div>
    <Card
      v-if="requests && requests.length > 0"
      title="Propositions d'échange"
      :text="`Vous avez ${requests.length} proposition${requests.length > 1 ? 's' : ''}.`"
      :buttons="buttons"
    />
    <Card
      v-else
      title="Propositions d'échange"
      text="Vous n'avez aucune proposition."
    />
    <ScrollableModal
      title="Demande d'échange"
      :text="`${this.requestModalRequest && this.requestModalRequest.fromUser.username} veut échanger votre garde du ${this.formatDate(this.requestModalRequest && this.requestModalRequest.fromShift.date, { lowercase: true })} contre le ${this.formatDate(this.requestModalRequest && this.requestModalRequest.toShift.date, { lowercase: true })}. Acceptez-vous l'échange ?`"
      illustration="nurse.svg"
      :isOpen="isRequestModalOpen"
      :closeAction="closeModals"
    >
      <PrimaryButton
        slot="actions"
        :label="isRequestInFlight ? `Réponse en cours d'envoi` : `D'accord, je l'échange`"
        :action="() => answerShiftRequest(true)"
        :isDisabled="isRequestInFlight"
      />
      <PrimaryButton
        slot="actions"
        :label="isRequestInFlight ? `Réponse en cours d'envoi` : `Non, je conserve ma garde`"
        :action="() => answerShiftRequest(false)"
        :isDisabled="isRequestInFlight"
        isSecondary
      />
    </ScrollableModal>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import Card from '~/components/Cards/Card.vue'
import PrimaryButton from '~/components/Buttons/PrimaryButton.vue'
import ScrollableModal from '~/components/Modals/ScrollableModal.vue'

import { fullDate } from '~/assets/js/formatDate.js'

export default {
  components: {
    Card,
    PrimaryButton,
    ScrollableModal
  },
  props: {
    me: null,
  },
  data() {
    return {
      requests: [],
      isRequestModalOpen: false,
      isRequestInFlight: false,
      requestModalRequest: null,
    }
  },
  computed: {
    buttons() {
      const buttons = []
      for (const request of this.requests) {
        const button = {
          label: `${request.fromUser.username}, le ${this.formatDate(request.toShift.date, { short: true, lowercase: true })}`,
          action: () => this.openRequestModal(request)
        }
        buttons.push(button)
      }
      return buttons
    }
  },
  methods: {
    openRequestModal(request) {
      this.isRequestModalOpen = true
      this.requestModalRequest = request
    },
    closeModals() {
      this.isRequestModalOpen = false
      this.requestModalRequest = null
      this.isRequestInFlight = false
    },
    async answerShiftRequest(isAccepted) {
      this.isRequestInFlight = true
      const res = await this.$apollo.mutate({
        mutation: gql`mutation updateRequest($id: ID!, $isAccepted: Boolean!) {
          updateRequest(
            input: {
              where: { id: $id }
              data: { isReviewed: true, isAccepted: $isAccepted }
            }
          ) {
            request {
              id
            }
          }
        }
        `,
        variables: {
          id: this.requestModalRequest.id,
          isAccepted,
        }
      }).then(async ({ data }) => {
        if (isAccepted) { 
          try {
            const res = await this.$apollo.mutate({
              mutation: gql`mutation updateShiftFrom($fromShift: ID!, $toUser: ID!) {
                updateShift(
                  input: {
                    where: { id: $fromShift }
                    data: { owner: $toUser }
                  }
                ) {
                  shift {
                    id
                  }
                }
              }
              `,
              variables: {
                fromShift: this.requestModalRequest.fromShift.id,
                toUser: this.requestModalRequest.toUser.id,
              }
            }).then(({ data }) => {})
            const res2 = await this.$apollo.mutate({
              mutation: gql`mutation updateShiftTo($toShift: ID!, $fromUser: ID!) {
                updateShift(
                  input: {
                    where: { id: $toShift }
                    data: { owner: $fromUser }
                  }
                ) {
                  shift {
                    id
                  }
                }
              }
              `,
              variables: {
                toShift: this.requestModalRequest.toShift.id,
                fromUser: this.requestModalRequest.fromUser.id,
              }
            }).then(({ data }) => {
              this.isRequestInFlight = false
              this.$apollo.queries.requests.refetch()
              this.closeModals()
            })
          }
          catch (e) {
            const res3 = await this.$apollo.mutate({
              mutation: gql`mutation updateRequest($id: ID!) {
                updateRequest(
                  input: {
                    where: { id: $id }
                    data: { isReviewed: false, isAccepted: false }
                  }
                ) {
                  request {
                    id
                  }
                }
              }
              `,
              variables: {
                id: this.requestModalRequest.id,
              }
            }).then(({ data }) => {
              this.isRequestInFlight = false
              this.$apollo.queries.requests.refetch()
              this.closeModals()
            })
          }
        }
        this.isRequestInFlight = false
        this.$apollo.queries.requests.refetch()
        this.closeModals()
      })
    },
    formatDate(date, options) {
      return fullDate(date, options)
    }
  },
  apollo: {
    requests: {
      query: gql`query ($id: ID!){
        requests(where: { toUser: { _id: $id } isReviewed: false }) {
          id
          fromUser { id username }
          toUser { id username }
          fromShift { id date }
          toShift { id date }
        }
      }`,
      variables() {
        return {
          id: this.me.id
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>