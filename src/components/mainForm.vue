<script setup>
import { ref, onMounted } from "vue";

const loadding = ref(true);
const listPais = ref([]);
const listEstados = ref([]);
const listCiudades = ref([]);
const selectedPais = ref("");
const estadoSelected = ref("");
const ciudadSelected = ref([]);

//pedir datos mediante fetch
async function pedirData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
//disparador de alertas Sweetalert2
import Swal from "sweetalert2";

function mostarAlerta(title) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "warning",
    title: `${title}`,
    footer: '<a href="#">Si el problma persiste REPORTE ESTE BUG?</a>',
    timer: 5000,
  });
}

onMounted(async () => {
  try {
    listPais.value = await pedirData("http://localhost:6969/pais");
  } catch (error) {
    mostarAlerta("Ocurrio un problema al mostrar los paises.");

    console.error("Failed to fetch pais:", error);
  } finally {
    loadding.value = false;
  }
});

// Cargar estados al formulario
async function traerEstadosDelPais(id_pais) {
  listEstados.value = await pedirData(
    `http://localhost:6969/estado?id_pais=${id_pais}`
  );
}

function handleChange(event) {
  const infoPaisSelected = listPais.value.find(
    (pais) => pais.name === event.target.value
  );
  traerEstadosDelPais(infoPaisSelected.id);
}

// cargar ciudades
async function traerCiudades(id_estado) {
  listCiudades.value = await pedirData(
    `http://localhost:6969/ciudad?id_estado=${id_estado}`
  );
  console.log(listCiudades.value);
}

function cambioInputEstado(event) {
  console.log("Cmabio el imput estado");
  const infoEstadoSelected = listEstados.value.find(
    (estado) => estado.name === event.target.value
  );
  traerCiudades(infoEstadoSelected.id);
}
</script>

<template>
  <section class="formBackground p-5 rounded w-[90%] mx-auto">
    <h2 class="text-center text-4xl mb-2">Demo</h2>
    <form action="#" method="get">
      <div v-if="loadding">Cargando...</div>

      <div class="container">
        <label for="pais" class="text-sm font-medium leading-6">Pais</label>
        <input
          type="text"
          id="pais-input"
          name="pais"
          list="pais"
          placeholder="Pais"
          class="p-2 rounded border w-full"
          autocomplete="off"
          v-model="selectedPais"
          @change="handleChange"
        />

        <datalist v-if="!loadding" id="pais">
          <option
            v-for="(pais, index) in listPais"
            :key="pais.id"
            :value="pais.name"
          >
            {{ pais.name }}
          </option>
        </datalist>
        <p>Seleccionado: {{ selectedPais }}</p>
      </div>

      <div class="container">
        <label for="estado" class="text-sm font-medium leading-6">Estado</label>
        <input
          type="text"
          id="estado-input"
          list="estado"
          placeholder="Seleciona un estado"
          class="w-full p-2 rounded border"
          autocomplete="off"
          v-model="estadoSelected"
          @change="cambioInputEstado"
        />
        <datalist id="estado">
          <option
            v-for="(estado, index) in listEstados"
            :key="estado.id"
            :value="estado.name"
          >
            {{ estado.name }}
          </option>
        </datalist>
        <p>Seleccionado: {{ estadoSelected }}</p>
      </div>

      <div class="container">
        <label for="ciudad" class="text-sm font-medium leading-6">Ciudad</label>
        <input
          type="text"
          id="ciudad-input"
          list="ciudad"
          placeholder="buscar ciudad"
          autocomplete="off"
          class="w-full p-2 rounded border"
        />
        <datalist id="ciudad">
          <option
            v-for="(ciudad, index) in listCiudades"
            :key="index"
            :value="ciudad.name"
          >
            {{ ciudad.name }}
          </option>
        </datalist>
      </div>

      <!-- estart button send -->
      <div class="containerButton container">
        <button type="submit" class="btn btn-block btn-accent">
          Consultar Info
        </button>
      </div>

      <small>Vamos por mas!</small>
    </form>
  </section>
</template>
<style scoped>
.container {
  margin: 1rem auto;
}
.containerButton {
  margin: 2rem auto;
}
input {
  margin-top: 0.5rem;
  color: darkblue;
  background-color: #fff;
}

.formBackground {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12.5px);
  -webkit-backdrop-filter: blur(12.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
