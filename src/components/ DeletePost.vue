<template>
  <button class="btn btn-danger" @click="confirmDeletePost">Delete post</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'DeletePost',
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    confirmDeletePost(): void {
      if (confirm('Are you sure you want to delete this post?')) {
        this.deletePost(this.postId);
      }
    },
    ...mapActions(['deletePost']),
  },
});
</script>