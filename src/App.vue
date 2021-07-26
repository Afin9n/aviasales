<template>
  <div id="app">
    <navbar />
    <div class="app__container">
      <avia-sales />
    </div>
  </div>
</template>

<script>
import AviaSales from './pages/AviaSales.vue'
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
    AviaSales
  }
}
</script>

<style lang="scss">
  @import "scss/app.css";

  .app__container {
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    min-height: 100vh;
    justify-content: center;
    flex-direction: row;
    gap: 2rem;

    @media (max-width: 768px) {
      display: block;
    }
  }
</style>
