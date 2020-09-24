<template>
  <div class="container-fluid">
    <Logo />
    <h1 class="title">gameRev</h1>
    <div class="row">
      <div v-for="game in games" :key="game.id" class="col-4">
        <div class="card">
          <nuxt-link :to="{ path: '/game', query: { id: game.id } }">
            <div class="card-body">
              <p>{{ game.name }}</p>
              <img
                :src="game.background_image"
                alt="Girl in a jacket"
                class="img-fluid mx-auto"
              />
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
