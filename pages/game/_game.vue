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
          <label for="inputUsername">Username</label>
          <input
            type="username"
            class="form-control"
            placeholder="Enter username"
            v-model="review.userName"
          />
        </div>

        <div class="form-group">
          <label for="inputBody">Write your review</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="review.body"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="selectCountry">Your country</label>
          <select class="form-control" v-model="review.country">
            <option
              v-for="country in countries"
              :key="country.index"
              v-bind:value="country.code"
              >{{ country.name }}</option
            >
          </select>
        </div>

        <div class="form-group">
          <label for="ratingScore">Rate the game</label>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              class="btn btn-warning"
              v-bind:class="{ active: review.ratingScore == 1 }"
            >
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked
                onclick
                v-on:click="reviewRate(1)"
              />
              1
            </label>
            <label
              class="btn btn-warning"
              v-bind:class="{ active: review.ratingScore == 2 }"
            >
              <input
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
                v-on:click="reviewRate(2)"
              />
              2
            </label>
            <label
              class="btn btn-warning"
              v-bind:class="{ active: review.ratingScore == 3 }"
            >
              <input
                type="radio"
                name="options"
                id="option3"
                autocomplete="off"
                v-on:click="reviewRate(3)"
              />
              3
            </label>
            <label
              class="btn btn-warning"
              v-bind:class="{ active: review.ratingScore == 4 }"
            >
              <input
                type="radio"
                name="options"
                id="option4"
                autocomplete="off"
                v-on:click="reviewRate(4)"
              />
              4
            </label>
            <label
              class="btn btn-warning"
              v-bind:class="{ active: review.ratingScore == 5 }"
            >
              <input
                type="radio"
                name="options"
                id="option5"
                autocomplete="off"
                v-on:click="reviewRate(5)"
              />
              5
            </label>
          </div>
        </div>

        <button type="button" class="btn btn-primary" v-on:click="submit">
          Submit review
        </button>
      </form>
      <div class="row"></div>
      <div class="col">test</div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../../configs/config.json";
import countries from "../../static/countries.json";

export default {
  data() {
    return {
      id: this.$route.query,
      countries,
      game: {},
      reviews: [],
      review: { userName: null, country: null, ratingScore: null, body: null }
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
      // console.log(this.game);
    },
    async fetchReviews() {
      let reviews;

      await this.$axios
        .$get(`http://${apiUrl}/api/v1/reviews/game/${this.id.id}`)
        .then(function(response) {
          console.log(response);
          reviews = response;
        })
        .catch(function(error) {
          console.log(error);
        });

      this.reviews = reviews;
    },
    reviewRate(rating) {
      this.review.ratingScore = rating;
    },
    async submit() {
      // console.log(this.review);
      const data = {
        game_id: this.id,
        userName: this.review.userName,
        country: this.review.country,
        ratingScore: this.review.ratingScore,
        body: this.review.body
      };

      const submitRes = await this.$axios.$post(
        `${apiUrl}/api/v1/reviews`,
        data
      );
      console.log(submitRes);
    }
  }
};
</script>

<style>
.star-rating {
  line-height: 32px;
  font-size: 1.25em;
}

.star-rating .fa-star {
  color: yellow;
}
</style>
