<script setup>
const baseURL = 'localhost:6969'

</script>

<template>
  <section class="container fondo max-w-4xl mx-auto p-10">
    <h1 id="introduccion" class="text-4xl mb-5">Introduccion</h1>
    <p>
      Esta API proporciona acceso a una base de datos relacional que contiene un
      listado completo de países, estados y regiones de todo el mundo. Su
      propósito es ofrecer un punto de acceso simple y gratuito, sin necesidad
      de autenticación, para que los desarrolladores puedan integrarla
      fácilmente en sus proyectos.
    </p>  
    <p class="mt-5">
      API cuenta con tres endpoints principales: <div class="badge">Pais</div>, <div class="badge">Estado</div> y <div class="badge">Ciudad</div>,
      permitiendo obtener información geográfica detallada. Es ideal para ser
      usada en proyectos de cualquier tipo, y se puede implementar tanto en
      entornos de producción como de pruebas. Para pruebas rápidas, también
      puede ser utilizada mediante un CDN, lo que agiliza su integración.
    </p>

    <h2 class="text-4xl my-5">Endpoints Disponibles</h2>

    <!-- Mostrar el listado de endpoints -->
    <div class="endpoint">
      <h3>1. Obtener Información de Pais</h3>

      <p>
        <strong>GET</strong> <code>https://{{ baseURL }}/pais</code>
      </p>
      <p>Retorna una lista de todos los países.</p>
      <div class="mockup-code mt-5">
      <pre><code> [
      {
        "id": 1,
        "name": "Venezuela",
        "code": "ve"
      },
      ...
      {
        "id": 2,
        "name": "Peru",
        "code": "pe"
      }
    ]</code>
      </pre>
    </div>

  </div>

    <div class="endpoint">
      <h3>2. Obtener Información de Estados</h3>
      <p>
        <strong>GET</strong> <code>https://{{ baseURL }}/estado</code>
      </p>
      <p>Retorna una lista de todos los estados por país.</p>

      <h4>Parámetros</h4>
      <ul>
        <li><strong>pais</strong> (obligatorio) - El nombre o código del país.</li>
      </ul>

      <h4>Ejemplo de Solicitud</h4>
      <p><code>https://tuapi.com/api/estado?pais=VE</code></p>

      <h4>Ejemplo de Respuesta</h4>
      <pre><code>
[
  {
    "id": 1,
    "name": "Carabobo",
    "isoCode": "CAR"
  },
  {
    "id": 2,
    "name": "Miranda",
    "isoCode": "MIR"
  }
]
      </code></pre>
    </div>

    <div class="endpoint">
      <h3>3. Obtener Información de Ciudades</h3>
      <p>
        <strong>GET</strong> <code>https://tuapi.com/api/ciudad</code>
      </p>
      <p>Retorna una lista de todas las ciudades por estado.</p>

      <h4>Parámetros</h4>
      <ul>
        <li><strong>estado</strong> (obligatorio) - El nombre o código del estado.</li>
      </ul>

      <h4>Ejemplo de Solicitud</h4>
      <p><code>https://tuapi.com/api/ciudad?estado=CAR</code></p>

      <h4>Ejemplo de Respuesta</h4>
      <pre><code>
[
  {
    "id": 1,
    "name": "Valencia"
  },
  {
    "id": 2,
    "name": "Puerto Cabello"
  }
]
      </code></pre>
    </div>
  </section>
</template>

<style scoped></style>
