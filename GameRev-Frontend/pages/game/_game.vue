<template>
  <div>
    <Navbar />
    <div class="container bg-muted text-white">
      <div class="row">
        <div class="col">
          <h1>{{ game.name }}</h1>
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
            <label for="inputBody">Write a review</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="review.body"
              placeholder="Write a review of the game here..."
            ></textarea>
          </div>

          <div class="form-group">
            <label for="selectCountry">Your country</label>
            <select class="form-control" v-model="review.country">
              <option
                v-for="country in countries"
                :key="country.index"
                v-bind:value="country.code"
              >{{ country.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="ratingScore">Rate the game</label>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-warning" v-bind:class="{ active: review.ratingScore == 1 }">
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
              <label class="btn btn-warning" v-bind:class="{ active: review.ratingScore == 2 }">
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autocomplete="off"
                  v-on:click="reviewRate(2)"
                />
                2
              </label>
              <label class="btn btn-warning" v-bind:class="{ active: review.ratingScore == 3 }">
                <input
                  type="radio"
                  name="options"
                  id="option3"
                  autocomplete="off"
                  v-on:click="reviewRate(3)"
                />
                3
              </label>
              <label class="btn btn-warning" v-bind:class="{ active: review.ratingScore == 4 }">
                <input
                  type="radio"
                  name="options"
                  id="option4"
                  autocomplete="off"
                  v-on:click="reviewRate(4)"
                />
                4
              </label>
              <label class="btn btn-warning" v-bind:class="{ active: review.ratingScore == 5 }">
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

          <button type="button" class="btn btn-primary" v-on:click="submit">Submit review</button>
        </form>

        <br />
        <div class="row">
          <div v-for="review in reviews" :key="review.id" class="col-6 text-white py-2">
            <div class="card h-100 bg-secondary">
              <div class="card-body">
                <h3 class="card-title">
                  <img :src="review.countryJPG" width="50" />
                  {{ review.userName }}
                </h3>

                <p class="card-text"></p>
                <p>RatingScore: {{ review.ratingScore }}</p>
                <p>
                  {{
                  new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  })
                  }}
                </p>
                <p>Review:</p>
                {{ review.body }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../../configs/config.json";
import countries from "../../static/countries.json";

export default {
  data() {
    return {
      id: this.$route.query.id,
      countries,
      game: {},
      reviews: [],
      review: {
        userName: null,
        country: null,
        ratingScore: null,
        body: null,
        countryJPG: null
      }
    };
  },

  created() {
    this.fetchGame();
    this.fetchReviews();
  },

  methods: {
    async fetchGame() {
      const game = await this.$axios.$get(
        `https://api.rawg.io/api/games/${this.id}`
      );
      this.game = game;
      // console.log(this.game);
    },
    async fetchReviews() {
      this.reviews = [];
      const reviews = await this.$axios.$get(
        `${apiUrl}/api/v1/reviews/game/${this.id}`
      );

      // get flag jpg for reviewers country
      await reviews.forEach(async review => {
        const countryJPG = await this.$axios.$get(
          `${apiUrl}/api/v1/flag/${review.country}`
        );
        review.countryJPG = countryJPG;
        this.reviews.push(review);
      });
    },
    reviewRate(rating) {
      this.review.ratingScore = rating;
    },
    async submit() {
      // console.log(this.review);

      // await this.$axios
      //   .$post(`${apiUrl}/api/v1/reviews`, data)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      const url = `http://localhost:8100/engine-rest/process-definition/key/profanity-validation/start`;
      // const url = `http://localhost:8100/engine-rest/process-definition/key/profanity-validation/start`;
      const methodParam = {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          variables: {
            game_id: {
              value: this.id,
              type: "string"
            },
            review: {
              value: this.review.body,
              type: "string"
            },
            country: {
              value: this.review.country,
              type: "string"
            },
            ratingScore: {
              value: this.review.ratingScore,
              type: "string"
            },
            userName: {
              value: this.review.userName,
              type: "string"
            }
          }
        })
      };
      await this.$axios
        .$post(url, methodParam.body, methodParam.headers)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      // fetch(url, methodParam)
      //   .then(response => console.log(response))
      //   .catch(function(error) {
      //     console.log(error);
      //   });

      setTimeout(() => {
        this.fetchReviews();
      }, 300);
      this.resetForm();
    },
    resetForm() {
      this.review = {
        userName: null,
        country: null,
        ratingScore: null,
        body: null
      };
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
