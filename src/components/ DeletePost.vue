<template>
  <button class="btn btn-danger" @click="confirmDeletePost">Delete post</button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DeletePost",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    confirmDeletePost() {
      if (confirm("Are you sure you want to delete this post?")) {
        this.deletePost(this.postId);
      }
    },
    ...mapActions(["deletePost"]),
  },
};
</script>
