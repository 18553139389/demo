<template></template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.path);
    });
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
