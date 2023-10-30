<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="pt-3">Create Post</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form @submit.prevent="savePost">
          <div class="form-group">
            <label>ImageURL:</label>
            <input
              type="text"
              v-model="post.image"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <multiselect
              v-model="post.selectedTags"
              :options="post.tags"
              :multiple="true"
              :close-on-select="true"
              placeholder="Select tags"
              class="form-control"
              required
            ></multiselect>
          </div>

          <div class="form-group">
            <label>Description:</label>
            <textarea
              v-model="post.description"
              class="form-control"
              required
            ></textarea>
            <button class="btn btn-primary mt-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import {mapState, mapActions } from "vuex";

export default {
  name: "CreatePost",
  components: {
    Multiselect,
  },
  computed: {
    ...mapState(["post"]),
  },
    methods: {
    ...mapActions(["savePost"]),
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
