<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="pt-3">Create Post</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form @submit.prevent="submitPost">
          <div class="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              v-model="image"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <multiselect
              v-model="selectedTags"
              :options="allTags"
              :multiple="true"
              :close-on-select="true"
              placeholder="Select tags"
              class="form-control"
              required
            ></multiselect>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea
              v-model="description"
              class="form-control"
              required
            ></textarea>
          </div>
          <button class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Multiselect from "vue-multiselect";
import { useStore } from "vuex";
import { Post } from "../components/types";

export default defineComponent({
  name: "CreatePost",
  components: {
    Multiselect,
  },
  setup() {
    const store = useStore();

    const image = ref("");
    const selectedTags = ref<string[]>([]);
    const description = ref("");

    const allTags = computed(() => {
      return store.state.allTags;
    });

    const submitPost = () => {
      const post: Post = {
        image: image.value,
        tags: selectedTags.value,
        description: description.value,
      };
      store.dispatch("savePost", post)
        .then(() => {
          image.value = "";
          selectedTags.value = [];
          description.value = "";
        })
        .catch((error: string) => {
          console.error("Error saving post:", error);
        });
    };

    return {
      image,
      selectedTags,
      description,
      allTags,
      submitPost,
    };
  },
});
</script>
