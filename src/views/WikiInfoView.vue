<script setup>
import { data } from "autoprefixer";
import { ref, watch } from "vue";
let pageIdPais, pageIdEstado, pageIdCiudad;

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
const loaddin = ref({
  pais: true,
  estado: true,
  ciudad: true,
});
//mensaje en caso de que la api de wikipedia responda con un undefined
const msgEmpyResponse = "No se puedo encontrar informacion sobre";
//buscamos los datos
const getinfo = async (pais, estado, ciudad) => {
  //desplazamos al usuario a esta area.
  window.scrollBy({
    top: 2100, // Cantidad de píxeles para desplazar hacia abajo
    behavior: "smooth",
  });

  //console.log("Pidiendo datos a la wikipedia");

  const responseWipediaPais = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=` +
      pais
  );
  const dataPais = await responseWipediaPais.json();
  loaddin.value.pais = false;
  //extayendo el primer resultado de la wikipedia;
  // console.log(dataPais.query.search[0].snippet);
  if (dataPais.query.search.length == 0) {
    //validando que la informacion no este vacia
    infoPais.value = `${msgEmpyResponse} este pais 🫤`;
  } else {
    infoPais.value = dataPais.query.search[0].snippet;
    pageIdPais = dataPais.query.search[0].pageid;
  }

  const responseWipediaEstado = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=estado ` +
      estado
  );
  const dataEstado = await responseWipediaEstado.json();
  loaddin.value.estado = false;

  if (dataEstado.query.search.length == 0) {
    //validando de que la informacion solicitada de este estado no sea undefined
    infoEstado.value = `${msgEmpyResponse} este estado 🫤`;
  } else {
    infoEstado.value = dataEstado.query.search[0].snippet;
    pageIdEstado = dataEstado.query.search[0].pageid;
  }

  const responseWipediaCiudad = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=ciudad de` +
      ciudad
  );
  const dataCiudad = await responseWipediaCiudad.json();
  loaddin.value.ciudad = false;

  //validando que exista la informacion de la ciudad solicitada
  if (dataCiudad.query.search.length == 0) {
    infoCiudad.value = `${msgEmpyResponse} esta ciudad 🫤`;
  } else {
    infoCiudad.value = dataCiudad.query.search[0].snippet;
    pageIdCiudad = dataCiudad.query.search[0].pageid;
  }

  //console.log(infoPais, infoEstado, infoCiudad);
};

// Observar cambios en las props
watch(
  () => [props.Pais, props.Estado, props.Ciudad],
  ([newPais, newEstado, newCiudad]) => {
    //mandamos a llamr a la funcion pedir info
    //establecemos los cargadores a true
    loaddin.value.pais = true;
    loaddin.value.estado = true;
    loaddin.value.ciudad = true;

    getinfo(newPais, newEstado, newCiudad);
  },
  { immediate: true } // Ejecuta la función inmediatamente con los valores actuales
);
</script>

<template>
  <div class="p-5">
    <div class="flex w-52 flex-col gap-4" v-show="loaddin.pais">
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>

    <div v-show="!loaddin.pais">
      <h1>{{ Pais }}</h1>
      <p v-html="infoPais"></p>
      <a :href="`https://es.wikipedia.org/?curid=${pageIdPais}`" class="link"
        >leer mas en wikipedia</a
      >
    </div>
  </div>
  <div class="p-5">
    <div class="flex w-52 flex-col gap-4" v-show="loaddin.estado">
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>

    <div v-show="!loaddin.estado">
      <h1>{{ Estado }}</h1>
      <p v-html="infoEstado"></p>
      <a :href="`https://es.wikipedia.org/?curid=${pageIdEstado}`" class="link"
        >leer mas en wikipedia</a
      >
    </div>
  </div>
  <div class="p-5">
    <div class="flex w-52 flex-col gap-4" v-show="loaddin.ciudad">
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>

    <div v-show="!loaddin.ciudad">
      <h1>{{ Ciudad }}</h1>
      <p v-html="infoCiudad"></p>
      <a :href="`https://es.wikipedia.org/?curid=${pageIdCiudad}`" class="link"
        >leer mas en wikipedia</a
      >
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}
</style>
