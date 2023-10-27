<template>
  <div class="container">
    <div>
      <router-link class="btn btn-primary my-3" to="/create-post">Create Post</router-link>
    </div>
     <div v-if="showDeleteAlert" class="alert alert-success mt-3" role="alert">
      Post deleted successfully
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="post in posts" :key="post.id">
        <div class="card">
          <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top" :src="post.image" />
          </div>
          <ul>
            <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
          </ul>
          <div class="card-body">
            <p class="card-text">{{ post.description }}</p>
            <router-link :to="`/update-post/${post.id}`" id="edit" class="btn btn-primary">Edit post</router-link>
            <button class="btn btn-danger" @click="confirmDeletePost(post.id)">Delete post</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteAlert" class="alert alert-success mt-3" role="alert">
      Post deleted successfully
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostList",
  data() {
    return {
      posts: [],
      showDeleteAlert: false,
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      return axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          console.log("Posts:", response.data);
          this.posts = response.data.reverse();
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          throw error;
        });
    },
    confirmDeletePost(postId) {
      if (confirm("Are you sure you want to delete this post?")) {
        this.deletePost(postId);
      }
    },
    deletePost(postId) {
      axios
        .delete(`http://localhost:3000/posts/${postId}`)
        .then(() => {
          console.log("Post deleted successfully");
          // Remove the deleted post from the local posts array
          this.posts = this.posts.filter((post) => post.id !== postId);
          this.showDeleteAlert = true; // Show the success alert
          setTimeout(() => {
            this.showDeleteAlert = false; // Hide the success alert after 3 seconds
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    },
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
  max-width: 100%;
  max-height: 320px;
}
ul li {
  list-style: none;
  margin-top: 10px;
  font-weight: bold;
}
#edit{
  margin-right: 5px;
}
</style>