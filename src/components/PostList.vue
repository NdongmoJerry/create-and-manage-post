<template>
  <header>
    <NavBar />
  </header>
  <div class="container">
    <div>
      <router-link class="btn btn-primary my-3" to="/create-post"
        >Create Post</router-link
      >
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "PostList",
  components: {
    NavBar,
  },
  computed: {
    ...mapState(["posts"]),
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    ...mapActions(["getPosts"]),
    fetchPosts() {
      this.getPosts();
    },
    // ...
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
