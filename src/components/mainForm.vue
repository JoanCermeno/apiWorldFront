<script setup>
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

const listPais = ["venezuela", "Esp", "uruguay", "canada"];
const listEstados = ["guarico", "portuguesa", "barinas"];
const listCiudades = ["guanare", "merida", "guanarito"];
</script>

<template>
  <section class="bg-slate-500 p-5 rounded w-[90%] mx-auto">
    <h2 class="text-white text-center text-4xl mb-2">seleciona...</h2>
    <form action="#" method="get">
      <div class="container">
        <label for="estado" class="text-sm font-medium leading-6">Pais</label>
        <input
          type="text"
          id="pais-input"
          name="pais"
          list="pais"
          placeholder="Pais"
          class="p-2 rounded border w-full"
        />

        <datalist id="pais">
          <option
            v-for="(pais, index) in listPais"
            :key="index"
            :value="pais"
          ></option>
        </datalist>
      </div>

      <div class="container">
        <label for="estado" class="text-sm font-medium leading-6">Estado</label>
        <input
          type="text"
          id="estado-input"
          list="estado"
          placeholder="Seleciona un estado"
          class="w-full p-2 rounded border"
        />
        <datalist id="estado">
          <option
            v-for="(estado, index) in listEstados"
            :key="index"
            :value="estado"
          ></option>
        </datalist>
      </div>

      <div class="container">
        <label for="ciudad" class="text-sm font-medium leading-6">Ciudad</label>
        <input
          type="text"
          id="ciudad-input"
          list="ciudad"
          placeholder="buscar ciudad"
          class="w-full p-2 rounded border"
        />
        <datalist id="ciudad">
          <option
            v-for="(ciudad, index) in listCiudades"
            :key="index"
            :value="ciudad"
          ></option>
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
  background-color: aliceblue;
}
</style>
