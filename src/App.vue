<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderPrincipal from './components/header.vue'
</script>

<template>
  <HeaderPrincipal></HeaderPrincipal>
  <main class="dark:bg-slate-700 relative top-5">
    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
