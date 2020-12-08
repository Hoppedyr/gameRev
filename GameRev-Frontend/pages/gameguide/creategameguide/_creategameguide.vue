<template>
  <div class="container-fluid bg-dark">
    <Navbar />
    <div class="row text-white">
      <div class="col">
        <h1>Create Game guide</h1>
        <form>
          <div class="form-group">
            <label for="inputUsername">gameGuide name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter game guide name"
              v-model="gameguide.gameGuideName"
            />
          </div>
          <div class="form-group">
            <label for="inputUsername">game name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter game name"
              v-model="gameguide.gameName"
            />
          </div>
          <div class="form-group">
            <label for="inputBody">Write a gameguide</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="gameguide.description"
              placeholder="Write a description of the gameguide here..."
            ></textarea>
          </div>
          <button type="button" class="btn btn-primary" v-on:click="submit">
            Submit gameguide
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameguide: {},
    };
  },
  methods: {
    async submit() {
      const data = {
        guideName: this.gameguide.gameGuideName,
        gameName: this.gameguide.gameName,
        description: this.gameguide.description,
        published: true,
      };
      await this.$axios
        .$post(`http://localhost:8100/api/gameguide`, data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>