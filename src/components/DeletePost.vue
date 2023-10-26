<template>
    <div>
      <h1>Delete Post</h1>
      <p>Are you sure you want to delete this post?</p>
      <div>
        <strong>Image URL:</strong>
        <p>{{ post.image }}</p>
      </div>
      <div>
        <strong>Tags:</strong>
        <p>{{ post.tags }}</p>
      </div>
      <div>
        <strong>Description:</strong>
        <p>{{ post.description }}</p>
      </div>
      <button @click="deletePost">Delete</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "DeletePost",
    data() {
      return {
        post: {
          id: null,
          image: "",
          tags: "",
          description: "",
        },
      };
    },
    created() {
      const postId = this.$route.params.id;
      this.fetchPost(postId);
    },
    methods: {
      fetchPost(postId) {
        axios
          .get(`http://localhost:3000/posts/${postId}`)
          .then((response) => {
            console.log("Post:", response.data);
            this.post = response.data;
          })
          .catch((error) => {
            console.error("Error fetching post:", error);
          });
      },
      deletePost() {
        const postId = this.post.id;
        axios
          .delete(`http://localhost:3000/posts/${postId}`)
          .then(() => {
            console.log("Post deleted:", postId);
            // Redirect to the post list page
            this.$router.push("/post-list");
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
      },
    },
  };
  </script>