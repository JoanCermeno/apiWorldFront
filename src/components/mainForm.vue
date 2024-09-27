<script setup>
import { ref, onMounted, toRaw } from "vue";
import Swal from "sweetalert2";
// Importa `defineEmits` para emitir eventos al componente padre
const emit = defineEmits(["mostrar-mapa"]); // Lista de eventos que el componente emitirá
const apiURL = import.meta.env.VITE_API_URL;
const listPais = ref([]);
const listEstados = ref([]);
const listCiudades = ref([]);
const selectedPais = ref("");
const selectedEstado = ref("");
const selectedCiudad = ref("");
const loaddingPais = ref(true);
const loaddingEstado = ref(false);
const loaddingCiudad = ref(false);
const httpRequest = ref({
  Pais: "",
  Estado: "",
  Ciudad: "",
});
const inputs = ref({
  Pais: false,
  Estado: false,
  Ciudad: false,
});
const inputsDisable = ref(false);

async function pedirData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al hacer fecth:", error);
    throw error;
  }
}

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
    listPais.value = await pedirData(`${apiURL}/pais`, {
      method: "GET", // o 'POST', según tu caso
      headers: {
        "Content-Type": "application/json",
      },
    });

    httpRequest.value.Pais = `/pais`;
  } catch (error) {
    mostarAlerta("Ocurrio un problema al mostrar los paises.");
    //desactivamos todos los imputs
    inputsDisable.value = true;
    console.error("Failed to fetch pais:", error);
    console.log(inputsDisable.value);
  } finally {
    loaddingPais.value = false;
  }
});

// Cargar estados al formulario
async function traerEstadosDelPais(id_pais) {
  listEstados.value = await pedirData(`${apiURL}/estado?id_pais=${id_pais}`, {
    method: "GET", // o 'POST', según tu caso
    headers: {
      "ngrok-skip-browser-warning": "true", // Este encabezado evita la advertencia
      "Content-Type": "application/json",
    },
  });
  loaddingEstado.value = false;
  httpRequest.value.Estado = `/estado?id_pais=${id_pais}`;
}

function changePais(event) {
  //vaciamos todos los demas inputs
  console.log(`input pais canbio limpiando inputs`);
  selectedEstado.value = "";
  selectedCiudad.value = "";
  const infoPaisSelected = listPais.value.find(
    (pais) => pais.name === event.target.value
  );
  //validamos que el pais sea un pais valido
  if (infoPaisSelected == undefined) {
    inputs.value.Pais = true;
  } else {
    inputs.value.Pais = false;
    console.log(inputs.value);
    traerEstadosDelPais(infoPaisSelected.id);
    loaddingEstado.value = true;
  }
}
function cambioInputEstado(event) {
  console.log("se actualiz el imput estado");
  const infoselectedEstado = listEstados.value.find(
    (estado) => estado.name === event.target.value
  );

  if (infoselectedEstado == undefined) {
    inputs.value.Estado = true;
  } else {
    inputs.value.Estado = false;
    traerCiudades(infoselectedEstado.country_id, infoselectedEstado.id);
    loaddingCiudad.value = true;
  }
}
//evento cambio de ciudad
function cambioInputCiudad(event) {
  console.log("se actualiz el imput Ciudad");
  const infoselectedCiudad = listCiudades.value.find(
    (ciudad) => ciudad.name === event.target.value
  );

  if (infoselectedCiudad == undefined) {
    inputs.value.Ciudad = true;
  } else {
    inputs.value.Ciudad = false;
  }
}

// cargar ciudades
async function traerCiudades(pais_id, estado_id) {
  listCiudades.value = await pedirData(
    `${apiURL}/ciudad?pais_id=${pais_id}&estado_id=${estado_id}`,
    {
      method: "GET", // o 'POST', según tu caso
      headers: {
        "ngrok-skip-browser-warning": "true", // Este encabezado evita la advertencia
        "Content-Type": "application/json",
      },
    }
  );
  loaddingCiudad.value = false;
  //mandamos a mostrar la consulta a la api
  httpRequest.value.Ciudad = `/ciudad?pais_id=${pais_id}&estado_id=${estado_id}`;
}

