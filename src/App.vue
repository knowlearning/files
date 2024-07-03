<template>
  <AccessPage
    v-if="!access"
    @access="access = true"
  />
  <Files v-else/>
</template>

<script setup>
import { ref } from 'vue'
import AccessPage from './components/AccessPage.vue'
import Files from './components/Files.vue'

const access = ref(false)

</script>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
