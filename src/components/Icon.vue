<template>
  <div
    :class="['icon__wrapper', {
        'icon__wrapper--active': isActive
      }]"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
      v-html="types[iconType]"
    >
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconType: {
      type: String,
      default: 'home'
    }
  },
  computed: {
    isActive() {
      return false;
    }
  },
  data: () => ({
    types: {
      arrow:
        `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/>`,
      done:
        `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>`,
      error:
        `<path d="M0 0h24v24H0V0z" fill="none"/><circle cx="12" cy="19" r="2"/><path d="M10 3h4v12h-4z"/>`,
    }
  })
}
</script>

<style scoped>
.icon__wrapper {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 30px;
}

.icon {
  fill: #9b9d9f;
}

</style>
