<template>
  <div class="container-fluid bg-dark">
    <Navbar />
    <div class="row">
      <div class="col-md-6 col-md-offset-3 text-white">
        <h1>Search game guides List around the world</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-md-offset-3">
        <form action="" class="search-form">
          <div class="form-group has-feedback">
            <label for="search" class="sr-only">Search</label>
            <input
              type="text"
              class="form-control"
              id="search"
              placeholder="search"
              v-model="query"
            />
          </div>
        </form>
      </div>
      <a class="navbar-brand" href="/gameguide/creategameguide"
        >Create Game Guide</a
      >
    </div>
    <div class="row">
      <div
        class="col-3 text-white"
        v-for="result in results"
        :key="result._source.id"
      >
        <div class="card bg-secondary h-100">
          <div class="card-body">
            <h5 class="card-title">{{ result._source.guideName }},</h5>
            <h5 class="card-title">{{ result._source.gameName }}</h5>
            <p class="card-text">{{ result._source.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      query: "",
    };
  },

  // declare methods in this Vue component. here only one method which performs the search is defined
  methods: {
    // make an axios request to the server with the current search query
    search: function () {
      this.$axios
        .get("http://localhost:8100/search?q=" + this.query)
        .then((response) => {
          this.results = response.data;
          console.log(this.results);
        });
    },
  },
  // declare Vue watchers
  watch: {
    // watch for change in the query string and recall the search method
    query: function () {
      this.search();
    },
  },
};
</script>

<style>
</style>