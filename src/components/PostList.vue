<template>
  <div class="container">
    <div>
      <router-link class="btn btn-primary my-3" to="/create-post">Create Post</router-link>
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
            <router-link :to="`/update-post/${post.id}`" class="btn btn-primary">Edit</router-link>
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
</style>