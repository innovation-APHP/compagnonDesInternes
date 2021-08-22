<template>
  <div>
    <ul class="planning-shifts">
      <PlanningShift
        v-for="(shift, i) of parsedShifts" :key="i"
        :me="me"
        :owner="shift.owner ? shift.owner.id : null"
        :label="formatDate(shift.date, { short: true })"
        :text="shift.owner ? shift.owner.id === me.id ? 'Moi' : shift.owner.username : null"
        :isSet="shift.owner ? true : false"
        :attributeAction="() => openAttributeModal(shift.date)"
        :switchAction="() => openSwitchModal(shift)"
      >
      </PlanningShift>
    </ul>
    <ScrollableModal
      title="Attribuer une garde"
      :text="`Que souhaitez-vous faire avec la garde du ${formatDate(attributeShiftDate, { lowercase: true })} ?`"
      illustration="nurse.svg"
      :isOpen="isAttributeModalOpen"
      :closeAction="closeAttributeModal"
    >
      <PrimaryButton
        slot="actions"
        label="Je la prends"
        :action="getShift"
      />
      <PrimaryButton
        slot="actions"
        label="Je la donne"
        :action="giveShift"
        isSecondary
        :isDisabled="true"
      />
    </ScrollableModal>
    <ScrollableModal
      title="Votre garde"
      :text="`Que souhaitez-vous faire avec la garde du ${switchShiftElement ? formatDate(switchShiftElement.date, { lowercase: true }) : ''} ?`"
      illustration="nurse.svg"
      :isOpen="isSwitchModalOpen"
      :closeAction="closeShiftModals"
    >
      <PrimaryButton
        slot="actions"
        label="Je l'échange"
        :action="switchShift"
      />
      <PrimaryButton
        slot="actions"
        label="Je la donne"
        :action="giveShift"
        isSecondary
        :isDisabled="true"
      />
    </ScrollableModal>
    <ScrollableModal
      title="Votre garde"
      :text="`Séléctionnez la date que vous souhaitez en échange de votre garde du ${switchShiftElement ? formatDate(switchShiftElement.date, { lowercase: true }) : ''}.`"
      :isOpen="isSwitchSelectionModalOpen"
      :closeAction="closeShiftModals"
    >
    <div
      slot="body"
      v-for="(shift, i) of shiftsWithoutMine" :key="i"
      @click="selectSwitchShiftDate(shift, shift.owner)"
    >
      <PlanningShift
        :me="me"
        :owner="shift.owner ? shift.owner.id : null"
        :label="formatDate(shift.date, { short: true })"
        :text="shift.owner ? shift.owner.username : null"
        :isSet="shift.owner ? true : false"
      />
    </div>
    </ScrollableModal>
    <ScrollableModal
      title="Confirmation"
      text="Souhaitez-vous envoyer cette demande d’échange de garde ?"
      :isOpen="isSwitchConfirmModalOpen"
      :closeAction="closeShiftModals"
    >
      <PlanningShift
        slot="body"
        :me="me"
        :owner="null"
        label="Date à échanger"
        :text="switchShiftElement ? formatDate(switchShiftElement.date, { short: true }) : ''"
        :isSet="true"
      />
      <PlanningShift
        slot="body"
        :me="me"
        :owner="null"
        label="Date souhaitée"
        :text="switchShiftNewElement && formatDate(switchShiftNewElement.date, { short: true })"
        :isSet="true"
      />
      <PlanningShift
        slot="body"
        :me="me"
        :owner="null"
        label="Interne concerné(e)"
        :text="switchShiftIntern && switchShiftIntern.username"
        :isSet="true"
      />
      <PrimaryButton
        v-if="switchAlreadyRequested"
        slot="actions"
        label="Demande déjà faite"
        :action="() => {}"
        :isDisabled="true"
      />
      <PrimaryButton
        v-else
        slot="actions"
        :label="shiftRequestSent ? 'Demande en cours' : 'J\'envoie ma demande'"
        :action="sendShiftRequest"
        :isDisabled="shiftRequestSent || switchAlreadyRequested"
      />
      <PrimaryButton
        slot="actions"
        label="J'annule"
        :action="closeShiftModals"
        isSecondary
      />
    </ScrollableModal>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import PlanningShift from '~/components/Planning/PlanningShift.vue'
import PrimaryButton from '~/components/Buttons/PrimaryButton.vue'
import ScrollableModal from '~/components/Modals/ScrollableModal.vue'

import { fullDate } from '~/assets/js/formatDate.js'

