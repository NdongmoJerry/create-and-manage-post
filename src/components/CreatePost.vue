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
        <form @submit.prevent="submitPost">
          <div class="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              v-model="image"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <multiselect
              v-model="selectedTags"
              :options="allTags"
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
              v-model="description"
              class="form-control"
              required
            ></textarea>
          </div>
          <button class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapActions } from "vuex";

export default {
  name: "CreatePost",
  components: {
    Multiselect,
  },
  data() {
    return {
      image: "",
      selectedTags: [],
      description: "",
    };
  },
  computed: {
    allTags() {
      return this.$store.state.allTags;
    },
  },
  methods: {
    ...mapActions(["savePost"]),
    submitPost() {
      const post = {
        image: this.image,
        tags: this.selectedTags,
        description: this.description,
      };
      this.savePost(post)
        .then(() => {
          this.image = "";
          this.selectedTags = [];
          this.description = "";
        })
        .catch((error) => {
          console.error("Error saving post:", error);
        });
    },
  },
};
</script>

