<template>
  <div class="container">
    <PageBar :title="contact && contact.nom || `Contact sans nom`" prec="/annuaire/tous" hasEdit v-on:edit="editMode()" />
    <div class="contact__infos" v-if="contact">
      <StandardInput v-model="contact.job" name="job" label="Profession" :content="contact.job" :isEditable="isEditable" required />
      <StandardInput v-model="contact.nom" name="nom" label="Nom" :content="contact.nom" :isEditable="isEditable" required />
      <StandardInput v-model="contact.hospital" name="hospital" label="Hôpital" :content="contact.hospital && contact.hospital.name" :isEditable="isEditable" required />
      <StandardInput v-model="contact.service" name="service" label="Service" :content="contact.service && (contact.service.nameSirius || contact.service.nameBasins)" :isEditable="isEditable" required />
      <StandardInput v-model="contact.tel" name="tel" label="Tél." :content="contact.tel" :isEditable="isEditable" />
      <StandardInput v-model="contact.email" name="email" label="Email" :content="contact.email" :isEditable="isEditable" />
      <div  class="infos__editor">
        <Caption2 :data="`Par ${updatedBy || contact.updatedBy.username}`" class="infos__editor-name" />
        <Caption1 :data="`Édité le ${formatDate(updatedAt || contact.updatedAt, { lowercase: true, year: true })}`" />
      </div>
    </div>
    <div class="contact__comments" v-if="false">
      <PostCard
        v-for="(comment, index) in viewableComments"
        :key="index"
        :text="comment.text"
        :author="comment.author"
        :date="comment.date"
        :mark="comment.mark"
      />
      <AddNote v-if="isEditable" class="contact__add-note" v-on:addNote="addNote" />
    </div>
    <div v-if="isEditable" class="contact__save">
      <PrimaryButton label="Sauvegarder" :action="save" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import PageBar from '~/components/Navigation/PageBar.vue'
import StandardInput from '~/components/Inputs/StandardInput.vue'
import PostCard from '~/components/Cards/PostCard.vue'
import PrimaryButton from '~/components/Buttons/PrimaryButton.vue'
import IconButton from '~/components/Buttons/IconButton.vue'
import AddNote from '~/components/Buttons/AddNote.vue'
import Caption1 from '~/components/Text/Caption1.vue'
import Caption2 from '~/components/Text/Caption2.vue'

import { fullDate } from '~/assets/js/formatDate.js'

export default {
  components: {
    PageBar,
    StandardInput,
    PostCard,
    PrimaryButton,
    AddNote,
    IconButton,
    Caption1,
    Caption2
  },
  data() {
    return {
      updatedBy: null,
      updatedAt: null,
      comments: [
        {
          text: 'Le professeur n\'est pas disponible les mercredis et jeudis',
          author: 'Aurélie M.',
          authorId: '144',
          date: '22/02/20',
          mark: 2
        }
      ],
      isEditable: false
    }
  },
  computed: {
    contactName() {
      return this.$route.params.name
    },
    viewableComments() {
      if(this.isEditable) {
        return this.comments.filter(comment => comment.authorId === this.me.id)
      } else {
        return this.comments
      }
    }
  },
  methods: {
    editMode() {
      this.isEditable = true
    },
    async save() {
      const form = document.querySelector('.contact__infos')
      if (form) {
        const job = form.querySelector('.form-job').value
        const nom = form.querySelector('.form-nom').value
        const hospital = form.querySelector('.form-hospital').value
        const service = form.querySelector('.form-service').value
        const tel = form.querySelector('.form-tel').value
        const email = form.querySelector('.form-email').value

        console.log(job, nom, tel, email)

        try {
          const res = await this.$apollo.mutate({
            mutation: gql`
              mutation updateContact($id: ID!, $job: String!, $nom: String!, $tel: String!, $email: String!, $updatedBy: ID!) {
                updateRecord(input: { where: { id: $id }, data: {
                    job: $job,
                    nom: $nom,
                    tel: $tel,
                    email: $email,
                    updatedBy: $updatedBy
                  } }) {
                  record { id }
                }
              }
            `,
            variables: {
              id: this.contact.id,
              job,
              nom,
              tel,
              email,
              updatedBy: this.me.id
            }
          }).then(({ data }) => {
            this.updatedBy = this.me.username
            this.updatedAt = new Date()
            this.isEditable = false
          })
        }
        catch (e) {}
      }
    },
    addNote() {
      console.log('addNote')
    },
    formatDate(date, options) {
      return fullDate(date, options)
    }
  },
  apollo: {
    me: {
      query: gql`query {
        me { id username }
      }
      `
    },
    contact: {
      query: gql`query($id: ID!) {
        contact: record(id: $id) {
          id nom job tel email hospital { id name } service { id nameBasins nameSirius } updatedBy { id username } updatedAt
        }
      }`,
      variables() {
        return {
          id: this.$route.params.contact
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.contact__edit {
  position: fixed;
  top: 28px;
  right: $spacer-m;
}
.infos__editor {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: $spacer-s;
  margin-bottom: $spacer-m;

  &-name {
    margin-right: $spacer-s;
  }
}
.contact__add-note {
  margin: $spacer-s 0;
}
</style>
