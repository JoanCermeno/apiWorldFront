<script setup>
import { RouterView } from "vue-router";
import HeaderPrincipal from "./components/header.vue";
import myFooter from "./views/footer.vue";
</script>

<template>
  <HeaderPrincipal></HeaderPrincipal>
  <main class="relative pt-[5%] overflow-auto mb-10 h-">
    <RouterView></RouterView>
  </main>

  <myFooter></myFooter>
</template>

<style scoped></style>
