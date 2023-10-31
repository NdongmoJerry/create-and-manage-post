import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

const store = createStore({
  state: {
    posts: [],
    showDeleteAlert: false,
    post: {
      image: "",
      tags: [
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
      ],
      selectedTags: [],
      description: "",
    },
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
    REMOVE_DELETED_POST(state, deletedPostId) {
      state.posts = state.posts.filter((post) => post.id !== deletedPostId);
    },
    SET_SHOW_CREATE_ALERT(state, value) {
      state.showCreateAlert = value;
    },
    SET_SHOW_DELETE_ALERT(state, value) {
      state.showDeleteAlert = value;
    },
  },
  actions: {
    fetchPosts({ commit }) {
      return axios
        .get("http://localhost:3000/posts")
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
    deletePost({ commit }, postId) {
      return axios
        .delete(`http://localhost:3000/posts/${postId}`)
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
    savePost({ state, commit }) {
      const post = {
        image: state.post.image,
        tags: state.post.selectedTags,
        description: state.post.description,
        created_at: new Date().toISOString(),
      };
  
      axios
        .post("http://localhost:3000/posts", post)
        .then((response) => {
          console.log("Post created:", response.data);
          // Reset the form data
          state.post.image = "";
          state.post.selectedTags = [];
          state.post.description = "";
          commit("SET_SHOW_CREATE_ALERT", true);
          setTimeout(() => {
            commit("SET_SHOW_CREATE_ALERT", false);
          }, 3000);
          router.push("/post-list");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          throw error;
        });
    },
  },
});

export default store;