<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeaderPrincipal from "./components/header.vue";
</script>

<template>
  <HeaderPrincipal></HeaderPrincipal>
  <main class="relative pt-[5%]">
    <RouterView></RouterView>
  </main>
</template>

<style scoped></style>
