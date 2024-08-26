<script setup>
import { ref } from "vue";
//definimos las variables que vamos a mostrar (props)
const props = defineProps({
  Pais: String,
  Estado: String,
  Ciudad: String,
});

//informcion de wikipedia
const infoPais = ref("");
const infoEstado = ref("");
const infoCiudad = ref("");

//buscamos los datos
const getinfo = async (pais, estado, ciudad) => {
  console.log("Pidiendo datos a la wikipedia");

  const responseWipediaPais = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=` +
      pais
  );
  const dataPais = await responseWipediaPais.json();
  //extayendo el primer resultado de la wikipedia;
  //console.log(data);
  infoPais.value = dataPais.query.search[0].snippet;

  const responseWipediaEstado = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=` +
      estado
  );
  const dataEstado = await responseWipediaEstado.json();
  infoEstado.value = dataEstado.query.search[0].snippet;

  const responseWipediaCiudad = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=` +
      ciudad
  );
  const dataCiudad = await responseWipediaCiudad.json();

  infoCiudad.value = dataCiudad.query.search[0].snippet;

  console.log(infoPais, infoEstado, infoCiudad);
};

getinfo(props.Pais, props.Estado, props.Ciudad);
</script>

<template>
  <div class="p-5">
    <h1>{{ Pais }}</h1>
    <p>{{ infoPais }}</p>
  </div>
  <div class="p-5">
    <h1>{{ Estado }}</h1>
    <p>{{ infoEstado }}</p>
  </div>
  <div class="p-5">
    <h1>{{ Ciudad }}</h1>
    <p>{{ infoCiudad }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}
</style>
