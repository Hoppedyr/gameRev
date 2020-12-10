<template>
  <div class="container-fluid bg-dark">
    <Navbar />
    <div class="row">
      <div v-for="game in games" :key="game.Game" class="col-3 pb-2">
        <div class="card bg-secondary h-100">
          <div class="card-text text-white">
            <p>Game: {{ game.Game }}</p>
            <p>Owners: {{ game.Owners ? game.Owners : "unknown" }}</p>
            <p>Price: {{ game.Price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../../configs/config.json";
export default {
  data() {
    return {
      games: [],
    };
  },
  created() {
    this.fetchSomething();
    setInterval(() => {
      this.fetchSomething();
    }, 10000);
  },
  methods: {
    async fetchSomething() {
      const games = await this.$axios.$get(`${apiUrl}/api/v1/webscrape`);
      this.games = games;
      console.log(this.games);
    },
  },
};
</script>

<style>
</style>