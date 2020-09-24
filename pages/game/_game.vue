<template>
  <div class="container">
    <Logo />
    <div class="row">
      <div class="col">
        <h1>
          {{ game.name }}
        </h1>
        <p>Release Date: {{ game.released }}</p>
        <p>{{ game.description_raw }}</p>
      </div>
    </div>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" placeholder="Enter email" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Example textarea</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="row"></div>
      <div class="col">test</div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../../configs/config.json";

export default {
  data() {
    return {
      id: this.$route.query,
      game: {},
    };
  },

  created() {
    this.fetchGame();
    this.fetchReviews();
  },

  methods: {
    async fetchGame() {
      const game = await this.$axios.$get(
        `https://api.rawg.io/api/games/${this.id.id}`
      );
      this.game = game;
      console.log(this.game);
    },
    async fetchReviews() {
      const reviews = await this.$axios.$get(
        `${apiUrl}/api/v1/reviews/${this.id.id}`
      );
      this.reviews = reviews;
    },
  },
};
</script>

<style>
</style>