export default {
  components: {
    PlanningShift,
    ScrollableModal,
    PrimaryButton
  },
  data() {
    return {
      isAttributeModalOpen: false,
      isSwitchModalOpen: false,
      isSwitchSelectionModalOpen: false,
      isSwitchConfirmModalOpen: false,
      attributeShiftDate: null,
      switchShiftElement: null,
      switchShiftNewElement: null,
      switchShiftIntern: null,
      shiftRequestSent: false,
      switchAlreadyRequested: false
    }
  },
  props: {
    me: null,
    parsedShifts: {
      type: Array,
      default: () => []
    },
    refreshPlanning: null
  },
  computed: {
    shiftsWithoutMine() {
      const shiftsWithoutMine = []
      for (const shift of this.parsedShifts) {
        if (shift.owner && shift.owner.id !== this.me.id) shiftsWithoutMine.push(shift)
      }
      return shiftsWithoutMine
    }
  },
  methods: {
    formatDate(date, options) {
      return fullDate(date, options)
    },
    openAttributeModal(timestamp) {
      const datetime = new Date(timestamp)
      const date = datetime.toISOString().substring(0, 10)
      this.isAttributeModalOpen = true
      this.attributeShiftDate = date
    },
    openSwitchModal(shift) {
      this.isSwitchModalOpen = true
      this.switchShiftElement = shift
    },
    closeAttributeModal() {
      this.isAttributeModalOpen = false
      this.attributeShiftDate = null
    },
    closeSwitchModal() {
      this.isSwitchModalOpen = false
      this.switchShiftElement = null
    },
    async getShift() {
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
          date: this.attributeShiftDate
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
              this.addShift()
            })
          }
          catch (e) {}
        }
        else this.addShift()
      })
    },
    async addShift() {
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
          date: this.attributeShiftDate,
          type: 'shift'
        }
      }).then(({ data }) => {
        this.refreshPlanning()
        this.closeAttributeModal()
      })
    },
    switchShift() {
      this.isSwitchModalOpen = false
      this.isSwitchSelectionModalOpen = true
    },
    selectSwitchShiftDate(shift, owner) {
      this.switchShiftNewElement = shift
      this.switchShiftIntern = owner
      this.isSwitchSelectionModalOpen = false
      this.isSwitchConfirmModalOpen = true
    },
    closeShiftModals() {
      this.switchShiftElement = null
      this.switchShiftNewElement = null
      this.switchShiftIntern = null
      this.isSwitchModalOpen = false
      this.isSwitchSelectionModalOpen = false
      this.isSwitchConfirmModalOpen = false
      this.switchAlreadyRequested = false
    },
    async sendShiftRequest() {
      this.shiftRequestSent = true
      let exists = false

      const res = await this.$apollo.query({
        query: gql`
          query checkRequestExist($fromUser: ID!, $toShift: ID!) {
            requests(where: { fromUser: $fromUser, toShift: $toShift, isReviewed: false }) {
              id
            }
          }
        `,
        variables: {
          fromUser: this.me.id,
          toShift: this.switchShiftNewElement.id
        },
        fetchPolicy: 'no-cache'
      }).then(async ({ data }) => {
        exists = data.requests.length > 0 ? data.requests[0].id : false

        if (!exists) {
          const res = await this.$apollo.mutate({
            mutation: gql`
              mutation requestShiftSwitch($fromUser: ID!, $toUser: ID!, $toShift: ID!, $fromShift: ID!) {
                createRequest(
                  input: { data: { fromUser: $fromUser, toUser: $toUser, toShift: $toShift , fromShift: $fromShift } }
                ) {
                  request {
                    fromUser { id }
                    toUser { id }
                    toShift { id }
                    fromShift { id }
                  }
                }
              }
            `,
            variables: {
              fromUser: this.me.id,
              toUser: this.switchShiftIntern.id,
              toShift: this.switchShiftNewElement.id,
              fromShift: this.switchShiftElement.id
            }
          }).then(({ data }) => {
            this.closeShiftModals()
            this.shiftRequestSent = false
          })
        }
        else {
          this.switchAlreadyRequested = true
        }
      })
    },
    giveShift() {
      console.log('give', this.attributeShiftDate, this.switchShiftElement)
    },
  },
}
</script>

<style lang="scss">
.planning-shifts {
  margin: 0;
  padding: $spacer-m 0 80px 0;
}

/* const datetime = new Date(timestamp) */
/* const date = datetime.toISOString().substring(0, 10) */
</style>

