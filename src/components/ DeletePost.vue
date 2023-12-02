<template>
  <button class="btn btn-danger" @click="confirmDeletePost">Delete post</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store/index";

export default defineComponent({
  name: "DeletePost",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const confirmDeletePost = async () => {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await deletePost(props.postId);
          store.posts = store.posts.filter((post) => post.id !== props.postId);
        } catch (error) {
          console.error("Failed to delete post:", error);
        }
      }
    };

    const deletePost = async (postId) => {
      await store.deletePost(postId);
    };

    return {
      confirmDeletePost,
    };
  },
});
</script>