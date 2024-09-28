<script setup>
import { onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osmtogeojson from "osmtogeojson";

const props = defineProps({
  Pais: String,
  Estado: String,
  Ciudad: String,
  ToRender: Object, // Contiene la información de la ciudad
});

// Función para hacer la petición a Overpass API y obtener los límites de la ciudad
const fetchCityBoundaries = async (lat, lon) => {
  const query = `
    [out:json];
    (
      relation["boundary"="administrative"](around:600,${lat},${lon});
    );
    out geom;
    `;

  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  const response = await fetch(overpassUrl);
  const data = await response.json();
  console.log(data);
  return data;
};

let map;

onMounted(async () => {
  initMap(props.ToRender.latitude, props.ToRender.longitude);
});

// Observar cambios en las coordenadas de la ciudad (props.ToRender) y actualizar el mapa
watch(
  () => props.ToRender,
  async (newCity) => {
    if (newCity.latitude && newCity.longitude) {
      updateMap(newCity.latitude, newCity.longitude);
    }
  },
  { deep: true }
);

const initMap = async (lat, lon) => {
  map = L.map("map").setView([lat, lon], 12);

  // Agregar capa de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  await updateMap(lat, lon); // Inicializar con la primera ciudad
};

const updateMap = async (lat, lon) => {
  let geojson = undefined;
  // Limpiar cualquier capa previa en el mapa
  map.eachLayer((layer) => {
    if (!layer._url) map.removeLayer(layer); // Mantener solo la capa de tiles
  });

  // Obtener límites de la ciudad desde Overpass API
  const geoJsonData = await fetchCityBoundaries(lat, lon);
  console.log("objeto de geoJsonDate debe ser asi");
  console.log(geoJsonData);

  const indexRouteToRender = geoJsonData.elements.findIndex((item) =>
    item.tags.name.includes(props.ToRender.name)
  );
  // console.log("Coincidencias encontrada?");
  console.log(indexRouteToRender);

  if (indexRouteToRender != -1) {
    geoJsonData.elements = [geoJsonData.elements[indexRouteToRender]];
    // Convertir el resultado a GeoJSON para agregar al mapa
    geojson = osmtogeojson(geoJsonData);
    // Agregar los límites de la ciudad al mapa
    L.geoJSON(geojson, {
      style: () => ({
        color: "blue",
        weight: 1,
        fillOpacity: 0.1,
      }),
    }).addTo(map);

    // Ajustar la vista del mapa según los nuevos límites
    map.setView([lat, lon], 12);
  } else {
    console.log("pintamos el circulo");
    const radiusInMeters = 900; //esta unidad son metros
    L.circle([lat, lon], { radius: radiusInMeters })
      .setStyle({
        color: "blue",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.2,
      })
      .addTo(map);

    // Ajustar la vista del mapa para centrar el círculo
    map.setView([lat, lon], 12);
  }
};
</script>

<template>
  <!-- Aca vamos a mostrar el enlace para mandar a google maps -->
  <div
    class="container flex flex-col p-5 justify-center items-center gap-4 lg:flex-row lg:justify-between"
  >
    <div class="flex gap-2 justify-center max-h-6">
      <div id="latitude" class="badge truncate rounded-md px-2">
        Lat:
        {{ props.ToRender.latitude }}
      </div>

      <div id="longitud" class="badge truncate rounded-md px-2">
        Long
        {{ props.ToRender.longitude }}
      </div>
    </div>
    <!-- https://www.google.com/maps/place/${ciudad.name} ${estadoName} ${paisName} -->
    <a
      class="text-center btn"
      :href="`https://www.google.com/maps/place/${props.ToRender.latitude},${props.ToRender.longitude}`"
      target="_blank"
      >Ver en Google Maps 🗺️</a
    >
  </div>
  <div id="map" class="w-full mx-auto z-0"></div>
</template>

<style scoped>
#map {
  height: 25rem;
  position: relative;
  z-index: 10;
}
</style>
