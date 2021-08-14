<template>
  <li class="post-card">
    <div :class="`post-card__mark${likeType === 'like' ? ' post-card__mark--marked-up' : likeType === 'dislike' ? ' post-card__mark--marked-down' : ''}`">
      <div class="post-card__mark__arrow-up" @click="like"></div>
      <TitleH3 class="post-card__mark__number" :data="String(markData)" />
      <div class="post-card__mark__arrow-down" @click="dislike"></div>
    </div>
    <div class="post-card__content">
      <TextP1 v-if="text" :data="text" />
      <div class="post-card__author-date">
        <Caption2
          class="post-card__author"
          :data="`Par ${author}`"
        />
        <Caption1
          class="post-card__date"
          :data="`le ${date}`"
        />
      </div>
    </div>
    <img
        v-if="isDeletable"
        class="post-card__cross"
        src="/uploads/icons/cross.svg"
        alt="Supprimer"
        @click="deleteCard"
    >
  </li>
</template>

<script>
import TextP1 from '~/components/Text/TextP1.vue'
import TitleH3 from '~/components/Text/TitleH3.vue'
import Caption1 from '~/components/Text/Caption1.vue'
import Caption2 from '~/components/Text/Caption2.vue'

export default {
  components: {
    TextP1,
    TitleH3,
    Caption1,
    Caption2,
  },
  props: {
    id: String,
    text: String,
    author: String,
    date: String,
    likes: Array,
    dislikes: Array,
    mark: Number,
    likeType: Function,
    isDeletable: Boolean
  },
  data() {
    return {
      markData: this.mark
    }
  },
  methods: {
    like() {
      this.markData++
    },
    dislike() {
      this.markData--
    },
    deleteCard() {
      this.$emit('deleteCard')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-card {
  margin: $spacer-s 0;
  padding: $spacer-l;
  background-color: $white;
  border-radius: $border-radius-s;
  overflow: hidden;
  display: flex;
  list-style: none;

  &__mark {
    width: 30px;
    height: 66px;
    margin-top: 10px;
    margin-right: $spacer-l;
    flex-shrink: 0;

    &__arrow-up {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid $background;
      cursor: pointer;
    }

    &__arrow-down {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid $background;
      cursor: pointer;
    }

    &__number {
      padding: $spacer-s 0;
      text-align: center;
      color: $black;
    }

    &--marked-up {

      .post-card__mark__arrow-up {
        border-bottom: 15px solid $primary;
      }

      .post-card__mark__number {
        color: $primary;
      }
    }

    &--marked-down {

      .post-card__mark__arrow-down {
        border-top: 15px solid $red;
      }

      .post-card__mark__number {
        color: $red;
      }
    }

    &__cross {
      position: absolute;
      right: $spacer-l;
      top: $spacer-l;
      cursor: pointer;
      border-radius: $border-radius-xl $border-radius-xl 0 0;
      text-align: center;
      transition: transform $duration-m $ease-basic;
    }
  }

  &__author-date {
    margin-top: $spacer-m;
    display: flex;
  }

  &__author {
    margin-right: $spacer-s;
  }

  &--has-buttons {
    padding: $spacer-l $spacer-l 0 $spacer-l;

    .buttons {
      margin-top: $spacer-l;
    }
  }
}
</style>
