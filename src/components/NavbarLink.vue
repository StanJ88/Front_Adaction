<template>
  <router-link
    :to="to"
    class="navbar-link"
    active-class="active">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'NavbarLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>