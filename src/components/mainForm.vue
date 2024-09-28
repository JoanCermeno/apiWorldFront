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
const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texto copiado al portapapeles");
  } catch (err) {
    console.error("Error al copiar:", err);
  }
};

const copiarEndoint = (e) => {
  // si es uno pais, si dos ,estado si 3 ciudad si difenrete no copiar nada al clipboard
  const endponitCliked = e.explicitOriginalTarget.id;

  console.log(e.explicitOriginalTarget);
  switch (endponitCliked) {
    case "endpointPais":
      // console.log(httpRequest.value.Pais);
      copyTextToClipboard(apiURL + httpRequest.value.Pais);
      break;
    case "endpointEstado":
      //console.log(httpRequest.value.Estado);
      copyTextToClipboard(apiURL + httpRequest.value.Estado);

      break;
    case "endpointCiudad":
      // console.log(httpRequest.value.Ciudad);
      copyTextToClipboard(apiURL + httpRequest.value.Ciudad);
      break;
    case "Layer_3":
      //layer es el id de cada copi icon svg
      copyTextToClipboard(apiURL + httpRequest.value.Pais);
      break;
    case "Layer_2":
      copyTextToClipboard(apiURL + httpRequest.value.Estado);

      break;
    case "Layer_1":
      copyTextToClipboard(apiURL + httpRequest.value.Ciudad);

      break;
    default:
      console.log("no cpiar nada al cliboard");
  }
};
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
        <div id="endpointPais" class="text-pre-request" @click="copiarEndoint">
          <div class="overflow-hidden truncate">
            <div class="badge" v-if="httpRequest.Pais !== ''">GET</div>
            {{ httpRequest.Pais }}
          </div>

          <svg
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_3"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            enable-background="new 0 0 64 64"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <g id="Text-files">
                <path
                  d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
                />
                <path
                  d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
                />
                <path
                  d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
                />
                <path
                  d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"
                />
                <path
                  d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"
                />
              </g>
            </g>
          </svg>
        </div>
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
        <div
          id="endpointEstado"
          class="text-pre-request"
          @click="copiarEndoint"
        >
          <div class="overflow-hidden truncate">
            <div class="badge" v-if="httpRequest.Estado !== ''">GET</div>
            {{ httpRequest.Estado }}
          </div>

          <svg
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            enable-background="new 0 0 64 64"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <g id="Text-files">
                <path
                  d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
                />
                <path
                  d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
                />
                <path
                  d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
                />
                <path
                  d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"
                />
                <path
                  d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"
                />
              </g>
            </g>
          </svg>
        </div>
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
        <div
          id="endpointCiudad"
          class="text-pre-request"
          @click="copiarEndoint"
        >
          <div class="overflow-hidden truncate">
            <div class="badge" v-if="httpRequest.Ciudad !== ''">GET</div>
            {{ httpRequest.Ciudad }}
          </div>

          <svg
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            enable-background="new 0 0 64 64"
            xml:space="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <g id="Text-files">
                <path
                  d="M53.9791489,9.1429005H50.010849c-0.0826988,0-0.1562004,0.0283995-0.2331009,0.0469999V5.0228 C49.7777481,2.253,47.4731483,0,44.6398468,0h-34.422596C7.3839517,0,5.0793519,2.253,5.0793519,5.0228v46.8432999 c0,2.7697983,2.3045998,5.0228004,5.1378999,5.0228004h6.0367002v2.2678986C16.253952,61.8274002,18.4702511,64,21.1954517,64 h32.783699c2.7252007,0,4.9414978-2.1725998,4.9414978-4.8432007V13.9861002 C58.9206467,11.3155003,56.7043495,9.1429005,53.9791489,9.1429005z M7.1110516,51.8661003V5.0228 c0-1.6487999,1.3938999-2.9909999,3.1062002-2.9909999h34.422596c1.7123032,0,3.1062012,1.3422,3.1062012,2.9909999v46.8432999 c0,1.6487999-1.393898,2.9911003-3.1062012,2.9911003h-34.422596C8.5049515,54.8572006,7.1110516,53.5149002,7.1110516,51.8661003z M56.8888474,59.1567993c0,1.550602-1.3055,2.8115005-2.9096985,2.8115005h-32.783699 c-1.6042004,0-2.9097996-1.2608986-2.9097996-2.8115005v-2.2678986h26.3541946 c2.8333015,0,5.1379013-2.2530022,5.1379013-5.0228004V11.1275997c0.0769005,0.0186005,0.1504021,0.0469999,0.2331009,0.0469999 h3.9682999c1.6041985,0,2.9096985,1.2609005,2.9096985,2.8115005V59.1567993z"
                />
                <path
                  d="M38.6031494,13.2063999H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0158005 c0,0.5615997,0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4542999,1.0158997-1.0158997 C39.6190491,13.6606998,39.16465,13.2063999,38.6031494,13.2063999z"
                />
                <path
                  d="M38.6031494,21.3334007H16.253952c-0.5615005,0-1.0159006,0.4542999-1.0159006,1.0157986 c0,0.5615005,0.4544001,1.0159016,1.0159006,1.0159016h22.3491974c0.5615005,0,1.0158997-0.454401,1.0158997-1.0159016 C39.6190491,21.7877007,39.16465,21.3334007,38.6031494,21.3334007z"
                />
                <path
                  d="M38.6031494,29.4603004H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h22.3491974c0.5615005,0,1.0158997-0.4543991,1.0158997-1.0158997 S39.16465,29.4603004,38.6031494,29.4603004z"
                />
                <path
                  d="M28.4444485,37.5872993H16.253952c-0.5615005,0-1.0159006,0.4543991-1.0159006,1.0158997 s0.4544001,1.0158997,1.0159006,1.0158997h12.1904964c0.5615025,0,1.0158005-0.4543991,1.0158005-1.0158997 S29.0059509,37.5872993,28.4444485,37.5872993z"
                />
              </g>
            </g>
          </svg>
        </div>
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
.text-pre-request {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5rem 0px;
  padding: 0.5rem 10px;
  background-color: #1e3257;
  font-family: monospace;
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 1s ease;
}
.text-pre-request > svg {
  fill: #e5e5e5;
}
svg:hover {
  fill: #fff;
}
.text-pre-request:hover {
  background-color: #33486e;
}

label {
  margin-left: 10px;
}

.disabled {
  cursor: not-allowed;
}
</style>
