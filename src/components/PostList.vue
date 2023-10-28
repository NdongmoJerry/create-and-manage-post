<template>
  <div class="container">
    <div>
      <router-link class="btn btn-primary my-3" to="/create-post">Create Post</router-link>
    </div>
    <div v-if="showDeleteAlert" class="alert alert-success mt-3" role="alert">
      Post deleted successfully
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="post in sortedPosts" :key="post.id">
        <div class="card">
          <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top" :src="post.image" />
          </div>
          <ul>
            <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
          </ul>
          <div class="card-body">
            <p class="card-text">{{ post.description }}</p>
            <p class="card-text">created_at: {{ formatDate(post.created_at) }}</p>
            <router-link :to="`/edit-post/${post.id}`" id="edit" class="btn btn-primary">Edit post</router-link>
            <button class="btn btn-danger" @click="confirmDeletePost(post.id)">Delete post</button>
          </div>
        </div>
      </div>
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
  computed: {
  sortedPosts() {
    return this.posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
},
  methods: {
    fetchPosts() {
      return axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          console.log("Posts:", response.data);
          this.posts = response.data;
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
//To handle the time zone
formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Africa/Lagos",
    };
    return date.toLocaleString(undefined, options);
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