<script setup>
import { ref } from "vue";
import mapComponent from "./Lmap.vue";
import mainForm from "./mainForm.vue";
import WikiInfoView from "@/views/WikiInfoView.vue";
const hiddenMap = ref(true);
const pais = ref("");
const estado = ref("");
const ciudad = ref("");
const objCiudad = ref(null);
const showMap = (
  selectedPais,
  selectedEstado,
  selectedCiudad,
  ciudadToShowInMap
) => {
  pais.value = selectedPais;
  estado.value = selectedEstado;
  ciudad.value = selectedCiudad;
  objCiudad.value = ciudadToShowInMap;
  hiddenMap.value = false;
};
</script>

<template>
  <section
    class="container mx-auto flex flex-col gap-4 py-4 w-[90%] my-12 max-w-4xl"
  >
    <p class="text-white text-md p-4 text-center">
      ¡Hola! 👋 aqui tienes una lista completa de todos los países del mundo,
      detallando sus estados o regiones, así como sus ciudades o pueblos. Listo
      para ser usado en cualquier proyecto Colaboradores:👨🏻‍💻
      <b>Joan Cermeño</b> y <b>Todo el que quiera participar!</b> 🇻🇪
    </p>
  </section>
  <mainForm @mostrar-mapa="showMap"></mainForm>

  <section id="container-map" v-if="!hiddenMap" class="mt-22">
    <section
      class="container my-10 mx-auto flex flex-col p-5 w-[90%] max-w-4xl fondo"
    >
      <WikiInfoView
        ref="infoSite"
        :Pais="pais"
        :Estado="estado"
        :Ciudad="ciudad"
      ></WikiInfoView>

      <!-- aca comienza el mapa -->
      <mapComponent
        :Pais="pais"
        :Estado="estado"
        :Ciudad="ciudad"
        :ToRender="objCiudad"
      ></mapComponent>
    </section>
  </section>
</template>

<style scoped></style>
