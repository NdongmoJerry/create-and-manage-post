<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="pt-3">Update Post</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form @submit.prevent="updatePost">
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
              :options="allTags"
              :multiple="true"
              :close-on-select="false"
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
            <button type="submit" class="btn btn-primary mt-3">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import axios from "axios";

export default {
  name: "EditPost",
  components: {
    Multiselect,
  },
  data() {
    return {
      post: {
        id: "",
        image: "",
        selectedTags: [],
        description: "",
      },
      allTags: [
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
      ], // Store all available tags
    };
  },
  created() {
    this.fetchPost();
    this.fetchAllTags();
  },
  methods: {
    fetchPost() {
      const postId = this.$route.params.id;
      axios
        .get(`http://localhost:3000/posts/${postId}`)
        .then((response) => {
          this.post = response.data;
          this.post.selectedTags = response.data.tags;
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    },
    fetchAllTags() {
      axios
        .get("http://localhost:3000/tags")
        .then((response) => {
          this.allTags = response.data;
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    },
    updatePost() {
      const postId = this.$route.params.id;
      const updatedPost = {
        image: this.post.image,
        tags: this.post.selectedTags,
        description: this.post.description,
      };
      axios
        .put(`http://localhost:3000/posts/${postId}`, updatedPost)
        .then((response) => {
          console.log("Post updated:", response.data);
          this.$router.push("/post-list");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    },
  },
};
</script>