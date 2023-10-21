<template>
  <header>
    <NavBar />
  </header>

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
            <label>Tags:</label>
            <select v-model="post.selectedTags" multiple class="form-control">
              <option v-for="tag in post.tags" :key="tag">{{ tag }}</option>
            </select>
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
import NavBar from "../components/NavBar.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CreatePost",
  components: {
    NavBar,
  },
  computed: {
    ...mapState(["post"]),
  },
  methods: {
    ...mapMutations([
      "updatePostImage",
      "updatePostSelectedTags",
      "updatePostDescription",
    ]),
    ...mapActions(["savePost"]),
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
