<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="pt-3">Update Post</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form @submit.prevent="updatePost(selectedPost.id)">
          <div class="form-group">
            <label>ImageURL:</label>
            <input
              type="text"
              v-model="selectedPost.image"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <multiselect
              v-model="selectedPost.selectedTags"
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
              v-model="selectedPost.description"
              class="form-control"
              required
            ></textarea>
            <button type="submit" class="btn btn-primary mt-3">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Multiselect from "vue-multiselect";
import { mapState, mapActions } from 'vuex';
export default defineComponent({
  name: "EditPost",
  components: {
    Multiselect,
  },
  computed: {
    ...mapState(["selectedPost", "allTags"]),
  },
  created() {
    const postId = this.$route.params.id;
    this.fetchPost(postId);
  },
  methods: {
    ...mapActions(['fetchPost', 'fetchAllTags', 'updatePost']),
  },
});
</script>