<script setup></script>
<template>
  <footer class="footer bg-neutral text-neutral-content p-10">
    <aside>
      <div class="flex flex-row">
        <p class="texto-con-degradado py-2">{ API World }</p>
        <p class="text-3xl ml-2">🌎</p>
      </div>

      <p>
        Create by Joan Cermeño. <br />
        a project open source @ 2024
      </p>
    </aside>

    <nav>
      <h6 class="footer-title">Social</h6>
      <div class="grid grid-flow-col gap-4">
        <a href="https://medium.com/@joangabriel">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4093 12.2471C13.4093 15.6973 10.6314 18.4944 7.20454 18.4944C3.77771 18.4944 1 15.6982 1 12.2471C1 8.79604 3.77792 6 7.20454 6C10.6312 6 13.4093 8.79688 13.4093 12.2471ZM20.216 12.2471C20.216 15.4951 18.8269 18.1278 17.1136 18.1278C15.4003 18.1278 14.0112 15.4942 14.0112 12.2471C14.0112 8.99998 15.4003 6.36639 17.1136 6.36639C18.8269 6.36639 20.216 8.99998 20.216 12.2471ZM23 12.2471C23 15.1571 22.5114 17.516 21.9088 17.516C21.3063 17.516 20.8177 15.1563 20.8177 12.2471C20.8177 9.33792 21.3063 6.97822 21.9091 6.97822C22.5118 6.97822 23 9.33729 23 12.2471Z"
              fill="#D7DDE3"
            />
          </svg>
        </a>
        <a href="https://www.youtube.com/@JoanCermeno">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            ></path>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/joan-cerme%C3%B1o-06680025a/">
          <svg
            fill="#D7DDE3"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#D7DDE3"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <title>linkedin</title>
              <path
                d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"
              />
            </g>
          </svg>
        </a>
        <a href="https://github.com/JoanCermeno">
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                fill="#D7DDE3"
                fill-rule="evenodd"
                d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z"
                clip-rule="evenodd"
              />
            </g>
          </svg>
        </a>
      </div>
      <p>Sigue conmigo el desarrollo de este proyecto :D</p>
    </nav>
  </footer>
</template>

<style scoped>
svg:hover {
  transform: scale(1.2);
  filter: brightness(12);
}

svg {
  transition-property: transform;
  transition-duration: 0.5s;
}
</style>
