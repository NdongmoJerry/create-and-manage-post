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
            <label for="tags">Tags</label>
            <multiselect
              v-model="post.selectedTags"
              :options="post.tags"
              :multiple="true"
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
import NavBar from "../components/NavBar.vue";
import axios from "axios";


export default {
  name: "CreatePost",
  components: {
    NavBar,
    Multiselect,
  },
 data(){
  return{
    post: {
      image: "",
      tags: [
        "transport",
        "sports",
        "people",
        "nightlife",
        "nature",
        "food",
        "fashion",
        "city",
        "cats",
        "business",
        "other",
      ],
      selectedTags: [],
      description: "",
    },
  }
 },
  methods: {
    savePost() {
      const post = {
        image: this.post.image,
        tags: this.post.selectedTags,
        description: this.post.description,
      };

      axios
        .post("http://localhost:3000/posts", post)
        .then((response) => {
          console.log("Post created:", response.data);
        // Reset the form data
        this.post.image = "";
        this.post.selectedTags = [];
        this.post.description = "";
          this.$router.push("/post-list");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>