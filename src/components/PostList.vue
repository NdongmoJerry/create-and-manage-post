<template>
  <div class="container">
    <div>
      <router-link class="btn btn-primary my-3" to="/create-post">Create Post</router-link>
    </div>
    <div v-if="showCreateAlert" class="alert alert-success fixed-top" role="alert">
      Post created successfully
    </div>
    <div v-if="showDeleteAlert" class="alert alert-success fixed-top" role="alert">
      Post deleted successfully
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="post in sortedPosts" :key="post.id">
        <div class="card">
          <div class="embed-responsive embed-responsive-16by9">
            <img class="card-img-top" :src="post.image" />
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="tag in post.tags" :key="tag">
              <span class="badge bg-primary">{{ tag }}</span>
            </li>
          </ul>
          <div class="card-body">
            <p class="card-text">{{ post.description }}</p>
            <p class="card-text">created_at: {{ formatDate(post.created_at) }}</p>
            <p class="card-text">updated_at: {{ formatDate(post.updated_at) }}</p>
            <router-link :to="`/edit-post/${post.id}`" class="btn btn-primary me-2">Edit post</router-link>
            <DeletePost :postId="post.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import DeletePost from '../components/ DeletePost.vue';
import { useStore } from '../store/index';

export default defineComponent({
  name: 'PostList',
  components: {
    DeletePost,
  },
  setup() {
    const store = useStore();

    const sortedPosts = computed(() => store.sortedPosts);
    const showDeleteAlert = computed(() => store.showDeleteAlert);
    const showCreateAlert = computed(() => store.showCreateAlert);

    const fetchPosts = () => {
      store.fetchPosts();
    };

    const deletePost = (postId: string) => {
  store.deletePost(postId);
};

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Africa/Lagos",
      };
      return date.toLocaleString(undefined, options);
    };

    onMounted(() => {
      fetchPosts();
    });

    return {
      sortedPosts,
      showDeleteAlert,
      showCreateAlert,
      deletePost,
      formatDate,
    };
  },
});
</script>