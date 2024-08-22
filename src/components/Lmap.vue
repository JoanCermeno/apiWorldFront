<script setup>
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

onMounted(() => {
  initMap();
});

const initMap = () => {
  const map = L.map("map").setView([9.094, -69.299], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Cordenadas aproximadas de las principales sucursales de la emresa
  //   Acarigua: [9.558, -69.200]

  // Araure: [9.560, -69.220]

  // Agua Blanca: [9.660, -69.220]

  // Cojedito: [9.580, -69.240]

  // El Playón: [9.590, -69.210]

  // Píritu: [9.370, -69.120]

  // San Rafael de Onoto: [9.590, -69.080]

  // Turen: [9.590, -69.150]
  // array de marcaodrs de posocione
  const markers = [
    { lat: 9.045, lng: -69.749, popup: "Guanare" },
    { lat: 8.759, lng: -69.803, popup: "Guanarito" },
    { lat: 9.049, lng: -68.737, popup: "Ospino" },
    { lat: 8.889, lng: -69.339, popup: "Papelon" },
  ];

  // Agregar marcadores al mapa
  markers.forEach((marker) => {
    L.marker([marker.lat, marker.lng])
      .addTo(map)
      .bindPopup(marker.popup)
      .openPopup();
  });
};
</script>

<template>
  <div id="map" class="w-[80%] mx-auto z-0"></div>
</template>

<style scoped>
#map {
  height: 25rem;
  position: relative;
  z-index: 10; /* Ajusta este valor según sea necesario */
}
</style>
