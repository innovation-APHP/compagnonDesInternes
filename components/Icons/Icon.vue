<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    role="presentation"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>