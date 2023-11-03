import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
const BACKEND_URL =  'http://localhost:3000';
const store = createStore({
  state: {
    posts: [],
    showDeleteAlert: false,
    selectedPost: {
      id: '',
      image: '',
      selectedTags: [],
      description: '',
      created_at: '',
    },
    allTags: [
      "transport",
      "sports",
      "people",
      "nightlife",
      "nature",
      "food",
      "fashion",
      "city",
      "cats",
      "business",
      "other",
    ], // Store all available tags
  },
  getters: {
    sortedPosts: (state) => {
      return state.posts
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_SELECTED_POST(state, post) {
      state.selectedPost = post;
    },
    SET_SELECTED_TAGS(state, tags) {
      state.selectedPost.selectedTags = tags;
    },
    REMOVE_DELETED_POST(state, deletedPostId) {
      state.posts = state.posts.filter((post) => post.id !== deletedPostId);
    },
    SET_SHOW_DELETE_ALERT(state, value) {
      state.showDeleteAlert = value;
    },
    SET_SHOW_CREATE_ALERT(state, value) {
      state.showCreateAlert = value;
    },
  },
  actions: {
    fetchPosts({ commit }) {
      return axios
        .get(`${BACKEND_URL}/posts`)
        .then((response) => {
          console.log("Posts:", response.data);
          commit("SET_POSTS", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          throw error;
        });
    },
    fetchPost({ commit }, postId) {
      axios
        .get(`${BACKEND_URL}/posts/${postId}`)
        .then((response) => {
          commit('SET_SELECTED_POST', response.data);
          commit('SET_SELECTED_TAGS', response.data.tags);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    },
    updatePost({ state }, postId) {
      const updatedPost = {
        image: state.selectedPost.image,
        tags: state.selectedPost.selectedTags,
        description: state.selectedPost.description,
        created_at: state.selectedPost.created_at,
      };
      axios
        .put(`${BACKEND_URL}/posts/${postId}`, updatedPost)
        .then((response) => {
          console.log("Post updated:", response.data);
          router.push("/post-list");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    },
    deletePost({ commit }, postId) {
      return axios
        .delete(`${BACKEND_URL}/posts/${postId}`)
        .then(() => {
          console.log("Post deleted successfully");
          commit("REMOVE_DELETED_POST", postId);
          commit("SET_SHOW_DELETE_ALERT", true);
          setTimeout(() => {
            commit("SET_SHOW_DELETE_ALERT", false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          throw error;
        });
    },
    savePost({ commit }, post) {
      const newPost = {
        ...post,
        created_at: new Date().toISOString(),
      };

      return axios
        .post(`${BACKEND_URL}/posts`, newPost)
        .then((response) => {
          console.log("Post created:", response.data);
          router.push("/post-list");
          commit("SET_SHOW_CREATE_ALERT", true); // Call the mutation
          setTimeout(() => {
            commit("SET_SHOW_CREATE_ALERT", false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          throw error;
        });
    },
  },
});

export default store;