function emitirMostrarMapa(e) {
  e.preventDefault();

  const ciudadesRaw = listCiudades.value.map((ciudad) => toRaw(ciudad));
  const ciudadToShowInMap = ciudadesRaw.find(
    (ciudad) => ciudad.name == selectedCiudad.value
  );
  console.log(ciudadToShowInMap);
  emit(
    "mostrar-mapa",
    selectedPais.value,
    selectedEstado.value,
    selectedCiudad.value,
    ciudadToShowInMap
  );
}
</script>

<template>
  <section class="formBackground p-5 rounded w-[90%] mx-auto max-w-lg">
    <h2 class="text-center text-4xl mb-2">Demo</h2>
    <form action="#" method="get">
      <div class="container">
        <label for="pais" class="text-sm font-medium leading-6"
          >Pais
          <span
            v-if="loaddingPais"
            class="loading loading-ring loading-lg absolute left-12"
          ></span>
        </label>
        <input
          type="text"
          id="pais-input"
          name="pais"
          list="pais"
          class="p-2 rounded border w-full"
          :placeholder="inputsDisable ? 'Servicio no disponible' : 'Pais'"
          autocomplete="off"
          v-model="selectedPais"
          @change="changePais"
          :class="{ invalidInput: inputs.Pais, disabled: inputsDisable }"
          :disabled="inputsDisable"
          required
        />

        <datalist v-if="!loaddingPais" id="pais">
          <option
            v-for="(pais, index) in listPais"
            :key="pais.id"
            :value="pais.name"
          >
            {{ pais.name }}
          </option>
        </datalist>
        <pre><div class="badge" v-if="httpRequest.Pais !== ''">GET</div> {{ httpRequest.Pais }}</pre>
      </div>

      <div class="container">
        <label for="estado" class="text-sm font-medium leading-6"
          >Estado
          <span
            v-if="loaddingEstado"
            class="loading loading-ring loading-lg absolute left-12"
          ></span>
        </label>
        <input
          type="text"
          id="estado-input"
          list="estado"
          class="w-full p-2 rounded border"
          autocomplete="off"
          v-model="selectedEstado"
          @change="cambioInputEstado"
          required
          :class="{ invalidInput: inputs.Estado, disabled: inputsDisable }"
          :disabled="inputsDisable"
          :placeholder="
            inputsDisable ? 'Servicio no disponible' : 'Selecione un estado'
          "
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
        <pre><div class="badge" v-if="httpRequest.Estado !== ''">GET</div> {{ httpRequest.Estado }}</pre>
      </div>

      <div class="container">
        <label for="ciudad" class="text-sm font-medium leading-6"
          >Ciudad

          <span
            v-if="loaddingCiudad"
            class="loading loading-ring loading-lg absolute left-12"
          ></span>
        </label>
        <input
          type="text"
          id="ciudad-input"
          list="ciudad"
          :placeholder="inputsDisable ? 'Servicio no disponible' : 'Ciudad'"
          autocomplete="off"
          @change="cambioInputCiudad"
          class="w-full p-2 rounded border"
          v-model="selectedCiudad"
          :class="{ invalidInput: inputs.Ciudad, disabled: inputsDisable }"
          :disabled="inputsDisable"
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
        <pre> <div class="badge" v-if="httpRequest.Ciudad !== ''">GET</div> {{ httpRequest.Ciudad }}</pre>
      </div>

      <!-- estart button send -->
      <div class="containerButton container">
        <button
          type="submit"
          class="btn btn-block btn-accent text-neutral"
          @click="emitirMostrarMapa"
        >
          Consultar Info
        </button>
      </div>
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
  background-color: #e5e5e5;
  padding: 10px;
}

.formBackground {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12.5px);
  -webkit-backdrop-filter: blur(12.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.invalidInput {
  box-shadow: 0 0 0 2px rgb(255, 92, 92); /* Crear el efecto de borde rojizo */
  background-color: rgb(255, 207, 207);
}

pre {
  margin: 10px auto;
  font-family: monospace;
}
.disabled {
  cursor: not-allowed;
}
</style>
