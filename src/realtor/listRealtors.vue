<template>
<v-app></v-app>
</template>

<script>
export default {
  methods: {
    async mounted () {
      await this.$store.dispatch('fetchRealtor')
    }
  }
}
</script>

<style scoped>

</style>
