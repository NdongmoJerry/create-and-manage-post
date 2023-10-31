<template>
  <div class="container">
    <div>
      <router-link class="btn btn-primary my-3" to="/create-post"
        >Create Post</router-link
      >
    </div>
    <div
      v-if="showCreateAlert"
      class="alert alert-success fixed-top"
      role="alert"
    >
      Post created successfully
    </div>
    <div
      v-if="showDeleteAlert"
      class="alert alert-success fixed-top"
      role="alert"
    >
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
            <p class="card-text">
              created_at: {{ formatDate(post.created_at) }}
            </p>
            <router-link
              :to="`/edit-post/${post.id}`"
              class="btn btn-primary me-2"
              >Edit post</router-link
            >
            <DeletePost :postId="post.id" @postDeleted="handlePostDeleted" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeletePost from "../components/ DeletePost.vue";

export default {
  name: "PostList",
  components: {
    DeletePost,
  },
  computed: {
    ...mapGetters(["sortedPosts"]),
    showDeleteAlert() {
      return this.$store.state.showDeleteAlert;
    },
    showCreateAlert() {
      return this.$store.state.showCreateAlert;
    },
  },
  created() {
    this.$store.dispatch("fetchPosts");
  },
  methods: {
    ...mapActions(["deletePost"]),

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
 #edit {
  margin-right: 5px;
} 
</style>
