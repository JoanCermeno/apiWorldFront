<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
//sacando la url de la API
const baseApiUrl = import.meta.env.VITE_API_URL;
const documentacionURL = baseApiUrl + "/docs";
console.log(documentacionURL);
let menuIsVisible = ref(false);

window.addEventListener("resize", () => {
  //si la ventana es igual o mayor a lg mostrar el menu pantalla completa
  if (window.innerWidth >= 1024) {
    menuIsVisible.value = false;
  } else {
    menuIsVisible.value = true;
  }
});
</script>

<template>
  <header
    class="fixed top-5 left-[5%] w-[90%] z-10 py-2 px-4 flex lg:flex-row flex-col justify-between align-items-center lg:align-items-start fondo"
  >
    <router-link to="/">
      <section class="text-2xl flex gap-2 items-center">
        <span class="texto-con-degradado">{ API World }</span> 🌎
      </section>
    </router-link>

    <!-- section con los enlaces de interes  -->

    <nav
      class="flex lg:flex-row justify-between flex-col text-center h-100 px-2"
      :class="{ ocultar: menuIsVisible }"
    >
      <ul
        class="h-[50%] lg:h-full mx-auto justify-center flex flex-col lg:flex-row items-center gap-10"
      >
        <!-- Aplicamos Flexbox y centramos el contenido dentro de cada <li> -->
        <a :href="documentacionURL">
          <li class="flex items-center justify-center">Documentación</li>
        </a>
        <li class="flex items-center justify-center">About</li>
        <li class="flex items-center justify-center">About</li>
        <li class="flex items-center justify-center">About</li>
      </ul>
    </nav>

    <div
      class="lg:hidden absolute right-4 cursor-pointer"
      @click="menuIsVisible = !menuIsVisible"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-7"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  </header>
</template>

<style scoped>
.texto-con-degradado {
  font-size: 24px;
  background-image: linear-gradient(to left, rgb(245, 152, 245), #6ddfff);
  background-clip: text;
  background-size: 200%;
  -webkit-text-fill-color: transparent;
  /* Fallback para navegadores que no soportan las propiedades anteriores */
  color: #ffffff;
  animation: moverGradient linear infinite 10s;
}

@keyframes moverGradient {
  0% {
    background-position: 0%;
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 10%;
  }
}

li {
  position: relative;
  user-select: none;
  color: #ddd;
  cursor: pointer;
  font-size: large;
}
li::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  transition: 0.2s ease-out width;
  padding: 10px 30px;
  border-radius: 5px;
  transition: 0.5s background ease;
}
li:hover::after {
  background-color: #fafafa41;
}
/* transiion del menu */

nav {
  transition: all 0.2s linear;
  max-height: 200px;
  max-width: 100%;
  overflow: hidden;
}

.ocultar {
  overflow: hidden;
  max-height: 0px;

  transition: all 0.5s;
}
</style>
