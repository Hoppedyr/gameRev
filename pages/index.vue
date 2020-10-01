<template>
  <div class="container-fluid bg-dark">
    <h1 class="title">gameRev</h1>
    <div class="row">
      <div v-for="game in games" :key="game.id" class="col-3 pb-2">
        <div class="card bg-secondary">
          <nuxt-link :to="{ path: '/game', query: { id: game.id } }">
            <img
              :src="game.background_image"
              alt="Girl in a jacket"
              class="card-img-top"
            />
            <div class="card-text text-white">
              <p>{{ game.name }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: [],
    };
  },
  created() {
    this.fetchSomething();
  },
  methods: {
    async fetchSomething() {
      const games = await this.$axios.$get("https://api.rawg.io/api/games");
      this.games = games.results;
      console.log(this.games);
    },
  },
};
</script>

<style>
</style>
