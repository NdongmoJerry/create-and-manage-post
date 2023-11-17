<template>
  <button class="btn btn-danger" @click="confirmDeletePost">Delete post</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

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

    const confirmDeletePost = () => {
      if (confirm("Are you sure you want to delete this post?")) {
        deletePost(props.postId);
      }
    };

    const deletePost = (postId) => {
      store.dispatch("deletePost", postId);
    };

    return {
      confirmDeletePost,
    };
  },
});
</script>
